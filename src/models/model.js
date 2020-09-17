/**
 * @module       model
 * @description  The base model class, which can be extended
 *               to define custom models.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import { notUndefined } from '../validation'

import { objectToCamelCase, objectToSnakeCase } from '@thinknimble/tn-utils'

import { Field } from './fields'

export default class Model {
  constructor(kwargs = {}) {
    // Collect the fields defined as static properties into
    // a private `_fields` object.
    this._fields = {};
    for (const prop in this.constructor) {
      if (this.constructor[prop] instanceof Field) {
        this._fields[prop] = this.constructor[prop];
      }
    }

    // Loop over fields and assign kwarg values to this instance
    for (const fieldName in this._fields) {
      const field = this._fields[fieldName];

      this[fieldName] = field.clean(kwargs[fieldName])
    }
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
      data = obj
    }

    // Remove read only and excluded fields
    excludeFields = [
      ...this.constructor.readOnlyFields,
      ...excludeFields,
    ]
    excludeFields.forEach(item => {
      delete data[item]
    })

    return objectToSnakeCase(data)
  }
}
