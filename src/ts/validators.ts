export function isNotBlank(value: any): boolean {
  return value !== ''
}

export function isNotNull(value: any): boolean {
  return value !== null
}

export function isDefined(value: any): boolean {
  return typeof value !== 'undefined'
}

export function isNotEmpty(value: any): boolean {
  return value && value.length > 0
}

export function isDefinedAndNotNull(value: any): boolean {
  return isNotNull(value) && isDefined(value)
}

export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

export function isArray(value: any): boolean {
  return Array.isArray(value)
}
