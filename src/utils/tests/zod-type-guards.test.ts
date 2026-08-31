import { describe, expect, it } from "vitest"
import { z } from "zod"
import {
  isZod,
  isZodArray,
  isZodBrand,
  isZodDefault,
  isZodIntersection,
  isZodNullable,
  isZodObject,
  isZodOptional,
  isZodPrimitive,
  isZodReadonly,
  isZodUnion,
  isZodVoid,
} from "../zod"
import { zodPrimitivesList } from "../zod/types"

describe("Zod 4 type guards", () => {
  describe("isZod", () => {
    it("returns true for any Zod 4 schema", () => {
      expect(isZod(z.string())).toBe(true)
      expect(isZod(z.object({}))).toBe(true)
      expect(isZod(z.array(z.string()))).toBe(true)
    })

    it("returns false for non-schemas", () => {
      expect(isZod(null)).toBe(false)
      expect(isZod(undefined)).toBe(false)
      expect(isZod("string")).toBe(false)
      expect(isZod(42)).toBe(false)
      expect(isZod({})).toBe(false)
    })
  })

  describe("isZodObject", () => {
    it("returns true for z.object()", () => {
      expect(isZodObject(z.object({ name: z.string() }))).toBe(true)
    })
    it("returns false for z.string()", () => {
      expect(isZodObject(z.string())).toBe(false)
    })
  })

  describe("isZodArray", () => {
    it("returns true for z.array()", () => {
      expect(isZodArray(z.array(z.string()))).toBe(true)
    })
    it("returns false for z.object()", () => {
      expect(isZodArray(z.object({}))).toBe(false)
    })
  })

  describe("isZodOptional", () => {
    it("returns true for .optional()", () => {
      expect(isZodOptional(z.string().optional())).toBe(true)
    })
    it("returns false for plain schema", () => {
      expect(isZodOptional(z.string())).toBe(false)
    })
  })

  describe("isZodNullable", () => {
    it("returns true for .nullable()", () => {
      expect(isZodNullable(z.string().nullable())).toBe(true)
    })
    it("returns false for plain schema", () => {
      expect(isZodNullable(z.string())).toBe(false)
    })
  })

  describe("isZodPrimitive", () => {
    it("returns true for all primitive types", () => {
      expect(isZodPrimitive(z.string())).toBe(true)
      expect(isZodPrimitive(z.number())).toBe(true)
      expect(isZodPrimitive(z.boolean())).toBe(true)
      expect(isZodPrimitive(z.date())).toBe(true)
      expect(isZodPrimitive(z.bigint())).toBe(true)
      expect(isZodPrimitive(z.undefined())).toBe(true)
      expect(isZodPrimitive(z.void())).toBe(true)
    })
    it("returns false for non-primitives", () => {
      expect(isZodPrimitive(z.object({}))).toBe(false)
      expect(isZodPrimitive(z.array(z.string()))).toBe(false)
    })
  })

  describe("isZodIntersection", () => {
    it("returns true for z.intersection()", () => {
      expect(isZodIntersection(z.intersection(z.object({ a: z.string() }), z.object({ b: z.number() })))).toBe(true)
    })
    it("returns false for z.object()", () => {
      expect(isZodIntersection(z.object({}))).toBe(false)
    })
  })

  describe("isZodUnion", () => {
    it("returns true for z.union()", () => {
      expect(isZodUnion(z.union([z.string(), z.number()]))).toBe(true)
    })
    it("returns false for z.string()", () => {
      expect(isZodUnion(z.string())).toBe(false)
    })
  })

  describe("isZodBrand", () => {
    // Zod 4 branding is purely a TypeScript-level feature with no distinct runtime type.
    // .brand() returns the same schema type, so isZodBrand always returns false.
    it("returns false for branded schemas (branding is transparent in Zod 4)", () => {
      expect(isZodBrand(z.string().brand("MyBrand"))).toBe(false)
    })
  })

  describe("isZodReadonly", () => {
    it("returns true for .readonly()", () => {
      expect(isZodReadonly(z.object({}).readonly())).toBe(true)
    })
    it("returns false for plain schema", () => {
      expect(isZodReadonly(z.object({}))).toBe(false)
    })
  })

  describe("isZodVoid", () => {
    it("returns true for z.void()", () => {
      expect(isZodVoid(z.void())).toBe(true)
    })
    it("returns false for z.string()", () => {
      expect(isZodVoid(z.string())).toBe(false)
    })
  })

  describe("isZodDefault", () => {
    it("returns true for .default()", () => {
      expect(isZodDefault(z.string().default("x"))).toBe(true)
    })
    it("returns false for plain schema", () => {
      expect(isZodDefault(z.string())).toBe(false)
    })
  })

  describe("zodPrimitivesList", () => {
    it("contains valid Zod 4 primitive type identifiers", () => {
      const expectedTypes = ["string", "number", "date", "bigint", "boolean", "undefined", "void"]
      expect(zodPrimitivesList).toEqual(expectedTypes)
    })
  })
})
