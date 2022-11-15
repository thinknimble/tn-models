"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiFilter_1 = __importDefault(require("./apiFilter"));
//TODO - fill in @ts-ignore types
class ModelAPI {
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
            params: apiFilter_1.default.buildParams(filtersMap, Object.assign(Object.assign({}, filters), { page: pagination.page, pageSize: pagination.size })),
        };
        return this.client
            .get(url, options)
            .then((response) => response.data)
            .then((data) => (Object.assign(Object.assign({}, data), { results: data.results.map((i) => this.cls.fromAPI(i)) })));
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
exports.default = ModelAPI;
ModelAPI.ENDPOINT = '';
ModelAPI.FILTERS_MAP = {
    // Pagination
    page: apiFilter_1.default.create({ key: 'page' }),
    pageSize: apiFilter_1.default.create({ key: 'page_size' }),
    // Sorting
    ordering: apiFilter_1.default.create({ key: 'ordering' }),
};
