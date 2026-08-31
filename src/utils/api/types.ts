import { SnakeCasedPropertiesDeep } from "@thinknimble/tn-utils"
import { z } from "zod"
import { GetInferredFromRaw, ZodPrimitives } from "../zod"

export type ToApiCall<TInput extends z.ZodRawShape | z.ZodType> = (
  obj: object,
) => TInput extends z.ZodRawShape
  ? SnakeCasedPropertiesDeep<GetInferredFromRaw<TInput>>
  : TInput extends z.ZodType
    ? z.infer<TInput>
    : never

export type FromApiCall<TOutput extends z.ZodRawShape | z.ZodType> = (
  obj: object,
) => TOutput extends z.ZodRawShape ? GetInferredFromRaw<TOutput> : TOutput extends z.ZodType ? z.infer<TOutput> : never

type FromApiUtil<T extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>> = {
  /**
   * Given an object, parses the response based on outputShape, it turns the result keys into camelCase. It also shows a warning if the outputShape does not match the passed object
   */
  fromApi: FromApiCall<T>
}
type ToApiUtil<T extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>> = {
  /**
   * Given an object, parses the input and turns its keys into snake_case
   */
  toApi: ToApiCall<T>
}

type FromApiOrUnknown<
  T extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>,
  TIsPrimitive extends boolean = T extends ZodPrimitives ? true : false,
> = TIsPrimitive extends true ? unknown : T extends z.ZodVoid ? unknown : { utils: FromApiUtil<T> }
type ToApiOrUnknown<
  T extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>,
  TIsPrimitive extends boolean = T extends ZodPrimitives ? true : false,
> = TIsPrimitive extends true ? unknown : T extends z.ZodVoid ? unknown : { utils: ToApiUtil<T> }

export type CallbackUtils<
  TInput extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>,
  TOutput extends z.ZodRawShape | ZodPrimitives | z.ZodArray<z.ZodType>,
> = FromApiOrUnknown<TOutput> & ToApiOrUnknown<TInput>
