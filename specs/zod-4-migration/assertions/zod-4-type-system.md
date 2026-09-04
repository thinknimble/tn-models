---
id: zod-4-type-system
parent: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 1
status: done
depends-on: zod-4-peer-dependency
branch: feature/zod-4-migration
---

# All TypeScript types compile with Zod 4

Every type definition across the library compiles cleanly against Zod 4's type exports with no `ts-ignore` workarounds added for Zod 4 compatibility.

## Success Criteria

- `z.ZodTypeAny` references are replaced with `z.ZodType` (Zod 4 removes `ZodTypeAny`)
- Any usage of `ZodType<Output, Def, Input>` three-parameter generic is updated to `ZodType<Output, Input>` (the `Def` generic is removed in Zod 4)
- `ZodRawShape` references compile (verify this type still exists in Zod 4; if renamed, update all references)
- `ZodUnionOptions` references compile (verify; if removed, replace with the Zod 4 equivalent)
- `ZodPrimitives` type in `src/utils/zod/types.ts` compiles — `z.ZodNativeEnum` is deprecated in Zod 4, replace with Zod 4 equivalent or remove if no longer needed
- `FiltersShape` in `src/utils/filters.ts` compiles — uses `z.ZodString`, `z.ZodNumber`, `z.ZodArray`, `z.ZodBoolean` which must exist as types in Zod 4
- `z.ZodError` type is still available for `parseResponse` error callbacks
- `z.infer<T>` works unchanged
- `tsc --noEmit` exits with code 0
