export function isNotBlank(value) {
    return value !== '';
}
export function isNotNull(value) {
    return value !== null;
}
export function isDefined(value) {
    return typeof value !== 'undefined';
}
export function isNotEmpty(value) {
    return value && value.length > 0;
}
export function isDefinedAndNotNull(value) {
    return isNotNull(value) && isDefined(value);
}
export function isFunction(value) {
    return typeof value === 'function';
}
export function isArray(value) {
    return Array.isArray(value);
}
