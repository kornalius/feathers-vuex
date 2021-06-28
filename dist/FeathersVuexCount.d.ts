declare const _default: {
    props: {
        service: {
            type: StringConstructor;
            required: boolean;
        };
        params: {
            type: ObjectConstructor;
            default: () => {
                query: {};
            };
        };
        queryWhen: {
            type: (FunctionConstructor | BooleanConstructor)[];
            default: boolean;
        };
        fetchParams: {
            type: ObjectConstructor;
        };
        watch: {
            type: (StringConstructor | ArrayConstructor)[];
            default: () => any[];
        };
        local: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data: () => {
        isCountPending: boolean;
        serverTotal: any;
    };
    computed: {
        total(): any;
        scope(): {
            total: any;
            isCountPending: any;
        };
    };
    methods: {
        findData(): any;
        fetchData(): any;
    };
    created(): void;
    render(): any;
};
export default _default;
