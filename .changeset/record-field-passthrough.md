---
"@thinknimble/tn-models": minor
---

Preserve keys of `z.record(...)` fields through `fromApi`/`toApi`.

`createApi` camelCases/snake_cases keys by walking the payload blind, which rewrote the
keys inside record-valued fields (rule blobs, free-form JSON columns) — and the camel↔snake
round-trip is lossy for keys like `cpt_code_1`, silently corrupting them. The case-transform
walkers now follow the output/input shape and treat a `z.record(...)` field as a leaf,
passing its value through verbatim. Declaring a field `z.record(...)` is the opt-out; no new
API. Fully additive — callers with no record field, and the schema-less walk, are unchanged.
