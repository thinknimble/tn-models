---
id: record-passthrough-walkers
parent: record-field-passthrough
created: 2026-10-07T00:00:00Z
priority: 1
status: not_started
branch: feature/record-keys-passthrough
---

# The case-transform walkers keep record keys verbatim in both directions

`objectToCamelCaseArr` and `objectToSnakeCaseArr` accept an optional Zod schema and, when
given one, do not rewrite the keys of a value whose schema node is a `z.record(...)`.

## Success Criteria

- `objectToCamelCaseArr(data, schema)` returns the value of any `z.record(...)` field with
  its keys unchanged, while still camelCasing every declared sibling and nested field
- `objectToSnakeCaseArr(data, schema)` does the same on the write path, keyed off the
  camelCase input shape
- A record reached through `optional` / `nullable` / `readonly` / `default` wrappers is
  still recognized and passed through
- Records nested inside object fields and inside arrays of objects are protected at any depth
- A key that does not survive the camel↔snake round-trip (e.g. `cpt_code_1`) is preserved
  exactly when it lives inside a record field
