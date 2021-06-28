import { FeathersVuexOptions } from './types';
/**
 * A global object that holds references to all Model Classes in the application.
 */
export declare const globalModels: {
    [k: string]: any;
};
/**
 * prepareAddModel wraps options in a closure around addModel
 * @param options
 */
export declare function prepareAddModel(options: FeathersVuexOptions): (Model: any) => void;
export declare function clearModels(): void;
