---
id: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 1
---

# Library is compatible with Zod 4

The library compiles, runs, and passes all tests against Zod 4. The public API surface (`createApi`, `createCustomServiceCall`, `createCustomServiceCall.standAlone`, `createWSApi`) is unchanged — consumers upgrade Zod and tn-models-fp together with no API-level changes on the tn-models side.

## Context

The library is deeply coupled to Zod 3 internals: `_def.typeName` duck-typing, `ZodFirstPartyTypeKind` enum, class-based type references (`z.ZodString`, `z.ZodNumber`), and internal properties like `._def.unknownKeys`. Zod 4 rewrites all of these:

- `._def` moves to `._zod.def`
- `ZodFirstPartyTypeKind` restructured
- `z.ZodTypeAny` removed (use `z.ZodType`)
- `ZodBranded` removed
- `ZodType` generic changes from `<Output, Def, Input>` to `<Output, Input>`
- `.passthrough()` and `.strict()` deprecated in favor of `z.looseObject()` / `z.strictObject()`
- `z.nativeEnum()` deprecated
- Class references for primitives may not exist

This is a semver major for tn-models-fp. Consumers must be on Zod 4 to use the new version.

## Affected Files

- `src/utils/zod/zod.ts` — all `isZod*` functions, `resolveRecursiveZod`, `zodObjectToSnakeRecursive`
- `src/utils/zod/types.ts` — `ZodPrimitives`, `ZodRawShapeToSnakedRecursive`, all recursive inference types
- `src/utils/response.ts` — `parseResponse` uses `z.ZodType`, `z.ZodError`
- `src/utils/api/api.ts` — `createToApiHandler`, `createFromApiHandler`, `removeReadonlyFields`
- `src/utils/api/types.ts` — `CallbackUtils` types
- `src/utils/filters.ts` — `FiltersShape` type uses `z.ZodString`, `z.ZodNumber` etc.
- `src/utils/pagination.ts` — uses `z.number()`, `z.object()`
- `src/api/types.ts` — heavy use of `ZodTypeAny`, `ZodRawShape`, `ZodVoid`, `ZodArray`
- `src/api/create-api.ts` — `EntityShape`, all CRUD method types
- `src/api/create-custom-call.ts` — `ZodPrimitives`, `ZodVoid` references
- `src/api/create-ws-api.ts` — Zod shape types
- `package.json` — peer/dev dependencies
