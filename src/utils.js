export default {
  toSnakeCase,
  toCamelCase,
  isObject,
  objectToCamelCase,
  objectToSnakeCase,
}

/**
 * Transform a string value from `camelCase` style notation to `snake_case` notation.
 * This is useful for translating Python-serialized JSON objects to JavaScript objects.
 *
 * @param {String} value - The string value to transform
 */
export function toSnakeCase(value) {
  let upperChars = value.match(/([A-Z])/g)

  if (!upperChars) {
    return value
  }

  let str = value.toString()
  for (let i = 0, n = upperChars.length; i < n; i++) {
    str = str.replace(new RegExp(upperChars[i]), '_' + upperChars[i].toLowerCase())
  }

  if (str.slice(0, 1) === '_') {
    str = str.slice(1)
  }

  return str
}

/**
 * Transform a string value from `snake_case` style notation to `camelCase` notation.
 * This is useful for translating Python-serialized JSON objects to JavaScript objects.
 *
 * @param {String} value - The string value to transform.
 */
export function toCamelCase(value) {
  return value
    .split('_')
    .map(function (word, index) {
      // Do nothing with the first word
      if (index === 0) {
        return word
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

/**
 * Check whether a given value is an object.
 */
export function isObject(value) {
  return value !== null && value instanceof Object && !Array.isArray(value)
}

/**
 * Transform the string-based keys of a JavaScript object to `camelCase` style notation.
 * This is useful for translating the style of object keys after making an API call to
 * the Python-based API, which uses `snake_case` style notation by default.
 */
export function objectToCamelCase(value) {
  if (isObject(value)) {
    return Object.keys(value).reduce((acc, snakeKey) => {
      const camelKey = toCamelCase(snakeKey)
      acc[camelKey] = isObject(value[snakeKey])
        ? objectToCamelCase(value[snakeKey])
        : value[snakeKey]
      return acc
    }, {})
  }
}

/**
 * Transform the string-based keys of a JavaScript object to `snake_case` style notation.
 * This is useful for translating the `camelCase` style of JavaScript keys BEFORE posting
 * the data to the Python-based API, which uses `snake_case` style notation by default.
 */
export function objectToSnakeCase(value) {
  if (isObject(value)) {
    return Object.keys(value).reduce((acc, camelKey) => {
      const snakeKey = toSnakeCase(camelKey)
      acc[snakeKey] = isObject(value[camelKey])
        ? objectToSnakeCase(value[camelKey])
        : value[camelKey]
      return acc
    }, {})
  }
}