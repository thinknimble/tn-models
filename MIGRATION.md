# Migrating to @thinknimble/tn-models v5 (Zod 4)

This version requires `zod >= 4.0.0`.

## tn-models API changes

**None.** The public API (`createApi`, `createCustomServiceCall`, `createPaginatedServiceCall`, `createWSAdapter`, `createWSApi`, etc.) is unchanged. All changes are internal to support Zod 4's new runtime representation.

## Zod 4 changes that affect your schemas

If you pass Zod schemas to tn-models (entity shapes, custom service call inputs/outputs), be aware of these Zod 4 changes:

### `z.nativeEnum()` still works

`z.nativeEnum()` is still available in Zod 4. No changes needed for enum schemas.

### `z.enum()` replaces string enum patterns

If you were using `z.enum(["a", "b"])`, it still works the same way.

### `ZodTypeAny` renamed to `ZodType`

If you import Zod types directly for type annotations in your consumer code:

```diff
- import type { ZodTypeAny } from "zod"
+ import type { ZodType } from "zod"
```

### `.brand()` is now type-only

In Zod 4, `.brand()` no longer creates a distinct runtime schema type. Branded schemas are transparent at runtime — they behave identically to their underlying type. If your code relied on runtime brand detection, it will still work but the brand wrapper is gone.

### Error format changes

`ZodError` now uses `z.core.ZodError`. If you inspect validation errors from tn-models responses, the error shape is slightly different. See the [Zod 4 changelog](https://zod.dev/v4/changelog) for details.

## Quick upgrade

### 1. Install

```bash
# npm
npm install @thinknimble/tn-models@latest zod@latest

# pnpm
pnpm add @thinknimble/tn-models@latest zod@latest

# yarn
yarn add @thinknimble/tn-models@latest zod@latest
```

### 2. Expected changes

- **Your entity shapes**: No changes needed. `z.object()`, `z.string()`, `z.number()`, `z.array()`, `z.optional()`, `z.nullable()`, etc. all work the same.
- **Your service calls**: No changes to `createApi`, `createCustomServiceCall`, or `createPaginatedServiceCall` usage.
- **Type imports from Zod**: Replace `ZodTypeAny` with `ZodType` if you use it in your own type annotations.

### 3. Verify

```bash
# Run your project's type checker
npx tsc --noEmit

# Run your tests
npm test
```

If types check and tests pass, you're done.
