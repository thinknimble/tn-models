---
id: default-behavior-unchanged
parent: record-field-passthrough
created: 2026-10-07T00:00:00Z
priority: 1
status: not_started
branch: feature/record-keys-passthrough
---

# The no-schema walk is unchanged — a purely additive change

Callers that invoke the walkers without a schema, and any consumer with no `z.record` field,
get the exact behavior that exists today.

## Success Criteria

- `objectToCamelCaseArr(data)` and `objectToSnakeCaseArr(data)` with no second argument
  transform every key at every depth, identical to current behavior
- `parseFilters` (which snake-cases blind, with no schema) is unaffected
- A `createApi` whose entity has no record field produces byte-for-byte the same results
- All existing walker, `createApi`, custom-call, and paginated-call tests pass unmodified
- The published return types of `list`/`retrieve`/`create`/`update` are unchanged
