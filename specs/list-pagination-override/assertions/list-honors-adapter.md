---
id: list-honors-adapter
parent: list-pagination-override
created: 2026-09-04T18:40:00Z
priority: 1
status: not_started
depends-on: pagination-adapter-config
branch: feature/list-pagination-override
---

# list uses the pagination adapter when provided

When a pagination adapter is configured, `createApi`'s `list` builds request params and parses the response envelope through the adapter instead of the Django defaults.

## Success Criteria

- Request query params for `list` come from `adapter.toRequestParams(pagination)` when an adapter is set (not `{ page, pageSize }`)
- The response is validated against `z.object(adapter.responseShape(entity))`, and the entity records are taken from `adapter.getResults(parsedEnvelope)`
- Records returned by `getResults` are still converted to camelCase per record (same normalization applied to the default `results`)
- Extra filters (`models.extraFilters`) still merge into the query params alongside the adapter's request params
- `list` returns the parsed envelope with the normalized entity array accessible under `results`
