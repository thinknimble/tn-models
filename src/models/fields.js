/**
 * @module       fields
 * @description  Defines field classes used to create models.
 *
 * @author  William Huster <william@thinknimble.com>
 */
import { random } from "@thinknimble/tn-utils";

export class Field {
  constructor({ defaultVal = null } = {}) {
    Object.assign(this, { defaultVal });
  }
}

export class CharField extends Field {}

export class IdField extends Field {
  constructor(opts) {
    super({
      ...opts,
      defaultVal: random.randomString
    });
  }
}

export class IntegerField extends Field {}

export default {
  Field,
  CharField,
  IdField,
  IntegerField
};
