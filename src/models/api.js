/**
 * @module       api
 * @description  Defines the base class for a front end model API.
 *
 * @author  William Huster <william@thinknimble.com>
 */
export default class ModelAPI {
  constructor(cls) {
    this.cls = cls
  }

  static create(cls) {
    return new this.constructor(cls)
  }
}