import { z } from "zod"
import {
  FiltersShape,
  InferShapeOrZod,
  IsNever,
  Pagination,
  PaginationAdapter,
  UnknownIfNever,
  UnwrapZodReadonly,
  ZodPrimitives,
  getDefaultPaginationAdapter,
  getPaginatedShape,
  getPaginatedZod,
  objectToCamelCaseArr,
  parseResponse,
} from "../utils"
import { CustomServiceCallback, ResolveCustomServiceCallOpts } from "./types"

const paginationObjShape = {
  pagination: z.instanceof(Pagination),
}

export const createPaginatedServiceCall = <
  TOutput extends z.ZodRawShape = z.ZodRawShape,
  TFilters extends FiltersShape = never,
  //things that are optional are better off being  never so that we can decide later whether we want to void them or not to exclude them from things
  TInput extends z.ZodRawShape | ZodPrimitives = never,
  TReturnType extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType> = ReturnType<
    typeof getPaginatedZod<UnwrapZodReadonly<TOutput>>
  >["shape"],
>({
  inputShape,
  outputShape,
  filtersShape,
  opts,
}: {
  outputShape: TOutput
  inputShape?: TInput
  filtersShape?: TFilters
  opts?: {
    /**
     * Disable the logging of errors if the response type doesn't match the one expected from the library
     */
    disableLoggingWarning?: boolean
    /**
     * Choose the http method you want this call to be executed as
     */
    httpMethod?: "post" | "get"
    /**
     * Optionally point to another uri different than the original
     */
    uri?: IsNever<TInput> extends true
      ? string
      : TInput extends { urlParams: z.ZodObject<any> }
        ? (input: z.infer<TInput["urlParams"]>) => string
        : string
    /**
     * Optional pagination adapter describing how a non-Django backend paginates.
     * Same contract as `createApi`'s `options.pagination`. When omitted, the
     * default Django REST Framework contract applies (`{ page, pageSize }` request
     * params, `{ count, next, previous, results }` response envelope).
     */
    pagination?: PaginationAdapter<TOutput>
  }
}): ResolveCustomServiceCallOpts<UnknownIfNever<TInput> & typeof paginationObjShape, TReturnType, TFilters> => {
  const uri = opts?.uri as ((input: unknown) => string) | undefined | string
  const httpMethod = opts?.httpMethod ?? "get"
  // The default adapter reproduces the Django REST Framework contract, so the
  // callback runs a single code path whether or not a `pagination` adapter was supplied.
  const paginationAdapter = (opts?.pagination ??
    getDefaultPaginationAdapter<UnwrapZodReadonly<TOutput>>()) as PaginationAdapter<UnwrapZodReadonly<TOutput>>
  const filtersShapeResolved = filtersShape && Object.keys(filtersShape).length ? filtersShape : undefined
  // The output shape should still be the camelCased one so as long as we make sure that we return the same we should be able to cast the result right?. OutputShape will always be camelCased from the user input...
  if (!outputShape) {
    throw new Error("You should provide an output shape ")
  }
  if (inputShape && "urlParams" in inputShape && typeof opts?.uri !== "function") {
    throw new Error("If you provide url params you should pass an uri builder function in opts.uri")
  }

  const newOutputShape = getPaginatedShape(outputShape)

  const callback: CustomServiceCallback<
    typeof paginationObjShape & UnknownIfNever<TInput>,
    ReturnType<typeof getPaginatedShape<TOutput>>,
    TFilters
  > = async ({ client, slashEndingBaseUri, utils, input, parsedFilters }) => {
    const parsedPaginationFilters = input.pagination ? paginationAdapter.toRequestParams(input.pagination) : {}
    const snakedCleanParsedFilters = { ...parsedPaginationFilters, ...(parsedFilters ?? {}) }
    let res
    let parsedInput = input
    let parsedUrlParams
    if ("urlParams" in input) {
      const { urlParams, ...rest } = input
      parsedUrlParams = urlParams
      parsedInput = rest
    }
    const resolvedUri =
      parsedUrlParams && typeof uri === "function" ? uri(parsedUrlParams) : typeof uri !== "function" ? (uri ?? "") : ""

    const makeSlashEnding = (str: string) => {
      return str ? (str[str.length - 1] === "/" ? str : str + "/") : ""
    }
    const slashEndingUri = makeSlashEnding(resolvedUri)
    const fullUri = `${slashEndingBaseUri}${slashEndingUri}` as `${string}/`
    if (httpMethod === "get") {
      res = await client.get(fullUri, {
        params: snakedCleanParsedFilters,
      })
    } else {
      const { pagination: _, ...body } = utils.toApi(parsedInput) ?? {}
      const validBody = Object.keys(body).length !== 0 ? body : undefined
      res = await client.post(fullUri, validBody, {
        params: snakedCleanParsedFilters,
      })
    }
    const entityZod = z.object(outputShape) as z.ZodObject<UnwrapZodReadonly<TOutput>>
    const paginatedZod = z.object(paginationAdapter.responseShape(entityZod)).passthrough()
    const rawResponse = parseResponse({
      data: res.data,
      identifier: "custom-paginated-call",
      zod: paginatedZod,
      onError: opts?.disableLoggingWarning ? null : undefined,
    })
    const results = paginationAdapter.getResults(rawResponse)
    //! although this claims not to be of the same type than our converted TOutput, it actually is, but all the added type complexity with camel casing util makes TS to think it is something different. It should be safe to cast this, we should definitely check this at runtime with tests
    return { ...rawResponse, results: results.map((r) => objectToCamelCaseArr(r)) } as InferShapeOrZod<
      ReturnType<typeof getPaginatedShape<TOutput>>
    >
  }
  if (inputShape) {
    return {
      callback: callback,
      inputShape,
      outputShape: newOutputShape,
      filtersShape: filtersShapeResolved ?? z.void(),
    } as unknown as ResolveCustomServiceCallOpts<
      UnknownIfNever<TInput> & typeof paginationObjShape,
      // TODO: test this callback return type
      TReturnType,
      TFilters
    >
  }
  return {
    callback: callback,
    inputShape: z.void(),
    outputShape: newOutputShape,
    filtersShape: filtersShapeResolved ?? z.void(),
  } as unknown as ResolveCustomServiceCallOpts<
    UnknownIfNever<TInput> & typeof paginationObjShape,
    // TODO: test this callback return type
    TReturnType,
    TFilters
  >
}
