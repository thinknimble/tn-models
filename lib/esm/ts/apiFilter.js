import { isNotNull, isDefined, isNotEmpty, isDefinedAndNotNull, isNotBlank } from './validators';
export default class ApiFilter {
    key;
    validators;
    extractor;
    static validators = {
        isNotNull,
        isDefined,
        isNotEmpty,
        isDefinedAndNotNull,
    };
    constructor(key, validators = [isDefinedAndNotNull, isNotBlank], extractor = (i) => i) {
        this.key = key;
        this.validators = validators;
        this.extractor = extractor;
    }
    static create({ key = null, validators = [isDefinedAndNotNull, isNotBlank], extractor = (i) => i, } = {}) {
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
