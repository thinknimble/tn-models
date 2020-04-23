/**
 * @module       validation
 * @description  Helper functions for model field validation.
 *
 * @author  William Huster <william@thinknimble.com>
 */
export default {
  notNullOrUndefined,
}

export function notNullOrUndefined(value) {
  return value !== null && typeof value !== "undefined";
}
