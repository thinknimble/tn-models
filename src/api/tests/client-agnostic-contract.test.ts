import { describe, expect, it } from "vitest"
import { z } from "zod"
import { createApi } from "../create-api"
import { createCustomServiceCall } from "../create-custom-call"
import { AxiosLike } from "../types"
import { entityZodShape } from "./mocks"

/**
 * Type-level guard: the `client` contract stays HTTP-client-agnostic. A minimal
 * fetch-style wrapper — no axios types anywhere — must satisfy `AxiosLike`. If
 * the contract were ever narrowed to `Pick<AxiosInstance, ...>` or an axios
 * `AxiosResponseResult` return shape, this file stops compiling and CI (`tsc`)
 * fails here rather than in a consumer's app.
 *
 * These methods intentionally return `Promise<{ data: unknown }>` — a plain
 * object with no axios response fields (no `status`, `headers`, `config`) — to
 * prove the contract does not require the axios response shape.
 */

type FetchConfig = { headers?: Record<string, string>; params?: Record<string, unknown> }
type FetchResponse = { data: unknown }

// A minimal non-axios client. `url: string` (not axios's branded url), a
// fetch-style config, and a bare `{ data }` return — nothing imported from axios.
type FetchLikeClient = {
  get: (url: string, config?: FetchConfig) => Promise<FetchResponse>
  post: (url: string, data?: unknown, config?: FetchConfig) => Promise<FetchResponse>
  delete: (url: string, config?: FetchConfig) => Promise<FetchResponse>
  put: (url: string, data?: unknown, config?: FetchConfig) => Promise<FetchResponse>
  patch: (url: string, data?: unknown, config?: FetchConfig) => Promise<FetchResponse>
  options: (url: string, config?: FetchConfig) => Promise<FetchResponse>
  postForm: (url: string, data?: unknown, config?: FetchConfig) => Promise<FetchResponse>
  putForm: (url: string, data?: unknown, config?: FetchConfig) => Promise<FetchResponse>
  patchForm: (url: string, data?: unknown, config?: FetchConfig) => Promise<FetchResponse>
}

const makeCall =
  () =>
  async (): Promise<FetchResponse> => ({ data: {} })

const fetchClient: FetchLikeClient = {
  get: makeCall(),
  post: makeCall(),
  delete: makeCall(),
  put: makeCall(),
  patch: makeCall(),
  options: makeCall(),
  postForm: makeCall(),
  putForm: makeCall(),
  patchForm: makeCall(),
}

// 1. The non-axios client is assignable to the client contract, no cast.
const _asAxiosLike: AxiosLike = fetchClient

// 2. createApi accepts the non-axios client as `client` with no cast.
const _api = createApi({
  baseUri: "/base/",
  client: fetchClient,
  models: { entity: entityZodShape },
})

// 3. createCustomServiceCall.standAlone accepts the same non-axios client.
const _standAlone = createCustomServiceCall.standAlone({
  client: fetchClient,
  models: { outputShape: z.string() },
  cb: async ({ client }) => {
    const res = await client.get("/base/")
    return String(res.data)
  },
})

describe("client-agnostic contract", () => {
  it("assigns a minimal non-axios (fetch-style) client to the client contract without a cast", () => {
    // The assertions above are compile-time; this keeps vitest happy and pins
    // that the non-axios client exposes the methods AxiosLike requires.
    expect(typeof fetchClient.get).toBe("function")
    expect(typeof fetchClient.postForm).toBe("function")
    expect(_asAxiosLike).toBe(fetchClient)
    expect(_api.client).toBeDefined()
    expect(typeof _standAlone).toBe("function")
  })
})
