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
        [x: string]: (id: any, params: any) => any;
    };
};
