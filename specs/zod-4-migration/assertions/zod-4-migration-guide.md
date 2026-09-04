---
id: zod-4-migration-guide
parent: zod-4-migration
created: 2026-08-31T17:00:00Z
priority: 2
status: done
depends-on: zod-4-tests-pass
branch: feature/zod-4-migration
---

# Migration guide documents consumer upgrade path

A migration guide exists that tells consumers exactly what to change when upgrading to the new tn-models-fp major version alongside Zod 4.

## Success Criteria

- Guide is in `MIGRATION.md` at the project root (not buried in README)
- States the Zod 4 peer dependency requirement upfront: "This version requires `zod >= 4.0.0`"
- Lists any tn-models-fp API changes (ideally none — if the public API is unchanged, state that explicitly)
- Documents Zod 4 changes that affect consumer schemas passed to tn-models-fp (e.g. if `z.nativeEnum()` was commonly used in entity shapes, note the replacement)
- Includes a "Quick upgrade" section: install commands, expected changes, and how to verify
- A consumer familiar with their own codebase can complete the migration in under 30 minutes by following the guide
