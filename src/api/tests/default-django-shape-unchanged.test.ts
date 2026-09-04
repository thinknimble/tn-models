import { describe, expect, it } from "vitest"
import { z } from "zod"
import { getDefaultPaginationAdapter } from "../../utils"
import { Pagination } from "../../utils/pagination"
import { entityZodShape, listResponse } from "./mocks"

// The default `list` path is implemented as an adapter equivalent to the Django
// REST Framework shape, so there is a single code path rather than a branch.
describe("default pagination adapter (Django shape)", () => {
  const adapter = getDefaultPaginationAdapter<typeof entityZodShape>()

  it("maps pagination to snake-cased, stringified { page, page_size } request params", () => {
    const params = adapter.toRequestParams(new Pagination({ page: 5, size: 8 }))
    expect(params).toEqual({ page: "5", page_size: "8" })
  })

  it("parses the { count, next, previous, results } envelope and getResults returns results", () => {
    const envelopeZod = z.object(adapter.responseShape(z.object(entityZodShape))).passthrough()
    const parsed = envelopeZod.parse(listResponse)
    expect(adapter.getResults(parsed)).toEqual(listResponse.results)
  })
})
