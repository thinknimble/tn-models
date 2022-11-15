"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isFunction = exports.isDefinedAndNotNull = exports.isNotEmpty = exports.isDefined = exports.isNotNull = exports.isNotBlank = void 0;
function isNotBlank(value) {
    return value !== '';
}
exports.isNotBlank = isNotBlank;
function isNotNull(value) {
    return value !== null;
}
exports.isNotNull = isNotNull;
function isDefined(value) {
    return typeof value !== 'undefined';
}
exports.isDefined = isDefined;
function isNotEmpty(value) {
    return value && value.length > 0;
}
exports.isNotEmpty = isNotEmpty;
function isDefinedAndNotNull(value) {
    return isNotNull(value) && isDefined(value);
}
exports.isDefinedAndNotNull = isDefinedAndNotNull;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
