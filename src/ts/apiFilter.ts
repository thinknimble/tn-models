import { isNotNull, isDefined, isNotEmpty, isDefinedAndNotNull, isNotBlank } from './validators'

export interface IApiFilterKwargs {
  key?: string | null
  validators?: any[]
  extractor?: (i: any) => {}
}
export interface IApiFilter {
  key?: string | null
  validators?: any[]
  extractor?: (i: any) => {}

  isValid(value: any): boolean
}
export default class ApiFilter implements IApiFilter {
  key: string | null
  validators: any[]
  extractor: (i: any) => {}
  static validators = {
    isNotNull,
    isDefined,
    isNotEmpty,
    isDefinedAndNotNull,
  }
  constructor(
    key: string | null,
    validators: any[] = [isDefinedAndNotNull, isNotBlank],
    extractor = (i: any) => i,
  ) {
    this.key = key
    this.validators = validators
    this.extractor = extractor
  }
  static create(
    {
      key = null,
      validators = [isDefinedAndNotNull, isNotBlank],
      extractor = (i: any) => i,
    }: IApiFilterKwargs = {} as IApiFilterKwargs,
  ) {
    return new ApiFilter(key, validators, extractor)
  }
  static buildParams(filtersMap: any, filters: any): any {
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
