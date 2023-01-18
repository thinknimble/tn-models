import ApiFilter from './apiFilter';
//TODO - fill in @ts-ignore types
export default class ModelAPI {
    cls;
    static ENDPOINT = '';
    static FILTERS_MAP = {
        // Pagination
        page: ApiFilter.create({ key: 'page' }),
        pageSize: ApiFilter.create({ key: 'page_size' }),
        // Sorting
        ordering: ApiFilter.create({ key: 'ordering' }),
    };
    constructor(cls) {
        this.cls = cls;
    }
    static create(cls) {
        return new this(cls);
    }
    get client() {
        //@ts-ignore
        if (typeof this.constructor.client === 'undefined') {
            throw Error('You must set `client` as a static property of your ModelAPI class.');
        }
        //@ts-ignore
        return this.constructor.client;
    }
    list({ filters = {}, pagination = {} }) {
        //@ts-ignore
        const url = this.constructor.ENDPOINT;
        //@ts-ignore
        const filtersMap = this.constructor.FILTERS_MAP;
        const options = {
            params: ApiFilter.buildParams(filtersMap, {
                ...filters,
                page: pagination.page,
                pageSize: pagination.size,
            }),
        };
        return this.client
            .get(url, options)
            .then((response) => response.data)
            .then((data) => ({
            ...data,
            results: data.results.map((i) => this.cls.fromAPI(i)),
        }));
    }
    retrieve(id) {
        //@ts-ignore
        const url = `${this.constructor.ENDPOINT}${id}/`;
        const options = {};
        return this.client.get(url, options).then((response) => this.cls.fromAPI(response.data));
    }
    create(obj, fields = [], excludeFields = []) {
        //@ts-ignore
        const url = this.constructor.ENDPOINT;
        const data = this.cls.toAPI(obj, fields, excludeFields);
        const options = {};
        return this.client
            .post(url, data, options)
            .then((response) => response.data)
            .then((data) => this.cls.fromAPI(data));
    }
}