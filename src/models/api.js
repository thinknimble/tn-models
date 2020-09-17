/**
 * @module       api
 * @description  Defines the base class for a front end model API.
 *
 * @author  William Huster <william@thinknimble.com>
 */
export default class ModelAPI {
  constructor(cls) {
    this.cls = cls
  }

  static create(cls) {
    return new this.constructor(cls)
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
    const options = {
      params: {
        ...filters,
      },
    }
    return this.client
      .get(url, options)
      .then(response => response.data)
      .then(data => ({
        ...data,
        results: data.results.map(this.cls.fromAPI),
      }))
  }

  create(obj, fields = [], excludeFields = []) {
    const url = this.constructor.ENDPOINT
    const data = this.cls.toAPI(obj)
    const options = {}

    return this.client
      .post(url, data, options)
      .then(response => response.data)
      .then(this.cls.fromAPI)
      .catch(apiErrorHandler({ apiName: 'Create Event API error' }))
  }
}