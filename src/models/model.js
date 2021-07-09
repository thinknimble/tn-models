/**
 * @module       model
 * @description  The base model class, which can be extended
 *               to define custom models.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import { notUndefined } from '../validation'
import { CollectionManager } from '../collections'

import { objectToCamelCase, objectToSnakeCase } from '@thinknimble/tn-utils'

import { Field } from './fields'

export default class Model {
  constructor(kwargs = {}) {
    // Collect the fields defined as static properties into
    // a private `_fields` object.
    this._fields = this.constructor.getFields()

    // Loop over fields and assign kwarg values to this instance
    for (const fieldName in this._fields) {
      const field = this._fields[fieldName];

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

    return [
      ...legacyReadOnlyFields,
      ...readOnlyFields,
    ]
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
      fields.forEach(field => {
        data[field] = obj[field]
      })
    } else {
      data = { ...obj }
    }

    // Delete private '_fields' member
    delete data['_fields'];

    // Remove read only and excluded fields
    [...this.getReadOnlyFields(), ...excludeFields].forEach(item => { delete data[item] })

    return objectToSnakeCase(data)
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
