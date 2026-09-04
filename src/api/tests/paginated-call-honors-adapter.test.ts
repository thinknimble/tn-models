import { beforeEach, describe, expect, it, vi } from "vitest"
import { z } from "zod"
import { PaginationAdapter } from "../../utils"
import { Pagination } from "../../utils/pagination"
import { createApi } from "../create-api"
import { createPaginatedServiceCall } from "../create-paginated-call"
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

describe("createPaginatedServiceCall honors a pagination adapter", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
  })

  it("builds request params from the adapter (not page/pageSize) and camelCases getResults records", async () => {
    const getSpy = vi.spyOn(mockedAxios, "get")
    mockedAxios.get.mockResolvedValueOnce({ data: customEnvelope })

    const paginatedServiceCall = createPaginatedServiceCall({
      outputShape: entityZodShape,
      filtersShape: { anExtraFilter: z.string() },
      opts: { pagination: customAdapter },
    })
    const baseUri = "adapter-paginated-call"
    const api = createApi({ baseUri, client: mockedAxios, customCalls: { paginatedServiceCall } })

    const response = await api.csc.paginatedServiceCall({
      input: { pagination: new Pagination({ page: 3, size: 10 }) },
      filters: { anExtraFilter: "keep" },
    })

    expect(getSpy).toHaveBeenCalledWith(`${baseUri}/`, {
      params: { an_extra_filter: "keep", limit: 10, offset: 20 },
    })
    const params = getSpy.mock.calls[0]![1]!.params
    expect(params).not.toHaveProperty("page")
    expect(params).not.toHaveProperty("page_size")

    // Full parsed envelope preserved (total/items) with normalized entities under results.
    expect((response as Record<string, unknown>).total).toBe(2)
    expect(response.results).toEqual([mockEntity1, mockEntity2])
  })

  it("falls back to the Django contract when no adapter is supplied", async () => {
    const getSpy = vi.spyOn(mockedAxios, "get")
    mockedAxios.get.mockResolvedValueOnce({
      data: { count: 2, next: null, previous: null, results: [snakedRecord(mockEntity1), snakedRecord(mockEntity2)] },
    })

    const paginatedServiceCall = createPaginatedServiceCall({ outputShape: entityZodShape })
    const baseUri = "default-paginated-call"
    const api = createApi({ baseUri, client: mockedAxios, customCalls: { paginatedServiceCall } })

    const pagination = new Pagination({ page: 1, size: 25 })
    const response = await api.csc.paginatedServiceCall({ pagination })

    expect(getSpy).toHaveBeenCalledWith(`${baseUri}/`, {
      params: { page: pagination.page.toString(), page_size: pagination.size.toString() },
    })
    expect(response.results).toEqual([mockEntity1, mockEntity2])
  })
})
