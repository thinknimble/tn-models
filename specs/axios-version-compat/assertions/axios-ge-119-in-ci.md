---
id: axios-ge-119-in-ci
parent: axios-version-compat
created: 2026-09-02T17:54:47Z
priority: 1
status: not_started
branch: axios-upgrade
---

# CI type-checks and tests against axios ≥ 1.19

The dev/test toolchain resolves axios ≥ 1.19 so a signature regression is caught in CI, not by a consumer.

## Success Criteria

- `devDependencies.axios` in `package.json` is unpinned from `~1.18.1` to a range that resolves to axios ≥ 1.19 (ideally the current latest)
- `peerDependencies.axios` (`>1.0.0`) is unchanged
- `pnpm lint` (typecheck) passes against the installed axios ≥ 1.19
- `pnpm test` passes against the installed axios ≥ 1.19
