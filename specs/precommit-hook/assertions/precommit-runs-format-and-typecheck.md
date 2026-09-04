---
id: precommit-runs-format-and-typecheck
parent: precommit-hook
created: 2026-09-04T17:00:00Z
priority: 2
status: not_started
depends-on: husky-installed
---

# Pre-commit hook blocks commits that fail formatting or type checks

The `.husky/pre-commit` hook runs the Prettier check and the TypeScript type check, and a commit is rejected if either fails.

## Success Criteria

- `.husky/pre-commit` runs `pnpm format:check` (Prettier) and `pnpm lint` (`tsc`)
- Committing with a Prettier violation in `src/` exits non-zero and aborts the commit
- Committing with a TypeScript type error exits non-zero and aborts the commit
- A commit with clean, well-typed code passes the hook and completes
- The hook does not run the test suite or the build (kept out to preserve commit speed)
- `git commit --no-verify` still bypasses the hook (standard Git escape hatch, not overridden)
