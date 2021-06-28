export default function makeAuthActions(feathersClient: any): {
    authenticate(store: any, dataOrArray: any): any;
    responseHandler({ commit, state, dispatch }: {
        commit: any;
        state: any;
        dispatch: any;
    }, response: any): any;
    populateUser({ commit, state, dispatch }: {
        commit: any;
        state: any;
        dispatch: any;
    }, userId: any): any;
    logout({ commit }: {
        commit: any;
    }): any;
};
