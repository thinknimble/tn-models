---
id: record-field-passthrough
created: 2026-10-07T00:00:00Z
priority: 1
---

# record-valued fields keep their keys verbatim through fromApi/toApi

`createApi` camelCases every response key and snake_cases every request key by walking
the payload blind — `objectToCamelCaseArr` / `objectToSnakeCaseArr` in
`src/utils/api/api.ts` recurse into every nested object and array with no reference to the
schema. That is correct for fields whose keys are *field names*, but wrong for a field
whose keys are *data*: a `z.record(...)` blob (rule configs, free-form metadata, a backend
JSON column) has keys the client does not own and must not rewrite.

The transform is also not reversible. `cpt_code_1` → `cptCode1` → `cpt_code1`: the
underscore before a trailing digit is dropped on the way back. Any blob key of that shape
is silently corrupted on write, and a round-tripped read no longer matches what the server
stored. Today the only workaround is to abandon `createApi` for the resource and hand-write
`fromApi`/`toApi` mappers that copy the blob across untouched.

## Context

The library already treats a record as a leaf on the **schema** side: `resolveRecursiveZod`
(`src/utils/zod/zod.ts`) has no record branch, so a `z.record(...)` falls through unchanged
rather than having its (dynamic, unknowable) keys snake_cased. The **data** side does not
follow the same rule — the two are decoupled. This spec aligns them: the data walk stops at
a record, exactly as the schema walk already does.

## Design (agreed approach)

- `objectToCamelCaseArr` / `objectToSnakeCaseArr` take an optional Zod schema and, when
  given one, walk it in lockstep with the data. A field whose schema (after unwrapping
  `optional`/`nullable`/`readonly`/`default`) is a `z.record(...)` is a leaf: its value is
  returned verbatim, keys untouched, no recursion.
- With no schema argument the walk is blind, exactly as before — a purely additive change.
- The schema is threaded from the four call sites that have it in hand: the `fromApi`
  (output shape) and `toApi` (input shape) handlers, and the two `list` result maps in
  `create-api.ts` and `create-paginated-call.ts`.
- Declaring a field `z.record(...)` is the whole opt-out — no new option, flag, or config.

Scope note: records nested behind unions/intersections are matched only to the depth the
existing schema walk already models; the common case (`z.record(...)` possibly wrapped in
`optional`/`nullable`/`default`, at top level or inside objects/arrays) is covered.

## Assertions

- `record-passthrough-walkers` — the walkers keep record keys verbatim, both directions
- `createapi-record-fields` — `list`/`retrieve`/`create`/`update` round-trip a record field intact
- `default-behavior-unchanged` — no-schema walk is byte-for-byte the same as today
- `record-passthrough-tests` — coverage for the record case and the blind default
