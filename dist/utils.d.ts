import { Service } from '@feathersjs/feathers';
interface Query {
    [key: string]: any;
}
interface PaginationOptions {
    default: number;
    max: number;
}
interface Params {
    query?: Query;
    paginate?: false | Pick<PaginationOptions, 'max'>;
    provider?: string;
    route?: {
        [key: string]: string;
    };
    headers?: {
        [key: string]: any;
    };
    temps?: boolean;
    copies?: boolean;
    [key: string]: any;
}
interface Paginated<T> {
    total: number;
    limit: number;
    skip: number;
    data: T[];
}
export { Query, PaginationOptions, Params, Paginated };
export declare function stripSlashes(location: string): string;
export declare function setByDot(obj: any, path: any, value: any, ifDelete?: any): any;
export declare function upperCaseFirst(string: any): any;
export declare function getShortName(service: any): string;
export declare function getNameFromPath(service: any): string;
export declare function readCookie(cookies: any, name: any): any;
export declare function payloadIsValid(payload: any): boolean;
export declare const isNode: boolean;
export declare const isBrowser: boolean;
export declare function getValidPayloadFromToken(token: any): any;
export declare const initAuth: (options: any) => any;
/**
 * run de BaseModel hydration on client for each api
 */
export declare const hydrateApi: ({ api }: {
    api: any;
}) => void;
/**
 * Generate a new tempId and mark the record as a temp
 * @param state
 * @param item
 */
export declare function assignTempId(state: any, item: any): string;
/**
 * Get the id from a record in this order:
 *   1. the `idField`
 *   2. id
 *   3. _id
 * @param item
 * @param idField
 */
export declare function getId(item: any, idField?: any): any;
export declare function getModelName(Model: any): any;
export declare function registerModel(Model: any, globalModels: any, apiPrefix: any, servicePath: any): {
    path: any;
    name: any;
};
export declare function getServicePrefix(servicePath: any): any;
export declare function getServiceCapitalization(servicePath: any): any;
export declare function updateOriginal(original: any, newData: any): void;
export declare function getQueryInfo(params?: Params, response?: Partial<Pick<Paginated<any>, 'limit' | 'skip'>>): {
    qid: string;
    query: Query;
    queryId: string;
    queryParams: Pick<Query, string | number>;
    pageParams: {
        $limit: any;
        $skip: any;
    };
    pageId: string;
    response: any;
    isOutdated: boolean;
};
export declare function getItemsFromQueryInfo(pagination: any, queryInfo: any, keyedById: any): any;
export declare function makeNamespace(namespace: any, servicePath: any, nameStyle: any): any;
/**
 * Gets the service path or name from the service.  The modelname is provided
 * to allow easier discovery if there's a problem.
 * @param service
 * @param modelName
 */
export declare function getServicePath(service: Service<any>, Model: any): any;
export declare function randomString(length: any): string;
export declare function createRelatedInstance({ item, Model, idField, store }: {
    item: any;
    Model: any;
    idField: any;
    store: any;
}): {
    model: any;
    storedModel: any;
};
export declare function isBaseModelInstance(item: any): boolean;
export declare function mergeWithAccessors(dest: any, source: any, blacklist?: string[]): any;
export declare function checkNamespace(namespace: any, item: any, debug: any): boolean;
export declare function assignIfNotPresent(Model: any, props: any): void;
