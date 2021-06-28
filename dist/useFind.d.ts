import { Ref } from '@vue/composition-api';
import { Params, Paginated } from './utils';
import { ModelStatic, Model } from './service-module/types';
interface UseFindOptions {
    model: ModelStatic;
    params: Params | Ref<Params>;
    fetchParams?: Params | Ref<Params>;
    queryWhen?: Ref<boolean>;
    qid?: string;
    local?: boolean;
    immediate?: boolean;
}
interface UseFindData<M> {
    items: Ref<Readonly<M[]>>;
    servicePath: Ref<string>;
    isPending: Ref<boolean>;
    haveBeenRequested: Ref<boolean>;
    haveLoaded: Ref<boolean>;
    isLocal: Ref<boolean>;
    qid: Ref<string>;
    debounceTime: Ref<number>;
    latestQuery: Ref<object>;
    paginationData: Ref<object>;
    error: Ref<Error>;
    find(params?: Params | Ref<Params>): Promise<M[] | Paginated<M>>;
}
export default function find<M extends Model = Model>(options: UseFindOptions): UseFindData<M>;
export {};
