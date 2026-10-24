---
id: entity-id-string-formats
created: 2026-10-24T01:23:00Z
priority: 1
---

# Entity id accepts Zod 4 string-format schemas

In Zod 4, `z.guid()`, `z.uuid()`, `z.cuid()`, `z.ulid()`, `z.email()` and the other top-level string formats return subclasses of `z.ZodStringFormat`, not `z.ZodString`. The `EntityShape` type in `src/api/create-api.ts` admits only `z.ZodString`, `z.ZodNumber`, and their readonly forms for `id`. Thus an entity shape with `id: z.guid()` fails type checking with TS2322 in `createApi`.

A consumer needs `z.guid()` because Zod 4 `z.uuid()` rejects IDs with version 0, for example `00000000-0000-0000-0000-000000000001`, which Zod 3 `z.string().uuid()` accepted.

Zod 4 number formats (`z.int()`, `z.int32()`, `z.float64()`) extend `z.ZodNumber`, so they are already accepted. No change is necessary for them.

## Scope

- In scope: the `id` constraint of `EntityShape`, and the runtime of `createApi` (`create`, `retrieve`, `update`, `list`) for an entity with a string-format id.
- Out of scope: `ZodPrimitives` (custom call primitive inputs and outputs) and `FiltersShape`. They also list only `z.ZodString` and can be a separate change.
- Rejected: a general constraint such as `z.ZodType<string | number>`. It admits transforms, literals, enums and unions, which are not plain string or number IDs.

## Assertions

- `entity-id-accepts-string-formats` - the type admits string formats and their readonly forms, and nothing that is not a string or number schema
- `guid-id-runtime` - `create`, `retrieve`, `update`, and `list` work with a GUID id
