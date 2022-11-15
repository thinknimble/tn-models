export interface IFieldKwargs {
    defaultVal?: any;
    readOnly?: boolean;
    unique?: boolean;
    type?: any | null;
    ModelClass?: any | null;
    many?: boolean;
}
export interface IField {
    defaultVal: any;
    readOnly: boolean;
    unique: boolean;
    clean(value: any): any;
    getDefaultVal(): any;
}
export declare class Field implements IField {
    defaultVal: any;
    readOnly: boolean;
    unique: boolean;
    constructor({ defaultVal, readOnly, unique }?: IFieldKwargs);
    /**
     * Read a field value.
     *
     * Can be used to raise validation errors and sanitize values
     * for the field type.
     */
    clean(value: any): any;
    getDefaultVal(): any;
}
export declare class BooleanField extends Field {
    constructor(opts?: IFieldKwargs);
    clean(value: any): any;
}
export declare class CharField extends Field {
    constructor(opts?: IFieldKwargs);
    clean(value: any): any;
}
export declare class IdField extends Field {
    constructor(opts?: IFieldKwargs);
}
export declare class IntegerField extends Field {
    clean(value: any): any;
}
export declare class ArrayField extends Field {
    type: any;
    constructor({ defaultVal, readOnly, type, unique }?: IFieldKwargs);
    clean(value: any): any;
}
/**
 * Instantiate a nested model or list of nested models
 */
export declare class ModelField extends Field {
    many: boolean;
    ModelClass: any;
    constructor({ defaultVal, readOnly, ModelClass, many, unique, }?: IFieldKwargs);
    clean(value: any): any;
}
declare const _default: {
    Field: typeof Field;
    BooleanField: typeof BooleanField;
    CharField: typeof CharField;
    IdField: typeof IdField;
    IntegerField: typeof IntegerField;
    ArrayField: typeof ArrayField;
    ModelField: typeof ModelField;
};
export default _default;
export declare type TFields = Field | BooleanField | CharField | IdField | IntegerField | ArrayField | ModelField;
//# sourceMappingURL=fields.d.ts.map