---
id: pagination-adapter-config
parent: list-pagination-override
created: 2026-09-04T18:40:00Z
priority: 1
status: in_progress
branch: feature/list-pagination-override
locked-by: builder-MacBook-Pro.local-93031-1788551866
---

# createApi accepts an optional pagination adapter

`createApi`'s `options` accepts an optional pagination adapter describing how a non-Django backend paginates. When omitted, the API behaves exactly as today.

## Success Criteria

- `createApi` `options` has an optional `pagination` field with three members: `toRequestParams(pagination) => Record<string, unknown>`, `responseShape(entityZod) => ZodRawShape`, and `getResults(parsedEnvelope) => unknown[]`
- The field is optional — existing `createApi` calls that pass no `pagination` compile and run unchanged
- `getResults` return type is tied to the entity so `list`'s returned `results` remain typed as the entity array (not `unknown[]`) when an adapter is supplied
- The adapter type is exported from the package so consumers can define one in a typed variable
