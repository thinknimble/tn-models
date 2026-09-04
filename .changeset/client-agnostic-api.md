---
"@thinknimble/tn-models": minor
---

`createApi` now accepts any axios-like HTTP client via a structural `AxiosLike` contract, not only a concrete `AxiosInstance`. Existing axios consumers are unaffected (an `AxiosInstance` still satisfies `AxiosLike`); fetch-style wrappers and other clients with their own config/response types are now assignable as well. The `StringTrailingSlash` URL brand is retained to guard against Django `APPEND_SLASH` redirects.
