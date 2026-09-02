---
id: axios-instance-assignable
parent: axios-version-compat
created: 2026-09-02T17:54:47Z
priority: 1
status: not_started
branch: axios-upgrade
---

# A real AxiosInstance is assignable to the client parameter

The `client` parameter of `createApi` and `createCustomServiceCall` accepts a real `axios.create()` instance from modern axios without a cast.

## Success Criteria

- `createApi({ client, baseUri, models })` type-checks when `client` is `axios.create()` from axios ≥ 1.19
- The same type-checks against the current latest axios release
- `createCustomServiceCall(..., { client })` type-checks with the same instance
- No `as AxiosLike` / `as any` cast is required at the call site to make a real `AxiosInstance` assignable
- A type-level test asserts `AxiosInstance` is assignable to the `client` parameter, so a future axios signature change fails CI rather than a consumer
