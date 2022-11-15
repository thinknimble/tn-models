import { isDefinedAndNotNull } from './validators'
import { objectToCamelCase, objectToSnakeCase } from '@thinknimble/tn-utils'
import { TFields, Field, ModelField } from './fields'
import { PickByValue } from './utility-types'
import CollectionManager, { ICollectionKwargs } from './collectionManager'
export type ToValRepresentation<T> = {
  [key in keyof T]: any
}
export type KeysToString<T> = keyof T

export type PickModelFields<T> = PickByValue<T, TFields>

export default class Model<T = any> {
  #fields: PickModelFields<T>
  constructor(kwargs = {}) {
    // Collect the fields defined as static properties into
    // a private `_fields` object.
    //@ts-ignore
    this.#fields = this.constructor.getFields()

    // Loop over fields and assign kwarg values to this instance
    for (const fieldName in this.#fields) {
      const field = this.#fields[fieldName]

      this[fieldName] = field.clean(kwargs[fieldName])
    }
  }
  static getFields<T>(): PickModelFields<T> {
    const fields = {} as PickModelFields<T>
    for (const prop in this) {
      if (this[prop] instanceof Field) {
        fields[prop] = this[prop]
      }
    }
    return fields
  }
  static getReadOnlyFields(): string[] {
    //
    //TODO: this type should be a list of strings of the object that are defined as readonly
    //
    let readOnlyFields: string[] = []
    for (const [key, value] of Object.entries(this.getFields())) {
      if ((value as Field).readOnly === true) {
        readOnlyFields.push(key)
      }
    }

    return [...readOnlyFields]
  }
  static create(opts = {}) {
    return new this(opts)
  }

  static fromAPI(json = {}) {
    return new this(objectToCamelCase(json))
  }
  static toAPI(obj: any, fields: string[] = [], excludeFields: string[] = []) {
    // By default, send the whole object
    let data = {}

    // If it's a partial update, get only the fields specified
    if (fields.length > 0) {
      fields.forEach((field) => {
        data[field] = obj[field]
      })
    } else {
      data = { ...obj }
    }

    // Delete private '_fields' member
    delete data['_fields']
    // format it the way it is expected
    Object.keys(data).forEach((k) => {
      if (
        data[k] instanceof Model ||
        (Array.isArray(data[k]) && data[k].length && data[k][0] instanceof Model)
      ) {
        data[k] = Array.isArray(data[k])
          ? data[k].map((value: any) => value.constructor.toAPI(value))
          : (data[k] = data[k].constructor.toAPI(data[k]))
      }
    })
    // Remove read only and excluded fields
    let mergedFields = [...this.getReadOnlyFields(), ...excludeFields]
    mergedFields.forEach((item) => {
      delete data[item]
    })
    return objectToSnakeCase(data)
  }
  static createCollection<T>(opts: ICollectionKwargs) {
    return CollectionManager.create<T>({
      ...opts,
      ModelClass: this,
    })
  }
  duplicate() {
    const fields = {}
    const modelFields = {}

    for (const prop in this) {
      let propAsString = prop as string
      if (prop !== '#fields' && this.#fields[propAsString]) {
        if (this.#fields[propAsString] instanceof ModelField && isDefinedAndNotNull(this[prop])) {
          if (Array.isArray(this[prop]) || this.#fields[propAsString].many) {
            modelFields[propAsString] = this[propAsString].map((field) => field.duplicate())
          } else {
            modelFields[propAsString] = this[propAsString].duplicate()
          }
        } else {
          fields[propAsString] = this[propAsString]
        }
      }
    }
    //@ts-ignore
    let copy = new this.constructor(fields)
    Object.entries(modelFields).forEach(([key, val]) => {
      copy[key] = val
    })

    return copy
  }
  newCopy() {
    const fields = {}
    const modelFields = {}

    for (const prop in this) {
      let propAsString = prop as string
      if (
        prop !== '#fields' &&
        this.#fields[propAsString] &&
        !this.#fields[propAsString].unique &&
        isDefinedAndNotNull(this[propAsString])
      ) {
        if (this.#fields[propAsString] instanceof ModelField) {
          if (Array.isArray(this[propAsString]) || this.#fields[propAsString].many) {
            modelFields[propAsString] = this[propAsString].map((field) => field.newCopy())
          } else {
            modelFields[propAsString] = this[propAsString].newCopy()
          }
        } else {
          fields[propAsString] = this[propAsString]
        }
      }
    }
    //@ts-ignore
    let copy = new this.constructor(fields)
    Object.entries(modelFields).forEach(([key, val]) => {
      copy[key] = val
    })

    return copy
  }

  toDict(): ToValRepresentation<T> {
    const returnFields = {} as ToValRepresentation<T>
    for (const prop in this) {
      let propAsString = prop as string
      if (prop !== '#fields' && this.#fields[propAsString]) {
        if (
          this.#fields[propAsString] instanceof ModelField &&
          isDefinedAndNotNull(this[propAsString])
        ) {
          if (Array.isArray(this[propAsString]) || this.#fields[propAsString].many) {
            returnFields[propAsString] = this[propAsString].map((field) => field.toDict())
          } else {
            returnFields[propAsString] = this[propAsString].toDict()
          }
        } else {
          returnFields[propAsString] = this[propAsString]
        }
      }
    }
    return returnFields as ToValRepresentation<T>
  }
}
