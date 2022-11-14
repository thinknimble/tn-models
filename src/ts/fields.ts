import { random } from '@thinknimble/tn-utils'
import { isNotBlank, isNotNull, isDefinedAndNotNull, isFunction, isArray } from './validators'

export interface IFieldKwargs {
  defaultVal?: any
  readOnly?: boolean
  unique?: boolean
  type?: any | null
  ModelClass?: any | null
  many?: boolean
}

export interface IField {
  defaultVal: any
  readOnly: boolean
  unique: boolean
  clean(value: any): any
  getDefaultVal(): any
}

export class Field implements IField {
  defaultVal: any
  readOnly: boolean
  unique: boolean

  constructor({ defaultVal = null, readOnly = false, unique = false } = {} as IFieldKwargs) {
    Object.assign(this, { defaultVal, readOnly, unique })
  }

  /**
   * Read a field value.
   *
   * Can be used to raise validation errors and sanitize values
   * for the field type.
   */
  clean(value: any) {
    return isDefinedAndNotNull(value) ? value : this.getDefaultVal()
  }

  getDefaultVal() {
    return isFunction(this.defaultVal) ? this.defaultVal() : this.defaultVal
  }
}
export class BooleanField extends Field {
  constructor(opts: IFieldKwargs = {} as IFieldKwargs) {
    super({
      defaultVal: false,
      ...opts,
    })
  }

  clean(value: any) {
    return isDefinedAndNotNull(value) ? Boolean(value) : this.getDefaultVal()
  }
}

export class CharField extends Field {
  constructor(opts: IFieldKwargs = {} as IFieldKwargs) {
    super({
      defaultVal: '',
      ...opts,
    })
  }

  clean(value: any) {
    return isDefinedAndNotNull(value) ? String(value) : this.getDefaultVal()
  }
}

export class IdField extends Field {
  constructor(opts: IFieldKwargs = {} as IFieldKwargs) {
    super({
      unique: true,
      defaultVal: random.randomString,
      ...opts,
    })
  }
}

export class IntegerField extends Field {
  clean(value: any) {
    return isDefinedAndNotNull(value) ? Number(value) : this.getDefaultVal()
  }
}

export class ArrayField extends Field {
  type: any
  constructor(
    { defaultVal = null, readOnly = false, type = null, unique = false } = {} as IFieldKwargs,
  ) {
    if (!type) {
      throw Error('`type` is a required parameter for ArrayField')
    }

    super({ defaultVal, readOnly, unique })
    Object.assign(this, { type })
  }

  clean(value: any) {
    return isDefinedAndNotNull(value) && isArray(value)
      ? value.map((i: any) => this.type.clean(i))
      : this.getDefaultVal()
  }
}

/**
 * Instantiate a nested model or list of nested models
 */
export class ModelField extends Field {
  many: boolean
  ModelClass: any
  constructor(
    {
      defaultVal = null,
      readOnly = false,
      ModelClass = null,
      many = false,
      unique = false,
    } = {} as IFieldKwargs,
  ) {
    if (!ModelClass) {
      throw Error('ModelClass is a required parameter for ModelField')
    }

    super({ defaultVal, readOnly, unique })
    Object.assign(this, { ModelClass, many })
  }

  clean(value: any) {
    if (isDefinedAndNotNull(value)) {
      // 2020-09-16 William: We're using `fromAPI` here in case we got JSON data
      //    that hasn't been camelCased. This is kind of a hack, but is
      //    _relatively_ harmless.
      return this.many
        ? value.map((i: any) => this.ModelClass.fromAPI(i))
        : this.ModelClass.fromAPI(value)
    }
    return this.getDefaultVal()
  }
}

export default {
  Field,
  BooleanField,
  CharField,
  IdField,
  IntegerField,
  ArrayField,
  ModelField,
}

export type TFields =
  | Field
  | BooleanField
  | CharField
  | IdField
  | IntegerField
  | ArrayField
  | ModelField
