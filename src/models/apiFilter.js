/**
 * API FILTERS
 *
 * Utility classes for prepping filter parameters for the API
 */
export function isNotBlank(value) {
  return value !== ''
}

export function isNotNull(value) {
  return value !== null
}

export function isDefined(value) {
  return typeof value !== 'undefined'
}

export function isNotEmpty(value) {
  return value && value.length > 0
}

export function isDefinedAndNotNull(value) {
  return isNotNull(value) && isDefined(value)
}

export default class ApiFilter {
  static validators = {
    isNotNull,
    isDefined,
    isNotEmpty,
    isDefinedAndNotNull,
  }

  /**
   * @param {string} key - The key to use for the query parameter in the query string.
   * @param {array[function]} validators - List of functions to use to check that the
   *                                       filter has a valid value. If not, it should
   *                                       not be included in query params.
   * @param {function} extractor - How to extract the filters value. Usually, this is
   *                               one-to-one, but sometimes (as in the case of arrays)
   *                               the value needs to be transformed.
   */
  constructor(key, validators = [isDefinedAndNotNull, isNotBlank], extractor = i => i) {
    this.key = key
    this.validators = validators
    this.extractor = extractor
  }

  static create({ key, validators, extractor }) {
    return new ApiFilter(key, validators, extractor)
  }

  static buildParams(filtersMap, filters) {
    const result = {}

    Object.keys(filters).forEach(key => {
      const value = filters[key]
      const filter = filtersMap[key]
      if (!filter) return
      if (filter.isValid(value)) {
        result[filter.key] = filter.extractor(value)
      }
    })
    return result
  }

  isValid(value) {
    let valid = true
    this.validators.forEach(v => {
      if (!v(value)) {
        valid = false
      }
    })
    return valid
  }
}
