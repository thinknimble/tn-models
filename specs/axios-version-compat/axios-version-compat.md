---
id: axios-version-compat
created: 2026-09-02T17:54:47Z
priority: 1
---

# The client contract accepts axios ≥ 1.19 and any HTTP client

A real `AxiosInstance` from axios ≥ 1.19 (through current latest) is assignable to the `client` parameter of `createApi` and `createCustomServiceCall`, while the contract stays client-agnostic — any HTTP client of the consumer's choice (e.g. a fetch-based wrapper) still satisfies it.

## Context

`AxiosLike` (`src/api/types.ts`) is a hand-rolled structural contract, deliberately not tied to axios so consumers can pass a client of their choice (README: `client: axios.create(), // a client of your choice`). Its methods return `Promise<R>` where `R = AxiosResponse<T>`.

axios 1.19 changed every request method to return `Promise<AxiosResponseResult<T, R, D, P>>` and added a 4th generic `P`. `AxiosResponseResult<...>` is not assignable to the bare generic `R`, so a real `AxiosInstance` stopped matching `AxiosLike` and `createApi({ client })` fails to type-check on axios ≥ 1.19. Consumers are pinned to `axios@~1.18.1` to avoid this.

The fix widens `AxiosLike`'s return type so axios ≥ 1.19's method result is assignable, without coupling the contract to axios's concrete method types (`Pick<AxiosInstance>` / `ReturnType<AxiosInstance[...]>` would regress the non-axios client path). The `StringTrailingSlash` URL brand is preserved — it guards against Django `APPEND_SLASH` redirects that silently drop request bodies on POST/PUT/PATCH.

## Affected Files

- `src/api/types.ts` — `AxiosCall`, `BodyAxiosCall`, `AxiosLike`
- `package.json` — `devDependencies.axios` pin
- `.github/workflows/main.yml` — CI typecheck/test run against installed axios

## Assertions

- `axios-instance-assignable` — a real `AxiosInstance` (≥ 1.19 and latest) is assignable to `client`
- `client-agnostic-contract` — a non-axios client still satisfies `client`
- `trailing-slash-url-brand` — the compile-time trailing-slash URL check survives the fix
- `axios-ge-119-in-ci` — CI type-checks and tests against axios ≥ 1.19
