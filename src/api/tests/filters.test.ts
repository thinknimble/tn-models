import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"
import { z } from "zod"
import { parseFilters } from "../../utils"

describe("parseFilters", () => {
  it("Snake cases keys", () => {
    const shape = {
      companyCategory: z.string(),
    }
    const filters = {
      companyCategory: faker.company.buzzAdjective(),
    }
    expect(parseFilters({ shape, filters })).toEqual({
      company_category: filters.companyCategory,
    })
  })
  it("includes boolean", () => {
    const shape = {
      niceOnly: z.boolean(),
    }
    const filters = {
      niceOnly: false,
    }
    expect(parseFilters({ shape, filters })).toEqual({
      nice_only: filters.niceOnly.toString(),
    })
  })
  it("Throws error if passing a wrong type filter", () => {
    const shape = {
      allNames: z.string().array(),
    }
    const filters = {
      allNames: [faker.number.int(), faker.number.int()],
    }
    expect(() => {
      parseFilters({ shape, filters })
    }).toThrow()
  })
})
