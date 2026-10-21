---
id: record-passthrough-tests
parent: record-field-passthrough
created: 2026-10-07T00:00:00Z
priority: 2
status: not_started
depends-on: createapi-record-fields
branch: feature/record-keys-passthrough
---

# Coverage for the record passthrough and the blind default

## Success Criteria

- Unit tests assert `objectToCamelCaseArr` / `objectToSnakeCaseArr` keep record keys verbatim
  with a schema, and still transform everything without one
- Tests cover a record behind `nullable`/`optional`, a record nested in an array of objects,
  and a lossy key (`cpt_code_1`) to prove the round-trip corruption is gone
- An integration test drives `createApi` `retrieve`/`list`/`create` with a `z.record` entity
  field and asserts the blob is intact on both request and response
- The existing suite continues to pass, demonstrating the additive-ness of the change
