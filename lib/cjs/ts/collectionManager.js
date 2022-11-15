"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = __importDefault(require("./pagination"));
class CollectionManager {
    constructor({ list = [], pagination = pagination_1.default.create(), refreshing = false, loadingNextPage = false, filters = {}, ModelClass = null, } = {}) {
        this.list = list;
        this.pagination = pagination;
        this.refreshing = refreshing;
        this.loadingNextPage = loadingNextPage;
        this.filters = filters;
        this.ModelClass = ModelClass;
    }
    static create(opts = {}) {
        if (Object.keys(opts)) {
            return new CollectionManager(opts);
        }
        return new CollectionManager();
    }
    update(data, append = false) {
        this.list = [...(append ? this.list : []), ...data.results];
        this.pagination = pagination_1.default.create(Object.assign(Object.assign({}, this.pagination), { next: data.next, previous: data.previous, totalCount: data.count }));
        return this;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.refreshing = true;
            try {
                const response = yield this.ModelClass.api.list({
                    pagination: this.pagination,
                    filters: this.filters,
                });
                return this.update(response);
            }
            finally {
                this.refreshing = false;
            }
        });
    }
    nextPage() {
        this.pagination.setNextPage();
        return this.refresh();
    }
    prevPage() {
        this.pagination.setPrevPage();
        return this.refresh();
    }
    addNextPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pagination.next === null) {
                return;
            }
            this.loadingNextPage = true;
            this.pagination = pagination_1.default.create(Object.assign(Object.assign({}, this.pagination), { page: this.pagination.page + 1 }));
            try {
                const response = yield this.ModelClass.api.list({
                    pagination: this.pagination,
                    filters: this.filters,
                });
                return this.update(response, true);
            }
            finally {
                this.loadingNextPage = false;
            }
        });
    }
}
exports.default = CollectionManager;
