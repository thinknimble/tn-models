---
id: pagination-override-tests
parent: list-pagination-override
created: 2026-09-04T18:40:00Z
priority: 2
status: not_started
depends-on: list-honors-adapter
branch: feature/list-pagination-override
---

# Pagination override is covered by tests

Tests exercise a non-Django backend through the adapter and confirm the default path is untouched.

## Success Criteria

- A test defines an adapter for a non-Django envelope (e.g. `{ items, total }` with `limit`/`offset` request params) and asserts `list` sends the mapped params and returns camelCased entities from the custom envelope
- A test asserts that with no adapter, `list` still sends `{ page, pageSize }` and parses `{ count, next, previous, results }`
- A test covers the same adapter on `createPaginatedServiceCall`
- A type-level check confirms `list`'s `results` is typed as the entity array when an adapter is supplied
- `pnpm test` passes
