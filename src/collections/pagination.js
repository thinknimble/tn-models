const PaginationDefaults = {
  page: 1,
  totalCount: null,
  next: null,
  previous: null,
  size: 25,
}

const Pagination = {
  create(opts = {}) {
    return Object.assign(Object.create(Pagination), PaginationDefaults, { ...opts })
  },
  calcTotalPages(pagination) {
    const { totalCount, size } = pagination
    if (!totalCount) {
      return null
    }
    return Math.ceil(totalCount / size)
  },
}

export default Pagination
