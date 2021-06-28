import { Ref } from '@vue/composition-api';
import { Params } from './utils';
import { ModelStatic, Model, Id } from './service-module/types';
interface UseGetOptions {
    model: ModelStatic;
    id: null | string | number | Ref<null> | Ref<string> | Ref<number>;
    params?: Params | Ref<Params>;
    queryWhen?: Ref<boolean>;
    local?: boolean;
    immediate?: boolean;
}
interface UseGetData<M> {
    item: Ref<Readonly<M | null>>;
    servicePath: Ref<string>;
    isPending: Ref<boolean>;
    hasBeenRequested: Ref<boolean>;
    hasLoaded: Ref<boolean>;
    isLocal: Ref<boolean>;
    error: Ref<Error>;
    get(id: Id, params?: Params): Promise<M | undefined>;
}
export default function get<M extends Model = Model>(options: UseGetOptions): UseGetData<M>;
export {};
