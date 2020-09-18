const PaginationDefaults = {
  page: 1,
  totalCount: null,
  next: null,
  previous: null,
  size: 25,
}

export default class Pagination {
  constructor(opts) {
    Object.assign(this, PaginationDefaults, opts)
  }

  static create(opts = {}) {
    return new Pagination(opts)
  }

  static calcTotalPages(pagination) {
    const { totalCount, size } = pagination
    if (!totalCount) {
      return null
    }
    return Math.ceil(totalCount / size)
  }


  calcTotalPages() {
    const { totalCount, size } = this
    if (!totalCount) {
      return null
    }
    return Math.ceil(totalCount / size)
  }

  setNextPage() {
    if (!this.hasNextPage) return
    this.page++
  }

  setPrevPage() {
    if (!this.hasPrevPage) return
    this.page--
  }

  get hasPrevPage() {
    return this.page > 1
  }

  get hasNextPage() {
    return this.calcTotalPages() && this.page !== this.calcTotalPages()
  }

  get currentPageStart() {
    return this.page > 1 ? (this.page - 1) * this.size : 1
  }

  get currentPageEnd() {
    return Math.min(this.page > 1 ? this.page * this.size : this.size, this.totalCount)
  }
}

