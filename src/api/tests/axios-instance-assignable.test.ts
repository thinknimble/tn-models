import axios, { AxiosInstance } from "axios"
import { describe, expect, it } from "vitest"
import { z } from "zod"
import { createApi } from "../create-api"
import { createCustomServiceCall } from "../create-custom-call"
import { AxiosLike } from "../types"
import { entityZodShape } from "./mocks"

/**
 * Type-level guard: a real `axios.create()` instance must be assignable to the
 * `client` contract without a cast. These are compile-time assertions checked by
 * `tsc` (the `lint` script in CI). If a future axios signature change breaks
 * assignability, CI fails here rather than in a consumer's app.
 *
 * axios ~1.19 changed every request method to return
 * `Promise<AxiosResponseResult<T, R, D, P>>` (adding a 4th generic `P`), which
 * previously stopped a real `AxiosInstance` from matching `AxiosLike`.
 */

// A real AxiosInstance — no cast, no mock — straight from axios.create().
const realClient: AxiosInstance = axios.create()

// 1. AxiosInstance is assignable to the AxiosLike client contract.
const _asAxiosLike: AxiosLike = realClient

// 2. createApi accepts a real AxiosInstance as `client` with no cast.
const _api = createApi({
  baseUri: "/base/",
  client: realClient,
  models: { entity: entityZodShape },
})

// 3. createCustomServiceCall.standAlone accepts the same real AxiosInstance.
const _standAlone = createCustomServiceCall.standAlone({
  client: realClient,
  models: { outputShape: z.string() },
  cb: async ({ client }) => {
    const res = await client.get("/base/")
    return String(res.data)
  },
})

describe("AxiosInstance assignability", () => {
  it("assigns a real axios.create() instance to the client contract without a cast", () => {
    // The assertions above are compile-time; this keeps vitest happy and pins
    // that the real instance exposes the methods AxiosLike requires.
    expect(typeof realClient.get).toBe("function")
    expect(typeof realClient.post).toBe("function")
    expect(_asAxiosLike).toBe(realClient)
    expect(_api.client).toBeDefined()
    expect(typeof _standAlone).toBe("function")
  })
})
