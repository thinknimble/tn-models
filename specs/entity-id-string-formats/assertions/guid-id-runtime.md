---
id: guid-id-runtime
parent: entity-id-string-formats
created: 2026-10-24T01:23:01Z
priority: 1
status: not_started
depends-on: entity-id-accepts-string-formats
branch: fix/entity-id-string-formats
---

# createApi works at runtime with a GUID id

An API made by `createApi` with an entity whose `id` is `z.guid()` or `z.guid().readonly()` sends and parses GUID ids correctly, for a generated UUID and for a version-0 GUID such as `00000000-0000-0000-0000-000000000001`.

## Success Criteria

- `create` returns the camel-cased entity with the GUID id.
- `retrieve` calls `{baseUri}/{id}/` and returns the entity.
- `update` sends a PATCH to `{baseUri}/{id}/` and does not throw for a version-0 GUID.
- `list` returns the camel-cased results with their GUID ids.
- No call logs a response-mismatch warning for a valid GUID.
- The existing string-id and number-id tests pass with no change.
