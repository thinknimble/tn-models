/**
 * @module       fields
 * @description  Defines field classes used to create models.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import { random } from "@thinknimble/tn-utils";

import { notNullOrUndefined, isFunction, isArray } from '../validation'

export class Field {
  constructor({ defaultVal = null, readOnly = false } = {}) {
    Object.assign(this, { defaultVal, readOnly });
  }

  /**
   * Read a field value.
   *
   * Can be used to raise validation errors and sanitize values
   * for the field type.
   */
  clean(value) {
    return notNullOrUndefined(value) ? value : this.getDefaultVal()
  }

  getDefaultVal() {
    return isFunction(this.defaultVal)
      ? this.defaultVal()
      : this.defaultVal
  }
}

export class BooleanField extends Field {
  constructor(opts) {
    super({
      ...opts,
      defaultVal: false
    });
  }

  clean(value) {
    return notNullOrUndefined(value)
      ? Boolean(value)
      : this.getDefaultVal()
  }
}

export class CharField extends Field {
  constructor(opts) {
    super({
      ...opts,
      defaultVal: ''
    });
  }

  clean(value) {
    return notNullOrUndefined(value)
      ? String(value)
      : this.getDefaultVal()
  }
}

export class IdField extends Field {
  constructor(opts) {
    super({
      ...opts,
      defaultVal: random.randomString,
    });
  }
}

export class IntegerField extends Field {
  clean(value) {
    return notNullOrUndefined(value)
      ? Number(value)
      : this.getDefaultVal()
  }
}

export class ArrayField extends Field {
  constructor({
    defaultVal = null,
    readOnly = false,
    type = null,
  } = {}) {
    if (!type) {
      throw Error('`type` is a required parameter for ArrayField')
    }
    super({ defaultVal, readOnly })
    Object.assign(this, { type })
  }

  clean(value) {
    return notNullOrUndefined(value) && isArray(value)
      ? value.map(i => this.type.clean(i))
      : this.getDefaultVal()
  }
}

/**
 * Instantiate a nested model or list of nested models
 */
export class ModelField extends Field {
  constructor({
    defaultVal = null,
    readOnly = false,
    ModelClass = null,
    many = false,
  } = {}) {
    if (!ModelClass) {
      throw Error('ModelClass is a required parameter for ModelField')
    }
    super({ defaultVal, readOnly })
    Object.assign(this, { ModelClass, many })
  }

  clean(value) {
    if (notNullOrUndefined(value)) {
      // 2020-09-16 William: We're using `fromAPI` here in case we got JSON data
      //    that hasn't been camelCased. This is kind of a hack, but is
      //    _relatively_ harmless.
      return this.many
        ? value.map(i => this.ModelClass.fromAPI(i))
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
};
