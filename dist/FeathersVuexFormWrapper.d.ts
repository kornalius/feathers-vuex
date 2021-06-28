declare const _default: {
    name: string;
    model: {
        prop: string;
        event: string;
    };
    props: {
        item: {
            type: ObjectConstructor;
            required: boolean;
        };
        /**
         * By default, when you call the `save` method, the cloned data will be
         * committed to the store BEFORE saving tot he API server. Set
         * `:eager="false"` to only update the store with the API server response.
         */
        eager: {
            type: BooleanConstructor;
            default: boolean;
        };
        watch: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data: () => {
        clone: any;
        isDirty: boolean;
    };
    computed: {
        isNew(): any;
    };
    watch: {
        item: {
            handler: string;
            immediate: boolean;
            deep: boolean;
        };
    };
    methods: {
        setup(): void;
        save(params: any): any;
        reset(): void;
        remove(): Promise<any>;
        markAsDirty(): void;
    };
    render(): any;
};
export default _default;
