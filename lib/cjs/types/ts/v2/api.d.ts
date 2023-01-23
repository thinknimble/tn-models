import { SnakeCase, SnakeCasedPropertiesDeep } from "@thinknimble/tn-utils";
import { AxiosInstance } from "axios";
import { z, ZodRawShape, ZodTypeAny } from "zod";
import { IPagination } from "../pagination";
import { getPaginatedZod } from "./pagination";
declare const paginationFiltersZod: z.ZodOptional<z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    pageSize?: number | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>>;
export declare type PaginationFilters = z.infer<typeof paginationFiltersZod>;
declare const filtersZod: z.ZodOptional<z.ZodObject<{
    ordering: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ordering?: string | undefined;
}, {
    ordering?: string | undefined;
}>>;
declare type CustomServiceCallOpts<TInput extends ZodRawShape | ZodTypeAny, TOutput extends ZodRawShape | ZodTypeAny> = {
    inputShape: TInput;
    outputShape: TOutput;
    callback: (params: {
        client: AxiosInstance;
        input: TInput extends ZodRawShape ? GetZodInferredTypeFromRaw<TInput> : TInput extends ZodTypeAny ? z.infer<TInput> : never;
        utils: {
            fromApi: (obj: object) => TOutput extends ZodRawShape ? GetZodInferredTypeFromRaw<TOutput> : TOutput extends ZodTypeAny ? z.infer<TOutput> : never;
            toApi: (obj: object) => TInput extends ZodRawShape ? SnakeCasedPropertiesDeep<GetZodInferredTypeFromRaw<TInput>> : TInput extends ZodTypeAny ? z.infer<TInput> : never;
        };
    }) => Promise<TOutput extends ZodRawShape ? GetZodInferredTypeFromRaw<TOutput> : TOutput extends ZodTypeAny ? z.infer<TOutput> : never>;
};
declare type ZodPrimitives = z.ZodString | z.ZodNumber | z.ZodDate | z.ZodBigInt | z.ZodBoolean;
/**
 * Use this method to get the right type inference when creating a customApiCall
 */
export declare const createCustomServiceCall: <TInput extends z.ZodRawShape | ZodPrimitives, TOutput extends z.ZodRawShape | ZodPrimitives>(opts: CustomServiceCallOpts<TInput, TOutput>) => CustomServiceCallOpts<TInput, TOutput>;
declare type CustomServiceCall<TOpts extends object> = TOpts extends Record<string, CustomServiceCallOpts<any, any>> ? {
    [TKey in keyof TOpts]: (inputs: TOpts[TKey]["inputShape"] extends ZodRawShape ? GetZodInferredTypeFromRaw<TOpts[TKey]["inputShape"]> : TOpts[TKey]["inputShape"] extends ZodTypeAny ? z.infer<TOpts[TKey]["inputShape"]> : never) => Promise<TOpts[TKey]["outputShape"] extends ZodRawShape ? GetZodInferredTypeFromRaw<TOpts[TKey]["outputShape"]> : TOpts[TKey]["outputShape"] extends ZodTypeAny ? z.infer<TOpts[TKey]["outputShape"]> : never>;
} : never;
declare type ZodRawShapeSnakeCased<T extends ZodRawShape> = {
    [TKey in keyof T as SnakeCase<TKey>]: T[TKey];
};
export declare const getPaginatedSnakeCasedZod: <T extends z.ZodRawShape>(zodShape: T) => z.ZodObject<{
    count: z.ZodNumber;
    next: z.ZodNullable<z.ZodString>;
    previous: z.ZodNullable<z.ZodString>;
    results: z.ZodArray<z.ZodObject<ZodRawShapeSnakeCased<T>, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_3 extends z.ZodRawShape ? { [k_2 in keyof T_3]: ZodRawShapeSnakeCased<T>[k_2]["_output"]; } : never> extends infer T_1 ? { [k_1 in keyof T_1]: z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_2 extends z.ZodRawShape ? { [k in keyof T_2]: ZodRawShapeSnakeCased<T>[k]["_output"]; } : never>[k_1]; } : never, z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_6 extends z.ZodRawShape ? { [k_2_1 in keyof T_6]: ZodRawShapeSnakeCased<T>[k_2_1]["_input"]; } : never> extends infer T_4 ? { [k_3 in keyof T_4]: z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_5 extends z.ZodRawShape ? { [k_2 in keyof T_5]: ZodRawShapeSnakeCased<T>[k_2]["_input"]; } : never>[k_3]; } : never>, "many">;
}, "strip", z.ZodTypeAny, {
    next: string | null;
    previous: string | null;
    count: number;
    results: (z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_3 extends z.ZodRawShape ? { [k_2 in keyof T_3]: ZodRawShapeSnakeCased<T>[k_2]["_output"]; } : never> extends infer T_1 ? { [k_1 in keyof T_1]: z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_2 extends z.ZodRawShape ? { [k in keyof T_2]: ZodRawShapeSnakeCased<T>[k]["_output"]; } : never>[k_1]; } : never)[];
}, {
    next: string | null;
    previous: string | null;
    count: number;
    results: (z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_6 extends z.ZodRawShape ? { [k_2_1 in keyof T_6]: ZodRawShapeSnakeCased<T>[k_2_1]["_input"]; } : never> extends infer T_4 ? { [k_3 in keyof T_4]: z.objectUtil.addQuestionMarks<ZodRawShapeSnakeCased<T> extends infer T_5 extends z.ZodRawShape ? { [k_2 in keyof T_5]: ZodRawShapeSnakeCased<T>[k_2]["_input"]; } : never>[k_3]; } : never)[];
}>;
export declare type GetZodInferredTypeFromRaw<T extends ZodRawShape> = z.infer<ReturnType<typeof z.object<T>>>;
declare type BareApiService<TEntity extends ZodRawShape, TCreate extends ZodRawShape, TExtraFilters extends ZodRawShape = never> = {
    client: AxiosInstance;
    retrieve(id: string): Promise<GetZodInferredTypeFromRaw<TEntity>>;
    create(inputs: GetZodInferredTypeFromRaw<TCreate>): Promise<GetZodInferredTypeFromRaw<TEntity>>;
    list(params?: {
        filters?: GetZodInferredTypeFromRaw<TExtraFilters> & z.infer<typeof filtersZod>;
        pagination?: IPagination;
    }): Promise<z.infer<ReturnType<typeof getPaginatedZod<TEntity>>>>;
};
declare type ApiService<TEntity extends ZodRawShape, TCreate extends ZodRawShape, TCustomServiceCalls extends object, TExtraFilters extends ZodRawShape = never> = BareApiService<TEntity, TCreate, TExtraFilters> & {
    customServiceCalls: CustomServiceCall<TCustomServiceCalls>;
};
declare type ApiBaseParams<TApiEntity extends ZodRawShape, TApiCreate extends ZodRawShape, TApiUpdate extends ZodRawShape, TExtraFilters extends ZodRawShape = never> = {
    /**
     * Zod raw shapes to use as models. All these should be the frontend camelCased version
     */
    models: {
        /**
         * Zod raw shape of the equivalent camel-cased version of the entity in backend
         *
         * Example
         * ```ts
         * type BackendModel = {
         *  my_model:string
         * }
         * type TApiEntity = {
         *  myModel: z.string()
         * }
         * ```
         */
        entity: TApiEntity;
        /**
         * Zod raw shape of the input for creating an entity
         */
        create: TApiCreate;
        /**
         * Zod raw shape of input for updating an entity
         */
        update: TApiUpdate;
        /**
         * Zod raw shape of extra filters if any
         */
        extraFilters?: TExtraFilters;
    };
    /**
     * The base endpoint for te api to hit. We append this to request's uris for listing, retrieving and creating
     */
    endpoint: string;
    /**
     * The axios instance created for the app.
     */
    client: AxiosInstance;
};
export declare function createApi<TApiEntity extends ZodRawShape, TApiCreate extends ZodRawShape, TApiUpdate extends ZodRawShape, TCustomServiceCalls extends Record<string, CustomServiceCallOpts<any, any>>, TExtraFilters extends ZodRawShape = never>(base: ApiBaseParams<TApiEntity, TApiCreate, TApiUpdate, TExtraFilters>, 
/**
 * Create your own custom service calls to use with this API. Tools for case conversion are provided.
 */
customServiceCalls: TCustomServiceCalls): ApiService<TApiEntity, TApiCreate, TCustomServiceCalls, TExtraFilters>;
export declare function createApi<TApiEntity extends ZodRawShape, TApiCreate extends ZodRawShape, TApiUpdate extends ZodRawShape, TExtraFilters extends ZodRawShape = never>(base: ApiBaseParams<TApiEntity, TApiCreate, TApiUpdate, TExtraFilters>): BareApiService<TApiEntity, TApiCreate, TExtraFilters>;
export {};
//# sourceMappingURL=api.d.ts.map