---
id: client-agnostic-contract
parent: axios-version-compat
created: 2026-09-02T17:54:47Z
priority: 1
status: in_progress
branch: feature/axios-upgrade
locked-by: builder-MacBook-Pro.local-58183-1788373270
---

# The client contract stays HTTP-client-agnostic

`AxiosLike` remains a structural contract that any HTTP client can satisfy, not one narrowed to axios's concrete method types.

## Success Criteria

- A non-axios client (a fetch-style wrapper whose methods take `(url, config?)` / `(url, data?, config?)` and return `Promise` of a plain object) is assignable to the `client` parameter
- The contract is not defined via `Pick<AxiosInstance, ...>` or `ReturnType<AxiosInstance[...]>` — a well-typed non-axios client does not need to match axios's `AxiosResponseResult` return shape
- A type-level test asserts a minimal non-axios client satisfies the `client` parameter
