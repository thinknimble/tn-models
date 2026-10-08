import { CamelCasedPropertiesDeep, SnakeCasedPropertiesDeep, toCamelCase, toSnakeCase } from "@thinknimble/tn-utils"
import { AxiosInstance } from "axios"
import { z } from "zod"
import { AxiosLike } from "../../api/types"
import { parseFilters } from "../filters"
import { Pagination } from "../pagination"
import { parseResponse } from "../response"
import {
  StripZodReadonly,
  ZodPrimitives,
  isZodArray,
  isZodObject,
  isZodPrimitive,
  isZodReadonly,
  isZodRecord,
  isZodVoid,
  resolveRecursiveZod,
  unwrapZodWrappers,
  zodObjectToSnakeRecursive,
} from "../zod"
import { CallbackUtils, FromApiCall, ToApiCall } from "./types"

//TODO: #194 these should probably move to tn-utils but will keep it here for a quick release
/**
 * Recursively camelCase every key of an API response.
 *
 * When `schema` is supplied, the walk follows it: a field typed as `z.record(...)`
 * is a leaf whose keys are *data*, not field names (the backend's rule blobs, free-form
 * metadata, etc.), so its value is passed through verbatim — the camel↔snake round-trip
 * is lossy for keys like `cpt_code_1` and would silently corrupt them. Without a schema
 * the walk is blind and transforms every key, preserving the original behavior.
 */
export const objectToCamelCaseArr = <T extends object>(obj: T, schema?: z.ZodType): CamelCasedPropertiesDeep<T> => {
  if (typeof obj !== "object" || obj === null) return obj
  const node = schema ? unwrapZodWrappers(schema) : undefined
  if (node && isZodRecord(node)) return obj as unknown as CamelCasedPropertiesDeep<T>
  if (Array.isArray(obj)) {
    const element = node && isZodArray(node) ? node.element : undefined
    return obj.map((o) => objectToCamelCaseArr(o, element)) as CamelCasedPropertiesDeep<T>
  }
  const shape = node && isZodObject(node) ? node.shape : undefined
  const newEntries = []
  for (const [k, v] of Object.entries(obj)) {
    const camelKey = toCamelCase(k)
    // shapes are declared camelCase, so the child schema is keyed by the transformed name
    newEntries.push([camelKey, objectToCamelCaseArr(v, shape?.[camelKey] as z.ZodType | undefined)])
  }
  return Object.fromEntries(newEntries)
}
/**
 * Recursively snake_case every key of a request body. See {@link objectToCamelCaseArr}
 * for the schema-guided record passthrough; here the source keys are already camelCase
 * (as declared on the input shape), so the child schema is looked up by the raw key.
 */
export const objectToSnakeCaseArr = <T extends object>(obj: T, schema?: z.ZodType): SnakeCasedPropertiesDeep<T> => {
  if (typeof obj !== "object" || obj === null) return obj
  const node = schema ? unwrapZodWrappers(schema) : undefined
  if (node && isZodRecord(node)) return obj as unknown as SnakeCasedPropertiesDeep<T>
  if (Array.isArray(obj)) {
    const element = node && isZodArray(node) ? node.element : undefined
    return obj.map((o) => objectToSnakeCaseArr(o, element)) as SnakeCasedPropertiesDeep<T>
  }
  const shape = node && isZodObject(node) ? node.shape : undefined
  const newEntries = []
  for (const [k, v] of Object.entries(obj)) {
    newEntries.push([toSnakeCase(k), objectToSnakeCaseArr(v, shape?.[k] as z.ZodType | undefined)])
  }
  return Object.fromEntries(newEntries)
}

const createToApiHandler = <T extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>>(inputShape: T) => {
  // Given that this is under our control, we should not do safe parse, if the parsing fails means something is wrong (you're not complying with the schema you defined)

  if (isZodArray(inputShape)) {
    return ((arr: unknown[]) => {
      try {
        if (typeof arr?.[0] === "object") {
          return resolveRecursiveZod(inputShape).parse(
            arr.map((i) => objectToSnakeCaseArr(i as object, inputShape.element)),
          )
        }
      } catch (e) {
        console.error(`${createToApiHandler.name} - error`, e)
        throw e
      }
      return arr
    }) as ToApiCall<T>
  }
  if (isZodPrimitive(inputShape)) return
  return ((obj: object) => {
    try {
      const inputZod = z.object(inputShape as z.ZodRawShape)
      const result = zodObjectToSnakeRecursive(inputZod).parse(objectToSnakeCaseArr(obj, inputZod))
      return result
    } catch (e) {
      console.error(`${createToApiHandler.name} - error`, e)
      throw e
    }
  }) as ToApiCall<T>
}

const createFromApiHandler = <T extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>>({
  outputShape,
  callerName,
  disableLoggingWarning,
}: {
  outputShape: T
  callerName: string
  disableLoggingWarning?: boolean
}) => {
  const isOutputZodArray = isZodArray(outputShape)
  const isOutputZodPrimitive = isZodPrimitive(outputShape)

  // since this checks for the api response, which we don't control, we can't strict parse, else we would break the flow. We'd rather safe parse and show a warning if there's a mismatch
  if (isOutputZodArray) {
    return (obj: unknown[]) =>
      parseResponse({
        identifier: callerName,
        data:
          typeof obj?.[0] === "object" && obj
            ? obj.map((o) => objectToCamelCaseArr(o as object, outputShape.element))
            : obj,
        zod: outputShape,
        onError: disableLoggingWarning ? null : undefined,
      })
  }
  //! This would send all other things that are not shapes (and not primitives) such as unions and intersections down the drain since we don't have support for those in outputShapes.
  if (isOutputZodPrimitive) return
  // Then it is a shape
  const outputZod = z.object(outputShape)
  return ((obj: object) => {
    return parseResponse({
      identifier: callerName,
      data: objectToCamelCaseArr(obj, outputZod) ?? {},
      zod: outputZod,
      onError: disableLoggingWarning ? null : undefined,
    })
  }) as FromApiCall<T>
}

export function createApiUtils<
  TInput extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>,
  TOutput extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>,
>(
  args: { name: string; disableLoggingWarning?: boolean } & (
    { inputShape: TInput; outputShape: TOutput } | { inputShape: TInput } | { outputShape: TOutput }
  ),
) {
  if (!("inputShape" in args || "outputShape" in args)) return {} as CallbackUtils<TInput, TOutput>
  const fromApi =
    "outputShape" in args
      ? createFromApiHandler({
          outputShape: args.outputShape,
          callerName: args.name,
          disableLoggingWarning: args.disableLoggingWarning,
        })
      : undefined
  const toApi = "inputShape" in args ? createToApiHandler(args.inputShape) : undefined
  return (
    fromApi || toApi
      ? {
          utils: {
            ...(fromApi ? { fromApi } : {}),
            ...(toApi ? { toApi } : {}),
          },
        }
      : {}
  ) as CallbackUtils<TInput, TOutput>
}

//TODO: improve types #95
/**
 * Core method of custom calls.
 */
export const createCustomServiceCallHandler =
  ({
    client,
    serviceCallOpts,
    baseUri,
    name,
  }: {
    serviceCallOpts: any
    client: AxiosInstance | AxiosLike
    /**
     * This name allow us to keep record of which method it is, so that we can identify in case of output mismatch
     */
    name?: string
    baseUri?: string
  }) =>
  async (args: unknown) => {
    const expectsInput = !isZodVoid(serviceCallOpts.inputShape)
    const hasPagination = (
      argCheck: unknown,
    ): argCheck is { pagination: Pagination } | { input: { pagination: Pagination } } =>
      Boolean(
        typeof argCheck === "object" &&
        argCheck &&
        ("pagination" in argCheck ||
          ("input" in argCheck &&
            typeof argCheck.input === "object" &&
            argCheck.input &&
            "pagination" in argCheck.input)),
      )
    const expectsFilters = !isZodVoid(serviceCallOpts.filtersShape)
    const utils = createApiUtils({
      name: name ?? "No-Name call",
      inputShape: serviceCallOpts.inputShape,
      outputShape: serviceCallOpts.outputShape,
    }) as object
    const baseArgs = {
      client,
      slashEndingBaseUri: baseUri,
      ...utils,
    }
    if (expectsFilters) {
      return serviceCallOpts.callback({
        ...baseArgs,
        ...(expectsInput || hasPagination(args)
          ? {
              input:
                args && typeof args === "object" && "input" in args
                  ? args.input
                  : // TODO: probably can improve these below with two different type guards
                    hasPagination(args) && !expectsInput && "pagination" in args
                    ? { input: args.pagination }
                    : hasPagination(args) && "input" in args
                      ? { input: args.input }
                      : undefined,
            }
          : {}),
        parsedFilters:
          args && typeof args === "object" && "filters" in args
            ? parseFilters({ shape: serviceCallOpts.filtersShape, filters: args.filters })
            : undefined,
      })
    }
    return serviceCallOpts.callback({
      ...baseArgs,
      ...(expectsInput || hasPagination(args) ? { input: args } : {}),
    })
  }

export const removeReadonlyFields = <T extends z.ZodRawShape, TUnwrap extends (keyof T)[] = []>(
  shape: T,
  unwrap?: TUnwrap,
) => {
  const nonReadonlyEntries: [key: string, value: z.core.$ZodType][] = []
  const allEntries = Object.entries(shape)
  for (const [k, v] of allEntries) {
    if (isZodReadonly(v)) {
      if (unwrap && unwrap.includes(k)) {
        nonReadonlyEntries.push([k, v.unwrap()])
        continue
      }
      continue
    }
    nonReadonlyEntries.push([k, v])
  }

  return Object.fromEntries(nonReadonlyEntries) as StripZodReadonly<T, TUnwrap>
}
