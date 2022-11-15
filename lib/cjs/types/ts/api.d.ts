import ApiFilter from './apiFilter';
export declare type FiltersPaginationQuery = {
    filters: any;
    pagination: any;
};
export default class ModelAPI {
    cls: any;
    static ENDPOINT: string;
    static FILTERS_MAP: {
        page: ApiFilter;
        pageSize: ApiFilter;
        ordering: ApiFilter;
    };
    constructor(cls: any);
    static create(cls: any): ModelAPI;
    get client(): any;
    list<T = any>({ filters, pagination }: FiltersPaginationQuery): Promise<T>;
    retrieve<T>(id: string): Promise<T>;
    create<T>(obj: any, fields?: never[], excludeFields?: never[]): Promise<T>;
}
//# sourceMappingURL=api.d.ts.map