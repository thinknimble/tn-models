"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
class ApiFilter {
    constructor(key, validators = [validators_1.isDefinedAndNotNull, validators_1.isNotBlank], extractor = (i) => i) {
        this.key = key;
        this.validators = validators;
        this.extractor = extractor;
    }
    static create({ key = null, validators = [validators_1.isDefinedAndNotNull, validators_1.isNotBlank], extractor = (i) => i, } = {}) {
        return new ApiFilter(key, validators, extractor);
    }
    static buildParams(filtersMap, filters) {
        const result = {};
        Object.keys(filters).forEach((key) => {
            const value = filters[key];
            const filter = filtersMap[key];
            if (!filter)
                return;
            if (filter.isValid(value)) {
                result[filter.key] = filter.extractor(value);
            }
        });
        return result;
    }
    isValid(value) {
        let valid = true;
        this.validators.forEach((v) => {
            if (!v(value)) {
                valid = false;
            }
        });
        return valid;
    }
}
exports.default = ApiFilter;
ApiFilter.validators = {
    isNotNull: validators_1.isNotNull,
    isDefined: validators_1.isDefined,
    isNotEmpty: validators_1.isNotEmpty,
    isDefinedAndNotNull: validators_1.isDefinedAndNotNull,
};
