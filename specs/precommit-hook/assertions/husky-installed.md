---
id: husky-installed
parent: precommit-hook
created: 2026-09-04T17:00:00Z
priority: 2
status: in_progress
locked-by: builder-MacBook-Pro-88981-1788542012
---

# Husky is installed and self-initializes on install

Husky is a dev dependency and its Git hooks are activated automatically after a fresh install, with no manual setup step required from contributors.

## Success Criteria

- `husky` is present in `devDependencies` in `package.json`
- A `prepare` script in `package.json` initializes Husky (e.g. `husky` / `husky install`)
- After `pnpm install` on a fresh clone, the Git `core.hooksPath` points at the Husky hooks directory
- The `.husky/` directory is tracked in Git (not ignored)
