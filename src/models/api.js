/**
 * @module       api
 * @description  Defines the base class for a front end model API.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import ApiFilter from './apiFilter'

export default class ModelAPI {
  // This is a good default filter map for most models, but could
  // be overriden on ModelAPI subclasses.
  static FILTERS_MAP = {
    // Pagination
    page: ApiFilter.create({ key: 'page' }),
    pageSize: ApiFilter.create({ key: 'page_size' }),

    // Sorting
    ordering: ApiFilter.create({ key: 'ordering' }),
  }

  constructor(cls) {
    this.cls = cls
  }

  static create(cls) {
    return new this(cls)
  }

  /**
   * The API Client should be defined as a `static` value on the subclass.
   *
   * Example:
   *
   *    static client = ApiClient
   */
  get client() {
    if (typeof this.constructor.client === 'undefined') {
      throw Error('You must set `client` as a static property of your ModelAPI class.')
    }
    return this.constructor.client
  }

  list({ filters = {}, pagination = {} }) {
    const url = this.constructor.ENDPOINT
    const filtersMap = this.constructor.FILTERS_MAP
    const options = {
      params: ApiFilter.buildParams(filtersMap, {
        ...filters,
        page: pagination.page,
        pageSize: pagination.size
      }),
    }
    return this.client
      .get(url, options)
      .then(response => response.data)
      .then(data => ({
        ...data,
        results: data.results.map(i => this.cls.fromAPI(i)),
      }))
  }

  retrieve(id) {
    const url = `${this.constructor.ENDPOINT}${id}/`
    const options = {}

    return this.client
      .get(url, options)
      .then(response => this.cls.fromAPI(response.data))
  }

  create(obj, fields = [], excludeFields = []) {
    const url = this.constructor.ENDPOINT
    const data = this.cls.toAPI(obj, fields, excludeFields)
    const options = {}

    return this.client
      .post(url, data, options)
      .then(response => response.data)
      .then(data => this.cls.fromAPI(data))
  }
}