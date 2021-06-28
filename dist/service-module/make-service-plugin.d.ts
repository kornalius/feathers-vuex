import { FeathersVuexOptions, MakeServicePluginOptions } from './types';
/**
 * prepare only wraps the makeServicePlugin to provide the globalOptions.
 * @param globalOptions
 */
export default function prepareMakeServicePlugin(globalOptions: FeathersVuexOptions): (config: MakeServicePluginOptions) => (store: any) => void;
