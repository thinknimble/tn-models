import { describe, expect, it } from "vitest"
import { z } from "zod"
// Import the adapter type from the package root to prove it is exported for consumers.
import { GetInferredFromRaw, PaginationAdapter } from "../../index"
import { createApi } from "../create-api"
import { entityZodShape, listResponse, mockEntity1, mockedAxios } from "./mocks"

type Entity = GetInferredFromRaw<typeof entityZodShape>

// Type-level equality: true only when A and B are mutually assignable.
type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

describe("createApi optional pagination adapter", () => {
  it("accepts a typed adapter and ties getResults to the entity array", () => {
    // The three members carry the signatures the spec requires.
    const adapter: PaginationAdapter<typeof entityZodShape> = {
      toRequestParams: (pagination) => ({ limit: pagination.size, offset: pagination.currentPageStart }),
      responseShape: (entityZod) => ({ items: z.array(entityZod), total: z.number() }),
      getResults: (envelope) => (envelope as { items: Entity[] }).items,
    }

    // getResults must be typed as the entity array, not unknown[].
    type Results = ReturnType<typeof adapter.getResults>
    const tiedToEntity: Equals<Results, Entity[]> = true
    const notUnknownArray: Equals<Results, unknown[]> = false
    expect([tiedToEntity, notUnknownArray]).toEqual([true, false])

    const api = createApi({
      client: mockedAxios,
      baseUri: "users",
      models: { entity: entityZodShape },
      options: { pagination: adapter },
    })
    expect(api).toHaveProperty("list")
  })

  it("is optional — omitting pagination compiles and behaves as today", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: listResponse })
    const api = createApi({
      client: mockedAxios,
      baseUri: "users",
      models: { entity: entityZodShape },
    })
    const res = await api.list()
    expect(res.results).toHaveLength(listResponse.results.length)
    expect(res.results[0]?.id).toEqual(mockEntity1.id)
  })
})
