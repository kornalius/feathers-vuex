import { Service } from '@feathersjs/feathers';
import { MakeServicePluginOptions } from './types';
interface serviceAndOptions {
    service: Service<any>;
    options: MakeServicePluginOptions;
}
export default function makeServiceActions({ service, options }: serviceAndOptions): {
    count({ dispatch }: {
        dispatch: any;
    }, params: any): any;
    /**
     * Handle the response from the find action.
     *
     * @param payload consists of the following two params
     *   @param params - Remember that these params aren't what was sent to the
     *         Feathers client.  The client modifies the params object.
     *   @param response
     */
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
    /**
     * Adds or updates an item. If a matching temp record is found in the store,
     * the temp record will completely replace the existingItem. This is to work
     * around the common scenario where the realtime `created` event arrives before
     * the `create` response returns to create the record. The reference to the
     * original temporary record must be maintained in order to preserve reactivity.
     */
    addOrUpdate({ state, commit }: {
        state: any;
        commit: any;
    }, item: any): any;
};
export {};
