---
id: default-django-shape-unchanged
parent: list-pagination-override
created: 2026-09-04T18:40:00Z
priority: 1
status: done
depends-on: pagination-adapter-config
branch: feature/list-pagination-override
---

# Default pagination behavior is unchanged without an adapter

Consumers who do not pass a pagination adapter get the exact Django behavior that exists today — this is a purely additive change.

## Success Criteria

- With no `pagination` adapter, `list` sends `{ page, pageSize }` request params and parses the `{ count, next, previous, results }` envelope, identical to current behavior
- The default is implemented as an adapter equivalent to today's Django shape (request `{ page, pageSize }`, envelope from `getPaginatedSnakeCasedZod`, `getResults = r => r.results`), so there is a single code path rather than a branch
- All existing `list` and pagination tests pass without modification
- The return type of `list` for an adapter-less API is unchanged from the current published type

**Tests:** src/api/tests/default-django-shape-unchanged.test.ts (plus the unmodified `list` suite in src/api/tests/create-api.test.ts)
