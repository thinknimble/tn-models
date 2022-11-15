import { TFields } from './fields';
import { PickByValue } from './utility-types';
import CollectionManager, { ICollectionKwargs } from './collectionManager';
export declare type ToValRepresentation<T> = {
    [key in keyof T]: any;
};
export declare type KeysToString<T> = keyof T;
export declare type PickModelFields<T> = PickByValue<T, TFields>;
export default class Model<T = any> {
    #private;
    constructor(kwargs?: {});
    static getFields<T>(): PickModelFields<T>;
    static getReadOnlyFields(): string[];
    static create(opts?: {}): Model<any>;
    static fromAPI(json?: {}): Model<any>;
    static toAPI(obj: any, fields?: string[], excludeFields?: string[]): any;
    static createCollection(opts: ICollectionKwargs): CollectionManager;
    duplicate(): any;
    newCopy(): any;
    toDict(): {};
}
//# sourceMappingURL=model.d.ts.map