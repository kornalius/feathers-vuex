import { Service } from '@feathersjs/feathers';
import { MakeServicePluginOptions } from './types';
import { Store } from 'vuex';
export default function makeServiceModule(service: Service<any>, options: MakeServicePluginOptions, store: Store<any>): {
    namespaced: boolean;
    state: import("./service-module.state").ServiceStateExclusiveDefaults & Partial<MakeServicePluginOptions>;
    getters: {
        list(state: any): any;
        find: (state: any) => (params: any) => {
            total: number;
            limit: any;
            skip: any;
            data: any[];
        };
        count: (state: any, getters: any) => (params: any) => any;
        get: ({ keyedById, tempsById, idField, tempIdField }: {
            keyedById: any;
            tempsById: any;
            idField: any;
            tempIdField: any;
        }) => (id: any, params?: {}) => any;
        getCopyById: (state: any) => (id: any) => any;
        isCreatePendingById: ({ isIdCreatePending }: import("./service-module.state").ServiceState<import("./types").Model>) => (id: string | number) => boolean;
        isUpdatePendingById: ({ isIdUpdatePending }: import("./service-module.state").ServiceState<import("./types").Model>) => (id: string | number) => boolean;
        isPatchPendingById: ({ isIdPatchPending }: import("./service-module.state").ServiceState<import("./types").Model>) => (id: string | number) => boolean;
        isRemovePendingById: ({ isIdRemovePending }: import("./service-module.state").ServiceState<import("./types").Model>) => (id: string | number) => boolean;
        isSavePendingById: (state: import("./service-module.state").ServiceState<import("./types").Model>, getters: any) => (id: string | number) => any;
        isPendingById: (state: import("./service-module.state").ServiceState<import("./types").Model>, getters: any) => (id: string | number) => any;
    };
    mutations: {
        mergeInstance: (state: any, item: any) => void;
        merge: (state: any, { dest, source }: {
            dest: any;
            source: any;
        }) => void;
        addItem(state: any, item: any): void;
        addItems: (state: any, items: any) => void;
        updateItem(state: any, item: any): void;
        updateItems(state: any, items: any): void;
        updateTemp(state: any, { id, tempId }: {
            id: any;
            tempId: any;
        }): void;
        removeItem(state: any, item: any): void;
        removeTemps(state: any, tempIds: any): void;
        removeItems(state: any, items: any): void;
        clearAll(state: any): void;
        createCopy(state: any, id: any): void;
        resetCopy(state: any, id: any): void;
        commitCopy(state: any, id: any): void;
        clearCopy(state: any, id: any): void;
        updatePaginationForQuery(state: any, { qid, response, query }: {
            qid: any;
            response: any;
            query?: {};
        }): void;
        setPending(state: any, method: "update" | "find" | "get" | "create" | "patch" | "remove"): void;
        unsetPending(state: any, method: "update" | "find" | "get" | "create" | "patch" | "remove"): void;
        setIdPending(state: any, payload: {
            method: "update" | "create" | "patch" | "remove";
            id: string | number | (string | number)[];
        }): void;
        unsetIdPending(state: any, payload: {
            method: "update" | "create" | "patch" | "remove";
            id: string | number | (string | number)[];
        }): void;
        setError(state: any, payload: {
            method: "update" | "find" | "get" | "create" | "patch" | "remove";
            error: Error;
        }): void;
        clearError(state: any, method: "update" | "find" | "get" | "create" | "patch" | "remove"): void;
    };
    actions: {
        count({ dispatch }: {
            dispatch: any;
        }, params: any): any;
        handleFindResponse({ state, commit, dispatch }: {
            state: any;
            commit: any;
            dispatch: any;
        }, { params, response }: {
            params: any;
            response: any;
        }): Promise<any>;
        handleFindError({ commit }: {
            commit: any;
        }, { params, error }: {
            params: any;
            error: any;
        }): Promise<never>;
        afterFind({}: {}, response: any): Promise<any>;
        addOrUpdateList({ state, commit }: {
            state: any;
            commit: any;
        }, response: any): any;
        addOrUpdate({ state, commit }: {
            state: any;
            commit: any;
        }, item: any): any;
    };
} & Pick<MakeServicePluginOptions, "state" | "getters" | "mutations" | "actions"> & {
    state?: any;
    getters?: any;
    mutations?: any;
    actions?: any;
};
