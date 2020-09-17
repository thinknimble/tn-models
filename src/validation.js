/**
 * @module       validation
 * @description  Helper functions for model field validation.
 *
 * @author  William Huster <william@thinknimble.com>
 */
export default {
  notNull,
  notUndefined,
  notNullOrUndefined,
  isArray,
  isFunction,
}

export function notNull(value) {
  return value != null
}

export function notUndefined(value) {
  return typeof value !== "undefined";
}

export function notNullOrUndefined(value) {
  return notNull(value) && notUndefined(value)
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isFunction(value) {
  return typeof value === "function"
}
