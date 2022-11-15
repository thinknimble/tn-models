import { isNotNull, isDefined, isNotEmpty, isDefinedAndNotNull } from './validators';
export interface IApiFilterKwargs {
    key?: string | null;
    validators?: any[];
    extractor?: (i: any) => {};
}
export interface IApiFilter {
    key?: string | null;
    validators?: any[];
    extractor?: (i: any) => {};
    isValid(value: any): boolean;
}
export default class ApiFilter implements IApiFilter {
    key: string | null;
    validators: any[];
    extractor: (i: any) => {};
    static validators: {
        isNotNull: typeof isNotNull;
        isDefined: typeof isDefined;
        isNotEmpty: typeof isNotEmpty;
        isDefinedAndNotNull: typeof isDefinedAndNotNull;
    };
    constructor(key: string | null, validators?: any[], extractor?: (i: any) => any);
    static create({ key, validators, extractor, }?: IApiFilterKwargs): ApiFilter;
    static buildParams(filtersMap: any, filters: any): any;
    isValid(value: any): boolean;
}
//# sourceMappingURL=apiFilter.d.ts.map