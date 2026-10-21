import { beforeEach, describe, expect, it, vi } from "vitest"
import { z } from "zod"
import { PaginationAdapter } from "../../utils"
import { Pagination } from "../../utils/pagination"
import { createApi } from "../create-api"
import { entityZodShape, mockEntity1, mockEntity2, mockedAxios } from "./mocks"

// A non-Django backend: `{ limit, offset }` request params and an
// `{ items, total }` response envelope instead of DRF's `{ page, pageSize }`
// / `{ count, next, previous, results }`.
const customAdapter: PaginationAdapter<typeof entityZodShape> = {
  toRequestParams: (pagination) => ({
    limit: pagination.size,
    offset: (pagination.page - 1) * pagination.size,
  }),
  responseShape: () => ({
    items: z.array(z.record(z.string(), z.unknown())),
    total: z.number(),
  }),
  getResults: (envelope) => (envelope as { items: any[] }).items,
}

const snakedRecord = (e: typeof mockEntity1) => ({
  id: e.id,
  age: e.age,
  first_name: e.firstName,
  last_name: e.lastName,
  full_name: e.fullName,
})

const customEnvelope = {
  total: 2,
  items: [snakedRecord(mockEntity1), snakedRecord(mockEntity2)],
}

describe("list honors a custom pagination adapter", () => {
  const testBaseUri = "adapter-list"
  const testApi = createApi({
    baseUri: testBaseUri,
    client: mockedAxios,
    models: {
      entity: entityZodShape,
      extraFilters: { anExtraFilter: z.string() },
    },
    options: { pagination: customAdapter },
  })

  beforeEach(() => {
    mockedAxios.get.mockReset()
  })

  it("builds request params from the adapter and merges extra filters (not page/pageSize)", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: customEnvelope })
    const getSpy = vi.spyOn(mockedAxios, "get")

    await testApi.list({
      pagination: new Pagination({ page: 3, size: 10 }),
      filters: { anExtraFilter: "keep" },
    })

    expect(getSpy).toHaveBeenCalledWith(testBaseUri + "/", {
      params: { an_extra_filter: "keep", limit: 10, offset: 20 },
    })
    const params = getSpy.mock.calls[0]![1]!.params
    expect(params).not.toHaveProperty("page")
    expect(params).not.toHaveProperty("page_size")
  })

  it("parses the adapter envelope, camelCases records from getResults, and exposes them under results", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: customEnvelope })

    const response = await testApi.list({ pagination: new Pagination({ page: 1, size: 10 }) })

    // The full parsed envelope is preserved (total/items) with normalized entities under results.
    expect((response as Record<string, unknown>).total).toBe(2)
    expect(response.results).toEqual([mockEntity1, mockEntity2])
  })
})
