---
id: zod-4-peer-dependency
parent: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 1
status: not_started
branch: feature/zod-4-migration
---

# Package requires Zod 4 as peer dependency

## Success Criteria

- `peerDependencies.zod` in `package.json` is `"^4.0.0"` (not `"^3.23.8"`)
- `devDependencies.zod` installs a Zod 4 release
- `npm install` (or equivalent) resolves without peer dependency conflicts
- No import paths use `"zod/v3"` compatibility subpath — this is a clean migration, not a shim
