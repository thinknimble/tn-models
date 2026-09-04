import { z } from "zod"
import { paginationFiltersZodShape, parseFilters } from "./filters"
import { GetInferredFromRaw, zodObjectToSnakeRecursive } from "./zod"

//TODO: this needs cleanup. I am not happy with the usage of these across the library. Seems like we could have at least one of these less

export const getPaginatedShape = <T extends z.ZodRawShape>(
  zodRawShape: T,
  options: {
    allowPassthrough?: boolean
  } = { allowPassthrough: false },
) => {
  const zObject = options.allowPassthrough ? z.object(zodRawShape).passthrough() : z.object(zodRawShape)
  return {
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(zodObjectToSnakeRecursive(zObject)),
  }
}

export const getPaginatedSnakeCasedZod = <T extends z.ZodRawShape>(zodRawShape: T) =>
  z.object(getPaginatedShape(zodRawShape, { allowPassthrough: true })).passthrough()

export const getPaginatedZod = <T extends z.ZodRawShape>(zodRawShape: T) =>
  z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object(zodRawShape)),
  })

/**
 * Describes how a non-Django backend paginates so `createApi`'s `list` (and
 * `createPaginatedServiceCall`) can override the hardcoded DRF contract on both
 * sides of the wire. When no adapter is supplied the default `{ page, pageSize }`
 * request params and `{ count, next, previous, results }` response envelope apply.
 *
 * The adapter is generic over the entity raw shape so `getResults` stays typed as
 * the entity array rather than `unknown[]`.
 */
export type PaginationAdapter<TEntity extends z.ZodRawShape = z.ZodRawShape> = {
  /**
   * Map the client-side pagination object to the backend's query params
   * (e.g. `page`/`size` → `limit`/`offset`).
   */
  toRequestParams: (pagination: IPagination) => Record<string, unknown>
  /**
   * Given the entity zod, return the raw shape of the full response envelope
   * for that backend (e.g. `{ items, total }` instead of DRF's envelope).
   */
  responseShape: (entityZod: z.ZodObject<TEntity>) => z.ZodRawShape
  /**
   * Extract the array of entity records from the parsed response envelope.
   * Typed to the entity so `list`'s `results` remain the entity array.
   */
  getResults: (parsedEnvelope: unknown) => GetInferredFromRaw<TEntity>[]
}

/**
 * The default pagination adapter — reproduces the hardcoded Django REST Framework
 * contract that `list` used before adapters existed: `{ page, pageSize }` request
 * params (snake-cased and stringified through `parseFilters`), the
 * `{ count, next, previous, results }` envelope from `getPaginatedSnakeCasedZod`,
 * and `results` as the record array. `list` falls back to this when no adapter is
 * configured, so the default and override paths share a single code path instead of
 * branching on whether an adapter was supplied.
 */
export const getDefaultPaginationAdapter = <TEntity extends z.ZodRawShape>(): PaginationAdapter<TEntity> => ({
  toRequestParams: (pagination) =>
    parseFilters({
      shape: paginationFiltersZodShape,
      filters: { page: pagination.page, pageSize: pagination.size },
    }) ?? {},
  responseShape: (entityZod) => getPaginatedShape(entityZod.shape, { allowPassthrough: true }),
  getResults: (parsedEnvelope) => (parsedEnvelope as { results: GetInferredFromRaw<TEntity>[] }).results,
})

const PaginationDefaults = {
  page: 1,
  totalCount: 0,
  next: null,
  previous: null,
  size: 25,
}
export { PaginationDefaults }
export interface PaginationKwargs {
  page: number
  totalCount: number
  next: null | string
  previous: null | string
  size: number
}

export interface IPagination {
  page: number
  totalCount: number
  next: null | string
  previous: null | string
  size: number
  copy(): IPagination
  update(data: unknown): Pagination
  calcTotalPages(pagination: unknown): number
  setNextPage(): void
  setPrevPage(): void
  get hasNextPage(): boolean
  get hasPrevPage(): boolean
  get currentPageStart(): number
  get currentPageEnd(): number
}

export class Pagination implements IPagination {
  page: number
  totalCount: number
  next: null | string
  previous: null | string
  size: number
  constructor(opts?: Partial<PaginationKwargs>) {
    const options = { ...PaginationDefaults, ...(opts ?? {}) }
    this.page = options.page
    this.totalCount = options.totalCount
    this.next = options.next
    this.previous = options.previous
    this.size = options.size
  }

  static create(opts?: Partial<PaginationKwargs>) {
    return new Pagination(opts)
  }

  copy(): IPagination {
    return Pagination.create(this)
  }

  update(data = {}): Pagination {
    return Object.assign(this.copy(), data)
  }

  calcTotalPages(pagination: IPagination): number {
    const { totalCount, size } = pagination
    if (!totalCount) {
      return 0
    }
    return Math.ceil(totalCount / size)
  }

  setNextPage(): void {
    if (this.page === this.calcTotalPages(this)) return
    this.page++
  }

  setPrevPage(): void {
    if (this.page === 1) return
    this.page--
  }

  get hasPrevPage(): boolean {
    return this.page > 1
  }

  get hasNextPage(): boolean {
    if (this.calcTotalPages(this)) {
      return this.page !== this.calcTotalPages(this)
    } else {
      return false
    }
  }

  get currentPageStart(): number {
    return this.page > 1 ? (this.page - 1) * this.size : 0
  }

  get currentPageEnd(): number {
    return Math.min(this.page > 1 ? this.page * this.size : this.size, this.totalCount)
  }
}
