import { MakeServicePluginOptions, Model } from './types';
import { Id } from '@feathersjs/feathers';
export interface ServiceStateExclusiveDefaults {
    ids: string[];
    errorOnFind: any;
    errorOnGet: any;
    errorOnCreate: any;
    errorOnPatch: any;
    errorOnUpdate: any;
    errorOnRemove: any;
    isFindPending: boolean;
    isGetPending: boolean;
    isCreatePending: boolean;
    isPatchPending: boolean;
    isUpdatePending: boolean;
    isRemovePending: boolean;
    keyedById: {};
    tempsById: {};
    copiesById: {};
    namespace?: string;
    pagination?: {
        defaultLimit: number;
        defaultSkip: number;
        default?: PaginationState;
    };
    paramsForServer: string[];
    modelName?: string;
    debounceEventsTime: number;
    isIdCreatePending: Id[];
    isIdUpdatePending: Id[];
    isIdPatchPending: Id[];
    isIdRemovePending: Id[];
}
export interface ServiceState<M extends Model = Model> {
    options: {};
    ids: string[];
    autoRemove: boolean;
    errorOnFind: any;
    errorOnGet: any;
    errorOnCreate: any;
    errorOnPatch: any;
    errorOnUpdate: any;
    errorOnRemove: any;
    isFindPending: boolean;
    isGetPending: boolean;
    isCreatePending: boolean;
    isPatchPending: boolean;
    isUpdatePending: boolean;
    isRemovePending: boolean;
    idField: string;
    tempIdField: string;
    keyedById: {
        [k: string]: M;
        [k: number]: M;
    };
    tempsById: {
        [k: string]: M;
        [k: number]: M;
    };
    copiesById: {
        [k: string]: M;
    };
    whitelist: string[];
    paramsForServer: string[];
    namespace: string;
    nameStyle: string;
    pagination?: {
        defaultLimit: number;
        defaultSkip: number;
        default?: PaginationState;
    };
    modelName?: string;
    debounceEventsTime: number;
    debounceEventsMaxWait: number;
    isIdCreatePending: Id[];
    isIdUpdatePending: Id[];
    isIdPatchPending: Id[];
    isIdRemovePending: Id[];
}
export interface PaginationState {
    ids: any;
    limit: number;
    skip: number;
    ip: number;
    total: number;
    mostRecent: any;
}
export default function makeDefaultState(options: MakeServicePluginOptions): ServiceStateExclusiveDefaults & Partial<MakeServicePluginOptions>;
