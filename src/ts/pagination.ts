const PaginationDefaults = {
  page: 1,
  totalCount: 0,
  next: null,
  previous: null,
  size: 25,
}
interface PaginationKwargs {
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
  update(data: any): Pagination
  calcTotalPages(pagination: any): number
  setNextPage(): void
  setPrevPage(): void
  get hasNextPage(): boolean
  get hasPrevPage(): boolean
  get currentPageStart(): number
  get currentPageEnd(): number
}

export default class Pagination implements IPagination {
  page: number
  totalCount: number
  next: null | string
  previous: null | string
  size: number
  constructor(opts = {}) {
    Object.assign(this, PaginationDefaults, { ...opts })
  }

  static create(opts = {}) {
    return new Pagination(opts)
  }

  copy(): IPagination {
    return Pagination.create(this)
  }

  update(data = {}): Pagination {
    return Object.assign(this.copy(), data)
  }

  calcTotalPages(pagination: any): number {
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
    if (this.calcTotalPages) {
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
