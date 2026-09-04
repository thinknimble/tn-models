import { describe, expect, it } from "vitest"
import { AxiosLike } from "../types"

/**
 * Type-level guard: the axios-compatibility fix widened `AxiosLike`'s config and
 * return types, but the `url` parameter must keep its `StringTrailingSlash`
 * brand. The brand guards against Django `APPEND_SLASH` redirects, which drop the
 * request body on POST/PUT/PATCH — a URL missing its trailing slash is a bug we
 * want `tsc` to catch at compile time, not the server to swallow at runtime.
 *
 * The `@ts-expect-error` lines below only compile if the non-trailing-slash call
 * is genuinely a type error. If the brand were ever dropped (e.g. `url: string`),
 * those calls would type-check, the `@ts-expect-error` would become unused, and
 * CI (`tsc`, the `lint` script) would fail here rather than in a consumer's app.
 */

declare const client: AxiosLike

async function trailingSlashRequired() {
  // Trailing-slash URLs type-check for every method on the contract.
  await client.get("/base/")
  await client.delete("/base/")
  await client.options("/base/")
  await client.post("/base/", {})
  await client.put("/base/", {})
  await client.patch("/base/", {})
  await client.postForm("/base/", {})
  await client.putForm("/base/", {})
  await client.patchForm("/base/", {})

  // A URL missing the trailing slash is a compile error for every method.
  // @ts-expect-error url must end in "/"
  await client.get("/base")
  // @ts-expect-error url must end in "/"
  await client.delete("/base")
  // @ts-expect-error url must end in "/"
  await client.options("/base")
  // @ts-expect-error url must end in "/"
  await client.post("/base", {})
  // @ts-expect-error url must end in "/"
  await client.put("/base", {})
  // @ts-expect-error url must end in "/"
  await client.patch("/base", {})
  // @ts-expect-error url must end in "/"
  await client.postForm("/base", {})
  // @ts-expect-error url must end in "/"
  await client.putForm("/base", {})
  // @ts-expect-error url must end in "/"
  await client.patchForm("/base", {})
}

describe("trailing-slash URL brand", () => {
  it("keeps the StringTrailingSlash brand on every client method url", () => {
    // The guarantees above are compile-time. This keeps vitest happy and pins
    // that the guard function exists and is callable.
    expect(typeof trailingSlashRequired).toBe("function")
  })
})
