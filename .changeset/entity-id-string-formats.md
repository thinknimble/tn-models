---
"@thinknimble/tn-models": patch
---

The entity `id` in `createApi` models now accepts Zod 4 string-format schemas, such as `z.guid()`, `z.uuid()`, `z.cuid()`, `z.ulid()`, and their `.readonly()` forms, which caused TS2322 before this fix. Runtime behavior does not change.
