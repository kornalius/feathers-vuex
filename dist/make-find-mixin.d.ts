export default function makeFindMixin(options: any): {
    created(): any;
    data(): {
        [x: string]: any;
    };
    computed: {
        [x: string]: () => any;
        [x: number]: () => any;
    };
    methods: {
        [x: string]: ((params: any) => any) | ((params?: {}) => {
            queryInfo: any;
            pageInfo: any;
        });
        getPaginationForQuery(params?: {}): {
            queryInfo: any;
            pageInfo: any;
        };
    };
};
