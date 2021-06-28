import { GlobalModels } from '../service-module/types';
declare module 'vue/types/vue' {
    interface VueConstructor {
        $FeathersVuex: GlobalModels;
    }
    interface Vue {
        $FeathersVuex: GlobalModels;
    }
}
export declare const FeathersVuex: {
    install(Vue: any, options?: {
        components: boolean;
    }): void;
};
