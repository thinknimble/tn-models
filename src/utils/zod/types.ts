import { SnakeCase } from "@thinknimble/tn-utils"
import { z } from "zod"

type InferZodArray<T extends z.ZodArray<z.core.SomeType>> =
  T extends z.ZodArray<infer TEl> ? z.ZodArray<ZodRecursiveResult<TEl>> : never

type InferZodObject<T extends z.ZodObject<z.ZodRawShape>> =
  T extends z.ZodObject<infer TZodObj> ? z.ZodObject<ZodRawShapeToSnakedRecursive<TZodObj>> : never

type InferZodOptional<T extends z.ZodOptional<z.core.SomeType>> =
  T extends z.ZodOptional<infer TOpt> ? z.ZodOptional<ZodRecursiveResult<TOpt>> : never

type InferZodNullable<T extends z.ZodNullable<z.core.SomeType>> =
  T extends z.ZodNullable<infer TNull> ? z.ZodNullable<ZodRecursiveResult<TNull>> : never

type InferZodIntersection<T extends z.ZodIntersection<z.core.SomeType, z.core.SomeType>> =
  T extends z.ZodIntersection<infer TLeft, infer TRight>
    ? z.ZodIntersection<ZodRecursiveResult<TLeft>, ZodRecursiveResult<TRight>>
    : never

type InferZodUnionOptions<T extends readonly z.core.SomeType[]> = T["length"] extends 0
  ? T
  : T extends readonly [infer TOpt, ...infer Rest]
    ? TOpt extends z.core.SomeType
      ? Rest extends readonly z.core.SomeType[]
        ? readonly [ZodRecursiveResult<TOpt>, ...InferZodUnionOptions<Rest>]
        : ZodRecursiveResult<TOpt>
      : never
    : T extends readonly [infer TOptAnother]
      ? TOptAnother extends z.core.SomeType
        ? ZodRecursiveResult<TOptAnother>
        : never
      : never
type InferZodUnion<T extends z.ZodUnion<readonly z.core.SomeType[]>> =
  T extends z.ZodUnion<infer TOpts> ? z.ZodUnion<InferZodUnionOptions<TOpts>> : never

/**
 * Determine the type of processing a zod shape into its snake cased equivalent
 */
export type ZodRawShapeToSnakedRecursive<T extends z.ZodRawShape> = {
  [K in keyof T as SnakeCase<K>]: T[K] extends z.ZodRawShape
    ? never
    : T[K] extends z.ZodOptional<z.core.SomeType>
      ? InferZodOptional<T[K]>
      : //check whether it is array or object, else just default to its type
        T[K] extends z.ZodNullable<z.core.SomeType>
        ? InferZodNullable<T[K]>
        : T[K] extends z.ZodObject<z.ZodRawShape>
          ? InferZodObject<T[K]>
          : T[K] extends z.ZodArray<z.core.SomeType>
            ? InferZodArray<T[K]>
            : T[K] extends z.ZodIntersection<z.core.SomeType, z.core.SomeType>
              ? InferZodIntersection<T[K]>
              : T[K] extends z.ZodUnion<readonly z.core.SomeType[]>
                ? InferZodUnion<T[K]>
                : // : T[K] extends z.ZodBranded<infer TZod, string | number | symbol>
                  // ? TZod
                  T[K]
}
type ZodRecursiveResult<T extends z.core.SomeType> =
  T extends z.ZodObject<z.ZodRawShape>
    ? InferZodObject<T>
    : T extends z.ZodArray<z.core.SomeType>
      ? InferZodArray<T>
      : T extends z.ZodOptional<z.core.SomeType>
        ? InferZodOptional<T>
        : T extends z.ZodNullable<z.core.SomeType>
          ? InferZodNullable<T>
          : T extends z.ZodIntersection<z.core.SomeType, z.core.SomeType>
            ? InferZodIntersection<T>
            : T extends z.ZodUnion<readonly z.core.SomeType[]>
              ? InferZodUnion<T>
              : T

/**
 * Zod 4 primitive type identifiers. These match the `schema.type` string
 * returned by Zod 4's public API (e.g. z.string().type === "string").
 */
export const zodPrimitivesList = ["string", "number", "date", "bigint", "boolean", "undefined", "void"] as const

//! trying to use the above list to create these types is failing bc of the class nature of the zod types
export type ZodPrimitives =
  z.ZodString | z.ZodNumber | z.ZodDate | z.ZodBigInt | z.ZodBoolean | z.ZodEnum<any> | z.ZodUndefined | z.ZodVoid

/**
 * Directly compute the inferred output type from a raw Zod shape.
 * We avoid `z.infer<z.ZodObject<T>>` because Zod 4's `$InferObjectOutput` collapses
 * shapes with a string index signature (from `z.ZodRawShape`) into `Record<string, ...>`,
 * losing specific keys like "id". This direct mapped type preserves key information.
 */
type InferShape<T extends z.ZodRawShape> = {
  [K in keyof T]: z.core.output<T[K]>
}

/**
 * Infer the shape type, removing readonly marks and inferring their inner types
 */
export type GetInferredFromRaw<T extends z.ZodRawShape> = InferShape<UnwrapZodReadonly<T>>

export type GetInferredFromRawWithReadonly<T extends z.ZodRawShape> = InferShape<T>

export type GetInferredFromRawWithStripReadonly<T extends z.ZodRawShape> = InferShape<StripZodReadonly<T>>

export type PartializeShape<T extends z.ZodRawShape> = {
  [K in keyof T]: z.ZodOptional<T[K]>
}
export type InferShapeOrZod<T extends object> = T extends z.ZodRawShape
  ? GetInferredFromRaw<T>
  : T extends z.ZodType
    ? z.infer<T>
    : never

/**
 * Unwrap readonly recursively, useful for the library when trying to reuse regular models as output
 */
export type UnwrapZodReadonly<T extends z.ZodRawShape> = {
  /**
   * Summary:
   * UnwrapZodReadonly T extends z.ZodRawShape
   *  K in keyof T: T[K] is z.readonly<TInner> ?
   *    TInner is z.object ? HandleZodObject :
   *    TInner is z.array ? HandleZodArray :
   *    -nothing to do -
   *    TInner
   *  -nothing to do-
   *  T
   */
  [K in keyof T]: T[K] extends z.ZodReadonly<infer TROInner>
    ? HandleZodReadonly<T[K]>
    : T[K] extends z.ZodObject<any>
      ? HandleZodObjectReadonly<T[K]>
      : T[K] extends z.ZodArray<any>
        ? HandleZodArrayReadonly<T[K]>
        : T[K]
}

export type HandleZodReadonly<T extends z.ZodReadonly<any>> =
  T extends z.ZodReadonly<infer TROInner>
    ? TROInner extends z.ZodArray<any>
      ? HandleZodArrayReadonly<TROInner>
      : TROInner extends z.ZodObject<any>
        ? HandleZodObjectReadonly<TROInner>
        : TROInner extends z.core.$ZodType
          ? TROInner
          : z.ZodType
    : never

export type HandleZodObjectReadonly<T extends z.ZodObject<any>> =
  T extends z.ZodObject<infer TShape> ? z.ZodObject<UnwrapZodReadonly<TShape>> : T

export type HandleZodArrayReadonly<T extends z.ZodArray<any>> =
  T extends z.ZodArray<infer TElement>
    ? TElement extends z.ZodObject<z.ZodRawShape>
      ? z.ZodArray<HandleZodObjectReadonly<TElement>>
      : TElement extends z.ZodArray<any>
        ? z.ZodArray<HandleZodArrayReadonly<TElement>>
        : TElement extends z.ZodReadonly<infer TROInner>
          ? z.ZodArray<TROInner extends z.core.$ZodType ? TROInner : z.ZodType>
          : z.ZodArray<TElement extends z.core.$ZodType ? TElement : z.ZodType>
    : never

/**strip readonly fields */

/**
 * Unwrap readonly recursively, useful for the library when trying to reuse regular models as output
 */
export type StripZodReadonly<T extends z.ZodRawShape, TUnwrap extends (keyof T)[] = []> = {
  /**
   * Summary:
   * UnwrapZodReadonly T extends z.ZodRawShape
   *  K in keyof T: T[K] is z.readonly<TInner> ?
   *    TInner is z.object ? HandleZodObject :
   *    TInner is z.array ? HandleZodArray :
   *    -nothing to do -
   *    TInner
   *  -nothing to do-
   *  T
   */
  [
    K in keyof T as K extends TUnwrap[number]
      ? K
      : T[K] extends z.ZodReadonly<any>
        ? never
        : T[K] extends z.ZodArray<infer TElement>
          ? TElement extends z.ZodReadonly<any>
            ? never
            : K
          : K
  ]: T[K] extends z.ZodObject<any>
    ? HandleStripZodObjectReadonly<T[K]>
    : T[K] extends z.ZodArray<any>
      ? HandleStripZodArrayReadonly<T[K]>
      : T[K]
}

export type HandleStripZodObjectReadonly<T extends z.ZodObject<any>> =
  T extends z.ZodObject<infer TShape> ? z.ZodObject<StripZodReadonly<TShape>> : T

export type HandleStripZodArrayReadonly<T extends z.ZodArray<any>> =
  T extends z.ZodArray<infer TElement>
    ? TElement extends z.ZodObject<z.ZodRawShape>
      ? z.ZodArray<HandleStripZodObjectReadonly<TElement>>
      : TElement extends z.ZodArray<any>
        ? z.ZodArray<HandleStripZodArrayReadonly<TElement>>
        : never
    : never
