declare const _default: {
    props: {
        /**
         * The path of the service from which to pull records.
         */
        service: {
            type: StringConstructor;
            required: boolean;
        };
        /**
         * Must match the `serverAlias` that was provided in the service's configuration.
         */
        serverAlias: {
            type: StringConstructor;
            default: string;
        };
        /**
         * By default, `query` is used to get data from the Vuex store AND the API request.
         * If you specify a `fetchQuery`, then `query` will only be used for the Vuex store.
         */
        query: {
            type: ObjectConstructor;
            default: any;
        };
        /**
         * If a separate query is desired to fetch data, use fetchQuery
         * The watchers are automatically updated, so you don't have to write 'fetchQuery.propName'
         */
        fetchQuery: {
            type: ObjectConstructor;
        };
        /**
         * Can be used in place of the `query` prop to provide more params. Only params.query is
         * passed to the getter.
         */
        params: {
            type: ObjectConstructor;
            default: any;
        };
        /**
         * Can be used in place of the `fetchQuery` prop to provide more params. Only params.query is
         * passed to the getter.
         */
        fetchParams: {
            type: ObjectConstructor;
            default: any;
        };
        /**
         * When `queryWhen` evaluates to false, no API request will be made.
         */
        queryWhen: {
            type: (FunctionConstructor | BooleanConstructor)[];
            default: boolean;
        };
        id: {
            type: (StringConstructor | NumberConstructor)[];
            default: any;
        };
        /**
         * Specify which properties in the query to watch and re-trigger API requests.
         */
        watch: {
            type: (StringConstructor | ArrayConstructor)[];
            default(): any[];
        };
        /**
         * Set `local` to true to only requests from the Vuex data store and not make API requests.
         */
        local: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * This function is called by the getter and allows you to intercept the `item` in the
         * response to pass it into the parent component's scope.  It's a dirty little cheater
         * function (because it's called from a getter), but it actually works well  ;)
         */
        editScope: {
            type: FunctionConstructor;
            default(scope: any): any;
        };
    };
    data: () => {
        isFindPending: boolean;
        isGetPending: boolean;
    };
    computed: {
        item(): any;
        scope(): any;
    };
    methods: {
        getArgs(queryToUse: any): any[];
        getData(): any;
        fetchData(): any;
    };
    created(): void;
    render(): any;
};
export default _default;
