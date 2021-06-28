import { ServiceState } from '..';
import { Id } from '@feathersjs/feathers';
export default function makeServiceGetters(): {
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
    isCreatePendingById: ({ isIdCreatePending }: ServiceState) => (id: Id) => boolean;
    isUpdatePendingById: ({ isIdUpdatePending }: ServiceState) => (id: Id) => boolean;
    isPatchPendingById: ({ isIdPatchPending }: ServiceState) => (id: Id) => boolean;
    isRemovePendingById: ({ isIdRemovePending }: ServiceState) => (id: Id) => boolean;
    isSavePendingById: (state: ServiceState, getters: any) => (id: Id) => any;
    isPendingById: (state: ServiceState, getters: any) => (id: Id) => any;
};
export declare type GetterName = keyof ReturnType<typeof makeServiceGetters>;
