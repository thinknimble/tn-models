import Pagination from './pagination'

/**
 * An abstraction that provides a simple interface for managing
 * paginated collections of entities from the API.
 **/
export default class CollectionManager {
  constructor({
    list = [],
    pagination = Pagination.create(),
    refreshing = false,
    loadingNextPage = false,
    filters = {},
    ModelClass = null,
  } = {}) {
    Object.assign(this, {
      list,
      pagination,
      refreshing,
      loadingNextPage,
      filters,
      ModelClass,
    })
  }

  // Factory Function
  static create(opts = {}) {
    opts = opts || {}
    return new CollectionManager(opts)
  }

  /**
   * Update the collection.
   *
   * @param {object} data - API response data
   * @param {boolean} append - Optional, add to the current list if `true`. Replace the
   *                           current list if false. Defaults to `false`.
   */
  update(data, append = false) {
    console.log('CollectionManager.update.data:', data)
    this.list = [...(append ? this.list : []), ...data.results]
    this.pagination = {
      ...this.pagination,
      next: data.next,
      previous: data.previous,
      totalCount: data.count,
    }
    return this
  }

  /**
   * Refresh the collection.
   */
  async refresh() {
    this.refreshing = true
    try {
      console.log('CollectionManager.ModelClass:', this.ModelClass)
      const response = await this.ModelClass.api.list({
        pagination: this.pagination,
        filters: this.filters,
      })
      console.log('CollectionManager.refresh.response:', response)
      return this.update(response)
    } finally {
      this.refreshing = false
    }
  }

  /**
   * Get the next page for a collection and add this page
   * to the collection.
   */
  async addNextPage() {
    if (this.pagination.next === null) {
      return
    }

    this.loadingNextPage = true
    this.pagination = {
      ...this.pagination,
      page: this.pagination.page + 1,
    }

    try {
      const response = await this.ModelClass.api.list({
        pagination: this.pagination,
        filters: this.filters,
      })
      return this.update(response, true)
    } finally {
      this.loadingNextPage = false
    }
  }
}
