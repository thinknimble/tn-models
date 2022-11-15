import Pagination, { IPagination } from './pagination';
export interface ICollectionKwargs {
    list: any[];
    pagination: IPagination;
    refreshing: boolean;
    loadingNextPage: boolean;
    filters: {};
    ModelClass: null | any;
}
export interface ICollectionManager {
    update(data: any, append: boolean): ICollectionManager;
    refresh(): void;
    nextPage(): void;
    prevPage(): void;
    addNextPage(): void;
}
export default class CollectionManager {
    list: any[];
    pagination: IPagination;
    refreshing: boolean;
    loadingNextPage: boolean;
    filters: {};
    ModelClass: null | any;
    constructor({ list, pagination, refreshing, loadingNextPage, filters, ModelClass, }?: {
        list?: never[] | undefined;
        pagination?: Pagination | undefined;
        refreshing?: boolean | undefined;
        loadingNextPage?: boolean | undefined;
        filters?: {} | undefined;
        ModelClass?: null | undefined;
    });
    static create(opts?: ICollectionKwargs): CollectionManager;
    update(data: any, append?: boolean): this;
    refresh(): Promise<this>;
    nextPage(): Promise<this>;
    prevPage(): Promise<this>;
    addNextPage(): Promise<this | undefined>;
}
//# sourceMappingURL=collectionManager.d.ts.map