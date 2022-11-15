"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Model_fields;
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const tn_utils_1 = require("@thinknimble/tn-utils");
const fields_1 = require("./fields");
const collectionManager_1 = __importDefault(require("./collectionManager"));
class Model {
    constructor(kwargs = {}) {
        _Model_fields.set(this, void 0);
        // Collect the fields defined as static properties into
        // a private `_fields` object.
        //@ts-ignore
        __classPrivateFieldSet(this, _Model_fields, this.constructor.getFields(), "f");
        // Loop over fields and assign kwarg values to this instance
        for (const fieldName in __classPrivateFieldGet(this, _Model_fields, "f")) {
            const field = __classPrivateFieldGet(this, _Model_fields, "f")[fieldName];
            this[fieldName] = field.clean(kwargs[fieldName]);
        }
    }
    static getFields() {
        const fields = {};
        for (const prop in this) {
            if (this[prop] instanceof fields_1.Field) {
                fields[prop] = this[prop];
            }
        }
        return fields;
    }
    static getReadOnlyFields() {
        //
        //TODO: this type should be a list of strings of the object that are defined as readonly
        //
        let readOnlyFields = [];
        for (const [key, value] of Object.entries(this.getFields())) {
            if (value.readOnly === true) {
                readOnlyFields.push(key);
            }
        }
        return [...readOnlyFields];
    }
    static create(opts = {}) {
        return new this(opts);
    }
    static fromAPI(json = {}) {
        return new this((0, tn_utils_1.objectToCamelCase)(json));
    }
    static toAPI(obj, fields = [], excludeFields = []) {
        // By default, send the whole object
        let data = {};
        // If it's a partial update, get only the fields specified
        if (fields.length > 0) {
            fields.forEach((field) => {
                data[field] = obj[field];
            });
        }
        else {
            data = Object.assign({}, obj);
        }
        // Delete private '_fields' member
        delete data['_fields'];
        // format it the way it is expected
        Object.keys(data).forEach((k) => {
            if (data[k] instanceof Model ||
                (Array.isArray(data[k]) && data[k].length && data[k][0] instanceof Model)) {
                data[k] = Array.isArray(data[k])
                    ? data[k].map((value) => value.constructor.toAPI(value))
                    : (data[k] = data[k].constructor.toAPI(data[k]));
            }
        });
        // Remove read only and excluded fields
        let mergedFields = [...this.getReadOnlyFields(), ...excludeFields];
        mergedFields.forEach((item) => {
            delete data[item];
        });
        return (0, tn_utils_1.objectToSnakeCase)(data);
    }
    static createCollection(opts) {
        return collectionManager_1.default.create(Object.assign(Object.assign({}, opts), { ModelClass: this }));
    }
    duplicate() {
        const fields = {};
        const modelFields = {};
        for (const prop in this) {
            let propAsString = prop;
            if (prop !== '#fields' && __classPrivateFieldGet(this, _Model_fields, "f")[propAsString]) {
                if (__classPrivateFieldGet(this, _Model_fields, "f")[propAsString] instanceof fields_1.ModelField && (0, validators_1.isDefinedAndNotNull)(this[prop])) {
                    if (Array.isArray(this[prop]) || __classPrivateFieldGet(this, _Model_fields, "f")[propAsString].many) {
                        modelFields[propAsString] = this[propAsString].map((field) => field.duplicate());
                    }
                    else {
                        modelFields[propAsString] = this[propAsString].duplicate();
                    }
                }
                else {
                    fields[propAsString] = this[propAsString];
                }
            }
        }
        //@ts-ignore
        let copy = new this.constructor(fields);
        Object.entries(modelFields).forEach(([key, val]) => {
            copy[key] = val;
        });
        return copy;
    }
    newCopy() {
        const fields = {};
        const modelFields = {};
        for (const prop in this) {
            let propAsString = prop;
            if (prop !== '#fields' &&
                __classPrivateFieldGet(this, _Model_fields, "f")[propAsString] &&
                !__classPrivateFieldGet(this, _Model_fields, "f")[propAsString].unique &&
                (0, validators_1.isDefinedAndNotNull)(this[propAsString])) {
                if (__classPrivateFieldGet(this, _Model_fields, "f")[propAsString] instanceof fields_1.ModelField) {
                    if (Array.isArray(this[propAsString]) || __classPrivateFieldGet(this, _Model_fields, "f")[propAsString].many) {
                        modelFields[propAsString] = this[propAsString].map((field) => field.newCopy());
                    }
                    else {
                        modelFields[propAsString] = this[propAsString].newCopy();
                    }
                }
                else {
                    fields[propAsString] = this[propAsString];
                }
            }
        }
        //@ts-ignore
        let copy = new this.constructor(fields);
        Object.entries(modelFields).forEach(([key, val]) => {
            copy[key] = val;
        });
        return copy;
    }
    toDict() {
        const returnFields = {};
        for (const prop in this) {
            let propAsString = prop;
            if (prop !== '#fields' && __classPrivateFieldGet(this, _Model_fields, "f")[propAsString]) {
                if (__classPrivateFieldGet(this, _Model_fields, "f")[propAsString] instanceof fields_1.ModelField &&
                    (0, validators_1.isDefinedAndNotNull)(this[propAsString])) {
                    if (Array.isArray(this[propAsString]) || __classPrivateFieldGet(this, _Model_fields, "f")[propAsString].many) {
                        returnFields[propAsString] = this[propAsString].map((field) => field.toDict());
                    }
                    else {
                        returnFields[propAsString] = this[propAsString].toDict();
                    }
                }
                else {
                    returnFields[propAsString] = this[propAsString];
                }
            }
        }
        return returnFields;
    }
}
exports.default = Model;
_Model_fields = new WeakMap();
