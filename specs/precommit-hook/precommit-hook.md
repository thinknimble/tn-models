---
id: precommit-hook
created: 2026-09-04T17:00:00Z
priority: 2
---

# Commits are gated by a formatting and type-check hook

A Husky-managed Git pre-commit hook runs Prettier formatting checks and the TypeScript type check before every commit, so style and type errors are caught locally rather than in CI. The hook is fast enough (~2-4s) that contributors are not tempted to bypass it.

## Context

The project uses pnpm and already exposes the relevant scripts: `format:check` (`prettier --check ./src`) and `lint` (`tsc`). Tests (`vitest`) and the build are intentionally left out of the pre-commit gate — they belong in CI or a pre-push hook — to keep commit latency low.

Husky is installed as a dev dependency and wires itself up through a `prepare` script, so hooks are active automatically after `pnpm install` for every contributor without a manual setup step.
