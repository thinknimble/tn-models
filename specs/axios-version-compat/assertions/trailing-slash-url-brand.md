---
id: trailing-slash-url-brand
parent: axios-version-compat
created: 2026-09-02T17:54:47Z
priority: 1
status: in_progress
branch: feature/axios-upgrade
locked-by: builder-MacBook-Pro.local-76998-1788373586
---

# Client method URLs keep the compile-time trailing-slash brand

The `url` argument of the client contract's methods keeps the `StringTrailingSlash` brand after the axios-compatibility fix, guarding against Django `APPEND_SLASH` redirects that silently drop request bodies on POST/PUT/PATCH.

## Success Criteria

- A client method called with a string literal that does not end in `/` is a compile error
- A client method called with a trailing-slash URL type-checks
- The brand applies to all client methods on the contract (`get`, `post`, `put`, `patch`, `delete`, `options`, `postForm`, `putForm`, `patchForm`)
