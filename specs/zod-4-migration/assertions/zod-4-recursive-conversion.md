---
id: zod-4-recursive-conversion
parent: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 1
status: done
depends-on: zod-4-type-discrimination
branch: feature/zod-4-migration
---

# Recursive snake_case conversion produces valid Zod 4 schemas

`zodObjectToSnakeRecursive` and `resolveRecursiveZod` return valid Zod 4 schema instances that parse data correctly.

## Success Criteria

- `zodObjectToSnakeRecursive(z.object({ firstName: z.string() }))` returns a Zod 4 object schema with key `first_name`
- The returned schema successfully `.parse()`s matching data
- Nested objects are recursively snake_cased: `{ userProfile: { firstName: z.string() } }` → `{ user_profile: { first_name: z.string() } }`
- Arrays of objects are handled: `z.array(z.object({ firstName: z.string() }))` → array schema with `first_name` key
- Optional, nullable, intersection, union, readonly, branded, and default wrappers are preserved through recursion
- Passthrough detection works — schemas created with Zod 4's equivalent of `.passthrough()` (likely `z.looseObject()`) produce passthrough output schemas
- `.unwrap()` calls on optional, nullable, readonly, and branded schemas use the Zod 4 API (verify `.unwrap()` still exists or find the Zod 4 equivalent)
- `.default()` recursion extracts and re-applies the default value using Zod 4's API (note: Zod 4 changes `.default()` behavior — defaults are now applied even within optional fields)
