import FeathersVuexFind from './FeathersVuexFind';
import FeathersVuexGet from './FeathersVuexGet';
import FeathersVuexFormWrapper from './FeathersVuexFormWrapper';
import FeathersVuexInputWrapper from './FeathersVuexInputWrapper';
import FeathersVuexPagination from './FeathersVuexPagination';
import makeFindMixin from './make-find-mixin';
import makeGetMixin from './make-get-mixin';
import { globalModels as models } from './service-module/global-models';
import { clients } from './service-module/global-clients';
import useFind from './useFind';
import useGet from './useGet';
import { FeathersVuexOptions, Model, ModelStatic, ModelSetupContext, Id, FeathersVuexStoreState, FeathersVuexGlobalModels } from './service-module/types';
import { initAuth, hydrateApi } from './utils';
import { FeathersVuex } from './vue-plugin/vue-plugin';
import { ServiceState } from './service-module/service-module.state';
import { AuthState } from './auth-module/types';
export default function feathersVuex(feathers: any, options: FeathersVuexOptions): {
    makeServicePlugin: (config: import("./service-module/types").MakeServicePluginOptions) => (store: any) => void;
    BaseModel: ModelStatic;
    makeAuthPlugin: (options: any) => (store: any) => void;
    FeathersVuex: {
        install(Vue: any, options?: {
            components: boolean;
        }): void;
    };
    models: any;
    clients: {
        [k: string]: any;
    };
};
export { initAuth, hydrateApi, FeathersVuexFind, FeathersVuexGet, FeathersVuexFormWrapper, FeathersVuexInputWrapper, FeathersVuexPagination, FeathersVuex, makeFindMixin, makeGetMixin, models, clients, useFind, useGet, AuthState, Id, Model, ModelStatic, ModelSetupContext, ServiceState, FeathersVuexGlobalModels, FeathersVuexStoreState };
