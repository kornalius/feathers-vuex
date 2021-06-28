declare const _default: {
    props: {
        service: {
            type: StringConstructor;
            required: boolean;
        };
        query: {
            type: ObjectConstructor;
            default: any;
        };
        queryWhen: {
            type: (FunctionConstructor | BooleanConstructor)[];
            default: boolean;
        };
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
        watch: {
            type: (StringConstructor | ArrayConstructor)[];
            default(): any[];
        };
        local: {
            type: BooleanConstructor;
            default: boolean;
        };
        editScope: {
            type: FunctionConstructor;
            default(scope: any): any;
        };
        qid: {
            type: StringConstructor;
            default(): string;
        };
        /**
         * Set `temps` to true to include temporary records from the store.
         */
        temps: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data: () => {
        isFindPending: boolean;
        queryId: any;
        pageId: any;
    };
    computed: {
        items(): any;
        pagination(): any;
        queryInfo(): any;
        pageInfo(): any;
        scope(): any;
    };
    methods: {
        findData(): any;
        fetchData(): any;
    };
    created(): void;
    render(): any;
};
export default _default;
