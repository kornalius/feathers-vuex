declare const _default: {
    name: string;
    props: {
        item: {
            type: ObjectConstructor;
            required: boolean;
        };
        prop: {
            type: StringConstructor;
            required: boolean;
        };
        debounce: {
            type: NumberConstructor;
            default: number;
        };
    };
    data: () => {
        clone: any;
    };
    computed: {
        current(): any;
    };
    watch: {
        debounce: {
            handler(wait: any): void;
            immediate: boolean;
        };
    };
    methods: {
        createClone(e: any): void;
        cleanup(): void;
        handler(e: any, callback: any): void;
    };
    render(): any;
};
export default _default;
