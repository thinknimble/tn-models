---
id: zod-4-type-discrimination
parent: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 1
status: not_started
depends-on: zod-4-peer-dependency
branch: feature/zod-4-migration
---

# All isZod* type guards correctly identify Zod 4 schemas

The 12 type guard functions in `src/utils/zod/zod.ts` return correct results for Zod 4 schemas. Zod 4 restructures internals (`_def` → `._zod.def`, `ZodFirstPartyTypeKind` may not exist), so the duck-typing strategy must adapt.

## Success Criteria

- `isZod` returns `true` for any Zod 4 schema instance
- `isZodObject` returns `true` for `z.object({...})` and `false` for `z.string()`
- `isZodArray` returns `true` for `z.array(z.string())` and `false` for `z.object({})`
- `isZodOptional` returns `true` for `z.string().optional()` and `false` for `z.string()`
- `isZodNullable` returns `true` for `z.string().nullable()` and `false` for `z.string()`
- `isZodPrimitive` returns `true` for `z.string()`, `z.number()`, `z.boolean()`, `z.date()`, `z.bigint()`, `z.undefined()`, `z.void()`
- `isZodIntersection` returns `true` for `z.intersection(a, b)`
- `isZodUnion` returns `true` for `z.union([a, b])`
- `isZodBrand` returns `true` for branded schemas (or is removed if Zod 4 drops branding entirely — check Zod 4's branding API)
- `isZodReadonly` returns `true` for `z.object({}).readonly()`
- `isZodVoid` returns `true` for `z.void()`
- `isZodDefault` returns `true` for `z.string().default("x")`
- `zodPrimitivesList` array contains valid Zod 4 type references (class references like `z.ZodString` may not exist in Zod 4 — adapt accordingly)

**Note:** Zod 4 may offer a public discrimination API (e.g. `schema._zod.def._typeName` or similar). Prefer any public API over reaching into undocumented internals. If no public API exists, document the chosen duck-typing strategy in a code comment.
