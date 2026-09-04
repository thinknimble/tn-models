import { beforeEach, describe, expect, it, vi } from "vitest"
import { z } from "zod"
import { GetInferredFromRaw, PaginationAdapter } from "../../index"
import { Pagination } from "../../utils/pagination"
import { createApi } from "../create-api"
import { entityZodShape, listResponse, mockEntity1, mockEntity2, mockedAxios } from "./mocks"

// Anchor coverage for the pagination-override spec. The non-Django `list` and
// `createPaginatedServiceCall` paths are exercised in list-honors-adapter.test.ts
// and paginated-call-honors-adapter.test.ts respectively; this file locks in the
// two criteria not owned elsewhere: the default `list` path stays byte-for-byte
// Django, and `list`'s `results` stay typed as the entity array under an adapter.

type Entity = GetInferredFromRaw<typeof entityZodShape>

// Type-level equality: true only when A and B are mutually assignable.
type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

const customAdapter: PaginationAdapter<typeof entityZodShape> = {
  toRequestParams: (pagination) => ({ limit: pagination.size, offset: (pagination.page - 1) * pagination.size }),
  responseShape: () => ({ items: z.array(z.record(z.string(), z.unknown())), total: z.number() }),
  getResults: (envelope) => (envelope as { items: Entity[] }).items,
}

describe("pagination override coverage", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
  })

  it("with no adapter, list sends { page, pageSize } and parses { count, next, previous, results }", async () => {
    const getSpy = vi.spyOn(mockedAxios, "get")
    mockedAxios.get.mockResolvedValueOnce({ data: listResponse })

    const api = createApi({
      baseUri: "default-list",
      client: mockedAxios,
      models: { entity: entityZodShape },
    })
    const pagination = new Pagination({ page: 2, size: 25 })
    const response = await api.list({ pagination })

    // Request side: the DRF { page, page_size } contract (snake-cased, stringified).
    expect(getSpy).toHaveBeenCalledWith("default-list/", {
      params: { page: "2", page_size: "25" },
    })
    // Response side: the { count, next, previous, results } envelope, camelCased records.
    expect(response.count).toBe(listResponse.count)
    expect(response.next).toBeNull()
    expect(response.previous).toBeNull()
    expect(response.results).toEqual([mockEntity1, mockEntity2])
  })

  it("types list's results as the entity array when an adapter is supplied", () => {
    const adapterApi = createApi({
      baseUri: "adapter-list",
      client: mockedAxios,
      models: { entity: entityZodShape },
      options: { pagination: customAdapter },
    })
    const defaultApi = createApi({
      baseUri: "default-list",
      client: mockedAxios,
      models: { entity: entityZodShape },
    })

    type AdapterResults = Awaited<ReturnType<typeof adapterApi.list>>["results"]
    type DefaultResults = Awaited<ReturnType<typeof defaultApi.list>>["results"]

    // Supplying an adapter must not loosen the results type: it stays the entity
    // array, identical to the default path, and is never widened to unknown[].
    const stillEntityArray: Equals<AdapterResults, DefaultResults> = true
    const notUnknownArray: Equals<AdapterResults, unknown[]> = false
    expect([stillEntityArray, notUnknownArray]).toEqual([true, false])

    // A camelCased entity is assignable to an element; a foreign shape is not.
    const element: AdapterResults[number] = mockEntity1
    expect(element.firstName).toBe(mockEntity1.firstName)
    // @ts-expect-error results are entities, not arbitrary records
    const wrong: AdapterResults[number] = { unrelated: true }
    expect(wrong).toBeTruthy()
  })
})
