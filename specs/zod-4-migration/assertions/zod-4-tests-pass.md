---
id: zod-4-tests-pass
parent: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 1
status: not_started
depends-on: zod-4-recursive-conversion
branch: feature/zod-4-migration
---

# All tests pass with Zod 4

The existing test suite passes with Zod 4 installed, confirming behavioral parity.

## Success Criteria

- `npm test` (or project's test command) exits with code 0
- Test files that use deprecated Zod 3 APIs (e.g. `z.string().email()` → `z.email()`, `.nonempty()` behavior change) are updated to Zod 4 equivalents
- No tests are skipped or deleted to achieve a green run — if a test fails, the underlying code is fixed, not the test removed
- The `zod-type.test.ts`, `zod-to-snake-case-recursive.test.ts`, `response.test.ts`, `create-api-utils.test.ts`, `create-api.test.ts`, `create-custom-call.test.ts`, `create-paginated-call.test.ts`, `filters.test.ts`, and `collection-manager.test.ts` files all pass
