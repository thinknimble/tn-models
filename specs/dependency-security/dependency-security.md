---
id: dependency-security
created: 2026-09-04T17:00:00Z
priority: 2
---

# No known-vulnerable dependency versions are installed

The dependency tree is free of the versions flagged by GitHub Dependabot on the default branch: the `@faker-js/faker` `helpers.fake` RCE (high) and the `esbuild` dev-server file-read issue (low). Both are dev/transitive dependencies — no runtime code path is affected — but the installed versions are moved to patched ranges and the test suite continues to pass.

## Context

Three open Dependabot alerts as of 2026-09-04:

- `@faker-js/faker` — `helpers.fake` exploitable into arbitrary code execution (high). Vulnerable `<= 10.4.0`, patched `10.5.0`. The project currently pins `^7.6.0`, so resolving this is a **major upgrade (7 → 10)**, not a patch bump. The v8 rename means every faker call site in the test suite must migrate:
  - `faker.datatype.number()` → `faker.number.int()`
  - `faker.datatype.string()` → `faker.string.alphanumeric()` (or equivalent)
  - `faker.datatype.uuid()` → `faker.string.uuid()`
  - `faker.name.firstName()` / `faker.name.lastName()` → `faker.person.firstName()` / `faker.person.lastName()`
- `esbuild` — arbitrary file read via the dev server on Windows (low). Vulnerable `>= 0.27.3, < 0.28.1`, patched `0.28.1`. Pulled in transitively (tsup / vite), so it is resolved via a version bump or a pnpm override rather than a direct dependency change.

faker is used only in test files: `collection-manager.test.ts`, `response.test.ts`, `create-api-utils.test.ts`, `filters.test.ts`, `mocks.ts`, `create-api.test.ts`, and others under `src/**/tests/`.
