import { describe, expect, it, vi } from "vitest"
import { z } from "zod"
import { createApi } from "../../api/create-api"
import { objectToCamelCaseArr, objectToSnakeCaseArr } from "../api"

/**
 * A `z.record(...)` field carries keys that are *data*, not API field names, so they
 * must survive the from/to-api round-trip verbatim. `cpt_code_1` is the canonical
 * trap: camelCase → `cptCode1` → snake → `cpt_code1`, losing the underscore.
 */
describe("record-valued fields are passed through verbatim", () => {
  const blob = {
    cpt_code_1: 1,
    units_per_code: { max_per_day: 2 },
    other_lines_excludes_cpt_code_2: true,
  }

  describe("objectToCamelCaseArr (fromApi direction)", () => {
    it("keeps record keys when the field is typed z.record", () => {
      const schema = z.object({ source_field: z.string(), rules: z.record(z.string(), z.unknown()) })
      const result = objectToCamelCaseArr({ source_field: "x", rules: blob }, schema)
      expect(result).toEqual({ sourceField: "x", rules: blob })
    })

    it("still camelCases everything when no schema is given (blind, unchanged behavior)", () => {
      const result = objectToCamelCaseArr({ source_field: "x", rules: blob })
      expect(result).toEqual({
        sourceField: "x",
        rules: { cptCode1: 1, unitsPerCode: { maxPerDay: 2 }, otherLinesExcludesCptCode2: true },
      })
    })

    it("sees through nullable/optional wrappers to the record", () => {
      const schema = z.object({ rules: z.record(z.string(), z.unknown()).nullable() })
      expect(objectToCamelCaseArr({ rules: blob }, schema)).toEqual({ rules: blob })
    })

    it("protects records nested in arrays of objects", () => {
      const schema = z.object({
        items: z.array(z.object({ item_id: z.string(), params: z.record(z.string(), z.unknown()) })),
      })
      const result = objectToCamelCaseArr({ items: [{ item_id: "a", params: blob }] }, schema)
      expect(result).toEqual({ items: [{ itemId: "a", params: blob }] })
    })

    it("still transforms declared sibling fields around the record", () => {
      const schema = z.object({ last_edited: z.string(), params: z.record(z.string(), z.unknown()) })
      const result = objectToCamelCaseArr({ last_edited: "t", params: blob }, schema)
      expect(result).toEqual({ lastEdited: "t", params: blob })
    })
  })

  describe("objectToSnakeCaseArr (toApi direction)", () => {
    it("keeps record keys when the field is typed z.record", () => {
      const schema = z.object({ sourceField: z.string(), rules: z.record(z.string(), z.unknown()) })
      const result = objectToSnakeCaseArr({ sourceField: "x", rules: blob }, schema)
      expect(result).toEqual({ source_field: "x", rules: blob })
    })

    it("still snake_cases everything when no schema is given (blind, unchanged behavior)", () => {
      const result = objectToSnakeCaseArr({ sourceField: "x", someField: { nestedKey: 1 } })
      expect(result).toEqual({ source_field: "x", some_field: { nested_key: 1 } })
    })
  })
})

describe("createApi round-trips record fields without corrupting their keys", () => {
  const ruleShape = {
    id: z.string().uuid(),
    payer: z.string().uuid(),
    rules: z.record(z.string(), z.unknown()),
  }
  const id = "11111111-1111-4111-8111-111111111111"
  const payer = "22222222-2222-4222-8222-222222222222"
  const serverRules = { cpt_code_1: 1, units_per_code: 2, other_lines_excludes_cpt_code_2: true }

  const makeClient = (data: unknown) => ({
    get: vi.fn().mockResolvedValue({ data }),
    post: vi.fn().mockResolvedValue({ data }),
    patch: vi.fn().mockResolvedValue({ data }),
    delete: vi.fn().mockResolvedValue({ data: undefined }),
  })

  it("retrieve preserves blob keys verbatim", async () => {
    const client = makeClient({ id, payer, rules: serverRules })
    const api = createApi({ client: client as never, baseUri: "/payer-rules/", models: { entity: ruleShape } })
    const result = await api.retrieve(id)
    expect(result.rules).toEqual(serverRules)
  })

  it("list preserves blob keys verbatim", async () => {
    const client = makeClient({ count: 1, next: null, previous: null, results: [{ id, payer, rules: serverRules }] })
    const api = createApi({ client: client as never, baseUri: "/payer-rules/", models: { entity: ruleShape } })
    const result = await api.list()
    expect(result.results[0]!.rules).toEqual(serverRules)
  })

  it("create sends blob keys verbatim and reads them back verbatim", async () => {
    const client = makeClient({ id, payer, rules: serverRules })
    const api = createApi({
      client: client as never,
      baseUri: "/payer-rules/",
      models: { entity: ruleShape, create: { payer: ruleShape.payer, rules: ruleShape.rules } },
    })
    const result = await api.create({ payer, rules: serverRules })
    // request body: the record reached the wire with its keys intact
    expect(client.post.mock.calls[0]![1]).toMatchObject({ rules: serverRules })
    // response: and came back intact
    expect(result.rules).toEqual(serverRules)
  })
})
