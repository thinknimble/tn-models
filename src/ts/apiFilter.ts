import { isNotNull, isDefined, isNotEmpty, isDefinedAndNotNull, isNotBlank } from './validators'
export interface IApiFilter {
  isValid(value: any): boolean
}
export class ApiFilter implements IApiFilter {
  key: string
  validators: any[]
  extractor: (i: any) => {}
  static validators = {
    isNotNull,
    isDefined,
    isNotEmpty,
    isDefinedAndNotNull,
  }
  constructor(key, validators = [isDefinedAndNotNull, isNotBlank], extractor = (i: any) => i) {
    this.key = key
    this.validators = validators
    this.extractor = extractor
  }
  static create({ key, validators, extractor }) {
    return new ApiFilter(key, validators, extractor)
  }
  static buildParams(filtersMap: any, filters: any) {
    const result = {}

    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      const filter = filtersMap[key]
      if (!filter) return
      if (filter.isValid(value)) {
        result[filter.key] = filter.extractor(value)
      }
    })
    return result
  }
  isValid(value: any) {
    let valid = true
    this.validators.forEach((v) => {
      if (!v(value)) {
        valid = false
      }
    })
    return valid
  }
}
