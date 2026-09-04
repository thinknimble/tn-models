---
id: paginated-call-honors-adapter
parent: list-pagination-override
created: 2026-09-04T18:40:00Z
priority: 2
status: not_started
depends-on: pagination-adapter-config
branch: feature/list-pagination-override
---

# createPaginatedServiceCall accepts the same adapter

`createPaginatedServiceCall` honors a pagination adapter passed through its `opts`, using the same adapter contract as `createApi`, so both list paths behave consistently against non-Django backends.

## Success Criteria

- `createPaginatedServiceCall`'s `opts` accepts an optional `pagination` adapter of the same type used by `createApi`
- When supplied, request params come from `adapter.toRequestParams`, the response is validated against `adapter.responseShape(outputShape)`, and records come from `adapter.getResults`
- When omitted, behavior is identical to today (`getPaginatedShape(outputShape)`, `{ page, pageSize }` params)
- Records are camelCase-normalized consistently with the non-paginated path
