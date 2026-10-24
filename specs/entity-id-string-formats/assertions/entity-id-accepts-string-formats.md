---
id: entity-id-accepts-string-formats
parent: entity-id-string-formats
created: 2026-10-24T01:23:00Z
priority: 1
status: done
branch: fix/entity-id-string-formats
---

# EntityShape id admits Zod 4 string-format schemas and their readonly forms

The `id` of `EntityShape` admits `z.ZodString`, `z.ZodStringFormat` (all Zod 4 string formats), `z.ZodNumber` (including number formats), and the readonly form of each. It admits no schema whose output is not a plain string or number.

## Success Criteria

- `createApi` accepts an entity with `id: z.guid()` and with `id: z.guid().readonly()` with no type error.
- `createApi` accepts an entity with `id` from `z.uuid()`, `z.cuid()`, and `z.ulid()`, and with `id: z.int()`.
- For a string-format id, the `id` parameter of `retrieve` and `remove` is `string`. For `z.int()` it is `number`.
- An entity with `id: z.boolean()` is still a type error.
- The type tests run in `pnpm lint` (`tsc`), and fail on `main` before the fix.
- `CHANGELOG.md` has an `Unreleased` entry that suggests version 5.0.1.

**Tests:** `src/api/tests/create-api.test.ts` ("accepts Zod 4 string and number format schemas as the id"), checked by `pnpm lint`.
