"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelField = exports.ArrayField = exports.IntegerField = exports.IdField = exports.CharField = exports.BooleanField = exports.Field = void 0;
const tn_utils_1 = require("@thinknimble/tn-utils");
const validators_1 = require("./validators");
class Field {
    constructor({ defaultVal = null, readOnly = false, unique = false } = {}) {
        this.defaultVal = defaultVal;
        this.readOnly = readOnly;
        this.unique = unique;
    }
    /**
     * Read a field value.
     *
     * Can be used to raise validation errors and sanitize values
     * for the field type.
     */
    clean(value) {
        return (0, validators_1.isDefinedAndNotNull)(value) ? value : this.getDefaultVal();
    }
    getDefaultVal() {
        return (0, validators_1.isFunction)(this.defaultVal) ? this.defaultVal() : this.defaultVal;
    }
}
exports.Field = Field;
class BooleanField extends Field {
    constructor(opts = {}) {
        super(Object.assign({ defaultVal: false }, opts));
    }
    clean(value) {
        return (0, validators_1.isDefinedAndNotNull)(value) ? Boolean(value) : this.getDefaultVal();
    }
}
exports.BooleanField = BooleanField;
class CharField extends Field {
    constructor(opts = {}) {
        super(Object.assign({ defaultVal: '' }, opts));
    }
    clean(value) {
        return (0, validators_1.isDefinedAndNotNull)(value) ? String(value) : this.getDefaultVal();
    }
}
exports.CharField = CharField;
class IdField extends Field {
    constructor(opts = {}) {
        super(Object.assign({ unique: true, defaultVal: tn_utils_1.random.randomString }, opts));
    }
}
exports.IdField = IdField;
class IntegerField extends Field {
    clean(value) {
        return (0, validators_1.isDefinedAndNotNull)(value) ? Number(value) : this.getDefaultVal();
    }
}
exports.IntegerField = IntegerField;
class ArrayField extends Field {
    constructor({ defaultVal = null, readOnly = false, type = null, unique = false } = {}) {
        if (!type) {
            throw Error('`type` is a required parameter for ArrayField');
        }
        super({ defaultVal, readOnly, unique });
        Object.assign(this, { type });
    }
    clean(value) {
        return (0, validators_1.isDefinedAndNotNull)(value) && (0, validators_1.isArray)(value)
            ? value.map((i) => this.type.clean(i))
            : this.getDefaultVal();
    }
}
exports.ArrayField = ArrayField;
/**
 * Instantiate a nested model or list of nested models
 */
class ModelField extends Field {
    constructor({ defaultVal = null, readOnly = false, ModelClass = null, many = false, unique = false, } = {}) {
        if (!ModelClass) {
            throw Error('ModelClass is a required parameter for ModelField');
        }
        super({ defaultVal, readOnly, unique });
        this.many = many;
        this.ModelClass = ModelClass;
    }
    clean(value) {
        if ((0, validators_1.isDefinedAndNotNull)(value)) {
            // 2020-09-16 William: We're using `fromAPI` here in case we got JSON data
            //    that hasn't been camelCased. This is kind of a hack, but is
            //    _relatively_ harmless.
            return this.many
                ? value.map((i) => this.ModelClass.fromAPI(i))
                : this.ModelClass.fromAPI(value);
        }
        return this.getDefaultVal();
    }
}
exports.ModelField = ModelField;
exports.default = {
    Field,
    BooleanField,
    CharField,
    IdField,
    IntegerField,
    ArrayField,
    ModelField,
};
