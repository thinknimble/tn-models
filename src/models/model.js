/**
 * @module       model
 * @description  The base model class, which can be extended
 *               to define custom models.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import { notNullOrUndefined } from "../validation";

import { Field } from "./fields";

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

      if (notNullOrUndefined(kwargs[fieldName])) {
        this[fieldName] = kwargs[fieldName];
        continue;
      }

      if (notNullOrUndefined(field.defaultVal)) {
        if (typeof field.defaultVal === "function") {
          this[fieldName] = field.defaultVal();
        } else {
          this[fieldName] = field.defaultVal;
        }
      }
    }
  }
}
