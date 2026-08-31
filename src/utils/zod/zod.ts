import { toSnakeCase } from "@thinknimble/tn-utils"
import { z } from "zod"
import { ZodPrimitives, ZodRawShapeToSnakedRecursive, zodPrimitivesList } from "./types"

/**
 * Zod 4 type discrimination strategy:
 * - `schema.type` is the public API returning lowercase strings (e.g. "string", "object", "array")
 * - `schema._zod.def.type` mirrors the same value via internals
 * - `ZodFirstPartyTypeKind` is empty in Zod 4 — we use string literals instead
 * - Branding is purely a TypeScript-level feature in Zod 4 (no distinct runtime type)
 */

export const isZod = (input: unknown): input is z.ZodType & { type: string } => {
  return Boolean(
    input &&
    typeof input === "object" &&
    "_zod" in input &&
    (input as any)._zod &&
    typeof (input as any)._zod === "object" &&
    typeof (input as any)._zod.def?.type === "string",
  )
}
export const isZodArray = (input: unknown): input is z.ZodArray<z.ZodTypeAny> => {
  return isZod(input) && input.type === "array"
}
export const isZodObject = (input: unknown): input is z.ZodObject<z.ZodRawShape> => {
  return isZod(input) && input.type === "object"
}
export const isZodOptional = (input: z.ZodTypeAny): input is z.ZodOptional<z.ZodTypeAny> => {
  return isZod(input) && input.type === "optional"
}
export const isZodNullable = (input: unknown): input is z.ZodNullable<z.ZodTypeAny> => {
  return isZod(input) && input.type === "nullable"
}
export const isZodPrimitive = (input: unknown): input is ZodPrimitives => {
  return isZod(input) && zodPrimitivesList.includes(input.type as (typeof zodPrimitivesList)[number])
}
export const isZodIntersection = (input: unknown): input is z.ZodIntersection<z.ZodTypeAny, z.ZodTypeAny> => {
  return isZod(input) && input.type === "intersection"
}
export const isZodUnion = (input: unknown): input is z.ZodUnion<readonly [z.ZodTypeAny]> => {
  return isZod(input) && input.type === "union"
}
// Zod 4 branding is transparent at runtime — .brand() does not create a distinct schema type.
// This guard always returns false. Branded schemas fall through to their underlying type handler.
export const isZodBrand = (input: unknown): input is never => {
  return false
}
export const isZodReadonly = (input: unknown): input is z.ZodReadonly<any> => {
  return isZod(input) && input.type === "readonly"
}
export const isZodVoid = (input: unknown): input is z.ZodVoid => {
  return isZod(input) && input.type === "void"
}
export const isZodDefault = (input: unknown): input is z.ZodDefault<z.ZodTypeAny> => {
  return isZod(input) && input.type === "default"
}

//TODO: we should probably revisit the types here but they seem not too friendly to tackle given the recursive nature of this operation
export function resolveRecursiveZod<T extends z.ZodTypeAny>(zod: T) {
  //: ZodRecursiveResult<T>
  if (isZodReadonly(zod)) {
    return zodReadonlyToSnakeRecursive(zod)
  }
  // Zod 4: branding is transparent at runtime, no isZodBrand check needed
  if (isZodObject(zod)) {
    return zodObjectToSnakeRecursive(zod)
  }
  if (isZodArray(zod)) {
    return zodArrayRecursive(zod)
  }
  if (isZodOptional(zod)) {
    return zodOptionalRecursive(zod)
  }
  if (isZodNullable(zod)) {
    return zodNullableRecursive(zod)
  }
  if (isZodIntersection(zod)) {
    return zodIntersectionRecursive(zod)
  }
  if (isZodUnion(zod)) {
    return zodUnionRecursive(zod)
  }
  if (isZodDefault(zod)) {
    return zodDefaultRecursive(zod)
  }
  return zod
}

//! could not escape of these any here. in the three functions below
function zodArrayRecursive<T extends z.ZodTypeAny>(zodArray: z.ZodArray<T>): any {
  //: InferZodArray<z.ZodArray<T>>
  const innerElement = zodArray.element
  return resolveRecursiveZod(innerElement).array()
}

function zodNullableRecursive<T extends z.ZodTypeAny>(zodNullable: z.ZodNullable<T>): any {
  // : InferZodNullable<z.ZodNullable<T>>
  const unwrapped = zodNullable.unwrap()
  return resolveRecursiveZod(unwrapped).nullable()
}

function zodOptionalRecursive<T extends z.ZodTypeAny>(zodOptional: z.ZodOptional<T>): any {
  // : InferZodOptional<z.ZodOptional<T>>
  const unwrapped = zodOptional.unwrap()
  return resolveRecursiveZod(unwrapped).optional()
}

function zodIntersectionRecursive<T extends z.ZodIntersection<z.ZodTypeAny, z.ZodTypeAny>>(zod: T): any {
  const { left, right } = zod._def
  return resolveRecursiveZod(left).and(resolveRecursiveZod(right))
}

function zodUnionRecursive<T extends z.ZodUnion<readonly [z.ZodTypeAny]>>(zod: T): any {
  const allUnions = zod._def.options
  const remapped: unknown = allUnions.map((u) => resolveRecursiveZod(u))
  return z.union(remapped as readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]])
}

//TODO: why are we not using `resolveRecursiveZod` as the main method instead..
/**
 * Recursively convert a zod object into its snake_cased equivalent
 * !! This is the core method of the library.
 */
export function zodObjectToSnakeRecursive<T extends z.ZodRawShape>(
  zodObj: z.ZodObject<T>,
): z.ZodObject<ZodRawShapeToSnakedRecursive<T>> {
  const resultingShape = Object.fromEntries(
    Object.entries(zodObj.shape).map(([k, v]) => {
      const snakeCasedKey = toSnakeCase(k)
      return [snakeCasedKey, resolveRecursiveZod(v)]
    }),
  ) as ZodRawShapeToSnakedRecursive<T>
  // Zod 4: passthrough is indicated by a catchall of z.unknown(), not unknownKeys
  const catchallType = (zodObj._def as any).catchall?.type
  return catchallType === "unknown" ? z.object(resultingShape).passthrough() : z.object(resultingShape)
}

function zodReadonlyToSnakeRecursive<T extends z.ZodReadonly<any>>(zod: T): any {
  return resolveRecursiveZod(zod.unwrap()).readonly()
}

function zodDefaultRecursive<T extends z.ZodDefault<z.ZodTypeAny>>(zodDefault: T): any {
  const innerType = zodDefault._def.innerType
  const defaultValue = zodDefault._def.defaultValue
  // Zod 4: defaultValue is the raw value, not a function
  return resolveRecursiveZod(innerType).default(defaultValue)
}
