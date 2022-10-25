/**
 * @module       model
 * @description  The base model class, which can be extended
 *               to define custom models.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import { notUndefined, notNullOrUndefined } from '../validation'
import { CollectionManager } from '../collections'

import { objectToCamelCase, objectToSnakeCase } from '@thinknimble/tn-utils'

import { Field, ModelField } from './fields'

export default class Model {
  constructor(kwargs = {}) {
    // Collect the fields defined as static properties into
    // a private `_fields` object.
    this._fields = this.constructor.getFields()

    // Loop over fields and assign kwarg values to this instance
    for (const fieldName in this._fields) {
      const field = this._fields[fieldName]

      this[fieldName] = field.clean(kwargs[fieldName])
    }
  }

  // Gather `static` fields
  static getFields() {
    const fields = {}
    for (const prop in this) {
      if (this[prop] instanceof Field) {
        fields[prop] = this[prop]
      }
    }
    return fields
  }

  // Gather read-only fields
  static getReadOnlyFields() {
    //
    const legacyReadOnlyFields = this.readOnlyFields ? this.readOnlyFields : []

    //
    let readOnlyFields = []
    for (const [key, value] of Object.entries(this.getFields())) {
      if (value.readOnly === true) {
        readOnlyFields.push(key)
      }
    }

    return [...legacyReadOnlyFields, ...readOnlyFields]
  }

  /**
   * Static Factory Methods
   *
   * Because these are `static`, `this === SubClass`, which means
   * that `new this()` will invoke the constructor of the subclass,
   * giving us a new instance of type `SubClass`!
   */
  static create(opts = {}) {
    return new this(opts)
  }

  static fromAPI(json = {}) {
    return new this(objectToCamelCase(json))
  }

  /**
   * To API Method
   *
   * Convert an instance of this class to a plain old JavaScript object
   * suitable for JSON serialization and submitting to the API.
   */
  static toAPI(obj, fields = [], excludeFields = []) {
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
          ? data[k].map((value) => value.constructor.toAPI(value))
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

  duplicate() {
    const fields = {}
    const modelFields = {}

    for (const prop in this) {
      if (prop !== '_fields' && this._fields[prop]) {
        if (this._fields[prop] instanceof ModelField && notNullOrUndefined(this[prop])) {
          if (Array.isArray(this._fields[prop])) {
            modelFields[prop] = this[prop].map((field) => field.duplicate())
          } else {
            modelFields[prop] = this[prop].duplicate()
          }
        } else {
          fields[prop] = this[prop]
        }
      }
    }
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
      if (
        prop !== '_fields' &&
        this._fields[prop] &&
        !this._fields[prop].unique &&
        notNullOrUndefined(this[prop])
      ) {
        if (this._fields[prop] instanceof ModelField) {
          if (Array.isArray(this._fields[prop])) {
            modelFields[prop] = this[prop].map((field) => field.newCopy())
          } else {
            modelFields[prop] = this[prop].newCopy()
          }
        } else {
          fields[prop] = this[prop]
        }
      }
    }
    let copy = new this.constructor(fields)
    Object.entries(modelFields).forEach(([key, val]) => {
      copy[key] = val
    })

    return copy
  }

  /**
   * Create a Collection for current ModelClass.
   * @param {Object} opts collection options, such as filters.
   * @returns {CollectionManager}
   */
  static createCollection(opts) {
    return CollectionManager.create({
      ...opts,
      ModelClass: this,
    })
  }
}
