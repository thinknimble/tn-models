---
id: createapi-record-fields
parent: record-field-passthrough
created: 2026-10-07T00:00:00Z
priority: 1
status: not_started
depends-on: record-passthrough-walkers
branch: feature/record-keys-passthrough
---

# createApi round-trips a z.record field without corrupting its keys

An entity whose shape declares a `z.record(...)` field can be served by plain `createApi` —
no hand-written `fromApi`/`toApi` — with the blob surviving the wire intact.

## Success Criteria

- The output-shape (`fromApi`) and input-shape (`toApi`) handlers in `src/utils/api/api.ts`
  pass their shape to the walker, so `retrieve`, `create`, and `update` preserve record keys
- The `list` result maps in `src/api/create-api.ts` and `src/api/create-paginated-call.ts`
  pass the entity shape to the walker, so paginated results preserve record keys too
- Given a server row `{ rules: { cpt_code_1: 1, other_lines_excludes_cpt_code_2: true } }`,
  the value read back from every method deep-equals the server's, keys included
- On `create`/`update`, the record reaches the request body with its keys unchanged
