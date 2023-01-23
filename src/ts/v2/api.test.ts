import { SnakeCasedPropertiesDeep } from "@thinknimble/tn-utils"
import axios from "axios"
import { v4 as uuid } from "uuid"
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest"
import { z } from "zod"
import Pagination from "../pagination"
import { createApi, createCustomServiceCall, getPaginatedSnakeCasedZod, GetZodInferredTypeFromRaw } from "./api"

vi.mock("axios")

const mockedAxios = axios as Mocked<typeof axios>

const createZodShape = {
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
}
const entityZodShape = {
  ...createZodShape,
  id: z.string().uuid(),
}

describe("v2 api tests", async () => {
  const testEndpoint = "users"
  const testApi = createApi(
    {
      client: mockedAxios,
      endpoint: testEndpoint,
      models: {
        create: createZodShape,
        entity: entityZodShape,
        update: createZodShape,
        extraFilters: {
          anExtraFilter: z.string(),
        },
      },
    },
    {
      customCall: createCustomServiceCall({
        inputShape: { myInput: z.string() },
        outputShape: {
          givenInput: z.string(),
          inputLength: z.number(),
        },
        callback: async ({ client, input, utils }) => {
          return {
            givenInput: input.myInput,
            inputLength: input.myInput.length,
          }
        },
      }),
      testPost: createCustomServiceCall({
        inputShape: {
          anotherInput: z.string(),
        },
        outputShape: {
          justAny: z.any(),
        },
        callback: async ({ client, input, utils }) => {
          const toApiInput = utils.toApi(input)
          const res = await client.post(testEndpoint, toApiInput)
          const parsed = utils.fromApi(res.data)
          return parsed
        },
      }),
    }
  )

  describe("create", () => {
    beforeEach(() => {
      mockedAxios.post.mockReset()
    })

    const createInput: GetZodInferredTypeFromRaw<typeof createZodShape> = {
      age: 19,
      lastName: "Doe",
      firstName: "Jane",
    }
    const randomId: string = uuid()
    const createResponse: SnakeCasedPropertiesDeep<GetZodInferredTypeFromRaw<typeof entityZodShape>> = {
      age: createInput.age,
      last_name: createInput.lastName,
      first_name: createInput.firstName,
      id: randomId,
    }

    it("calls api with snake_case", async () => {
      //arrange
      const postSpy = vi.spyOn(mockedAxios, "post")
      mockedAxios.post.mockResolvedValueOnce({ data: createResponse })
      //assess
      await testApi.create(createInput)
      //assert
      expect(postSpy).toHaveBeenCalledWith(testEndpoint, {
        age: createInput.age,
        last_name: createInput.lastName,
        first_name: createInput.firstName,
      })
    })
    it("returns camelCased response", async () => {
      //arrange
      mockedAxios.post.mockResolvedValueOnce({ data: createResponse })
      //assess
      const response = await testApi.create(createInput)
      //assert
      expect(response).toEqual({ ...createInput, id: randomId })
    })
  })

  describe("retrieve", () => {
    beforeEach(() => {
      mockedAxios.post.mockReset()
    })

    it("returns camelCased entity", async () => {
      //arrange
      const randomUuid = uuid()
      const entityResponse: SnakeCasedPropertiesDeep<GetZodInferredTypeFromRaw<typeof entityZodShape>> = {
        age: 18,
        first_name: "John",
        last_name: "Doe",
        id: randomUuid,
      }
      mockedAxios.get.mockResolvedValue({ data: entityResponse })
      const getSpy = vi.spyOn(mockedAxios, "get")
      //assess
      const response = await testApi.retrieve(randomUuid)
      //assert
      expect(getSpy).toHaveBeenCalledWith(`${testEndpoint}/${randomUuid}`)
      expect(response).toEqual({
        age: entityResponse.age,
        firstName: entityResponse.first_name,
        lastName: entityResponse.last_name,
        id: randomUuid,
      })
    })
  })

  describe("list", () => {
    beforeEach(() => {
      mockedAxios.get.mockReset()
    })
    const josephId = uuid()
    const jotaroId = uuid()
    const listResponse: z.infer<ReturnType<typeof getPaginatedSnakeCasedZod<typeof entityZodShape>>> = {
      count: 10,
      next: null,
      previous: null,
      results: [
        { age: 68, first_name: "Joseph", last_name: "Joestar", id: josephId },
        {
          age: 17,
          first_name: "Jotaro",
          last_name: "Kujo",
          id: jotaroId,
        },
      ],
    }
    const [joseph, jotaro] = listResponse.results
    it("returns camelCased paginated result", async () => {
      //arrange
      mockedAxios.get.mockResolvedValueOnce({ data: listResponse })
      //assess
      const response = await testApi.list()
      //assert
      expect(response).toBeTruthy()
      expect(response.results).toHaveLength(2)
      expect(response).toEqual({
        ...listResponse,
        results: [
          {
            age: joseph.age,
            firstName: joseph.first_name,
            lastName: joseph.last_name,
            id: joseph.id,
          },
          {
            age: jotaro.age,
            firstName: jotaro.first_name,
            lastName: jotaro.last_name,
            id: jotaro.id,
          },
        ],
      })
    })
    it("uses snake case for sending filters to api", async () => {
      //arrange
      const filters = {
        anExtraFilter: "extra-filter",
      }
      const pagination = new Pagination({ page: 5, size: 8 })
      mockedAxios.get.mockResolvedValueOnce({ data: listResponse })
      const getSpy = vi.spyOn(mockedAxios, "get")
      //assess
      await testApi.list({
        filters,
        pagination,
      })
      //assert
      expect(getSpy).toHaveBeenCalledWith(testEndpoint, {
        params: {
          an_extra_filter: filters.anExtraFilter,
          page: pagination.page.toString(),
          page_size: pagination.size.toString(),
        },
      })
    })
  })

  describe("custom api calls", () => {
    it("calls api with snake case", async () => {
      //arrange
      const postSpy = vi.spyOn(mockedAxios, "post")
      mockedAxios.post.mockResolvedValueOnce({
        data: { justAny: "any" },
      })
      const input = { anotherInput: "testing" }
      //assess
      await testApi.customServiceCalls.testPost(input)
      //assert
      expect(postSpy).toHaveBeenCalledWith(testEndpoint, {
        another_input: input.anotherInput,
      })
    })
    it("returns camel cased response", async () => {
      //arrange
      const myInput = "Hello there"
      const expected: Awaited<ReturnType<typeof testApi.customServiceCalls.customCall>> = {
        givenInput: myInput,
        inputLength: myInput.length,
      }
      //assess
      const res = await testApi.customServiceCalls.customCall({
        myInput,
      })
      //assert
      expect(res).toEqual(expected)
    })
  })
})
