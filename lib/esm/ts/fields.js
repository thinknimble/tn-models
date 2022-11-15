import { random } from '@thinknimble/tn-utils';
import { isDefinedAndNotNull, isFunction, isArray } from './validators';
export class Field {
    defaultVal;
    readOnly;
    unique;
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
        return isDefinedAndNotNull(value) ? value : this.getDefaultVal();
    }
    getDefaultVal() {
        return isFunction(this.defaultVal) ? this.defaultVal() : this.defaultVal;
    }
}
export class BooleanField extends Field {
    constructor(opts = {}) {
        super({
            defaultVal: false,
            ...opts,
        });
    }
    clean(value) {
        return isDefinedAndNotNull(value) ? Boolean(value) : this.getDefaultVal();
    }
}
export class CharField extends Field {
    constructor(opts = {}) {
        super({
            defaultVal: '',
            ...opts,
        });
    }
    clean(value) {
        return isDefinedAndNotNull(value) ? String(value) : this.getDefaultVal();
    }
}
export class IdField extends Field {
    constructor(opts = {}) {
        super({
            unique: true,
            defaultVal: random.randomString,
            ...opts,
        });
    }
}
export class IntegerField extends Field {
    clean(value) {
        return isDefinedAndNotNull(value) ? Number(value) : this.getDefaultVal();
    }
}
export class ArrayField extends Field {
    type;
    constructor({ defaultVal = null, readOnly = false, type = null, unique = false } = {}) {
        if (!type) {
            throw Error('`type` is a required parameter for ArrayField');
        }
        super({ defaultVal, readOnly, unique });
        Object.assign(this, { type });
    }
    clean(value) {
        return isDefinedAndNotNull(value) && isArray(value)
            ? value.map((i) => this.type.clean(i))
            : this.getDefaultVal();
    }
}
/**
 * Instantiate a nested model or list of nested models
 */
export class ModelField extends Field {
    many;
    ModelClass;
    constructor({ defaultVal = null, readOnly = false, ModelClass = null, many = false, unique = false, } = {}) {
        if (!ModelClass) {
            throw Error('ModelClass is a required parameter for ModelField');
        }
        super({ defaultVal, readOnly, unique });
        this.many = many;
        this.ModelClass = ModelClass;
    }
    clean(value) {
        if (isDefinedAndNotNull(value)) {
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
export default {
    Field,
    BooleanField,
    CharField,
    IdField,
    IntegerField,
    ArrayField,
    ModelField,
};
