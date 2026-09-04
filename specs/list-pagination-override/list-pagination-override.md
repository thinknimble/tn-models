---
id: list-pagination-override
created: 2026-09-04T18:40:00Z
priority: 1
---

# list pagination shape is overridable for non-Django backends

`createApi`'s `list` currently hardcodes the Django REST Framework pagination contract on both sides of the wire: request params `{ page, pageSize }` and response envelope `{ count, next, previous, results }`. There is no way to consume a backend that paginates differently. This spec adds an optional pagination adapter so a consumer can override request params and the response envelope, while the Django shape remains the default when no adapter is supplied.

## Context

Current hardcoded points:

- **Request params** — `src/api/create-api.ts` builds pagination query params from `paginationFiltersZodShape` (`{ page, pageSize }`), defined in `src/utils/filters.ts`.
- **Response envelope** — `list` parses with `getPaginatedSnakeCasedZod(models.entity)` from `src/utils/pagination.ts`, which fixes `{ count, next, previous, results }`, then maps `results` through `objectToCamelCaseArr`.
- **Paginated custom call** — `createPaginatedServiceCall` in `src/api/create-paginated-call.ts` duplicates the same hardcoded request/response shape via `getPaginatedShape(outputShape)`.

## Adapter design (agreed approach)

A single optional pagination adapter, configured per API client on `createApi`'s `options`:

- `toRequestParams(pagination)` — maps the client-side pagination object to backend query params (e.g. `page`/`size` → `limit`/`offset`).
- `responseShape(entityZod)` — returns the Zod raw shape of the full response envelope for that entity.
- `getResults(parsedEnvelope)` — extracts the array of entity records from the parsed envelope.

The same adapter shape is accepted by `createPaginatedServiceCall` via its `opts` so the two list paths stay consistent.

Scope note: this covers page/offset-style backends. Cursor-based pagination (which the page-based `Pagination` class does not model) is out of scope for this spec.

## Assertions

- `pagination-adapter-config` — the adapter is accepted and validated
- `list-honors-adapter` — `createApi` `list` uses it
- `paginated-call-honors-adapter` — `createPaginatedServiceCall` uses it
- `default-django-shape-unchanged` — no-adapter behavior is byte-for-byte the same
- `pagination-override-tests` — coverage for a non-Django backend and the default
