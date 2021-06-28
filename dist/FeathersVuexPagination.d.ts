declare const _default: {
    name: string;
    props: {
        /**
         * An object containing { $limit, and $skip }
         */
        value: {
            type: ObjectConstructor;
            default: () => any;
        };
        /**
         * The `latestQuery` object from the useFind data
         */
        latestQuery: {
            type: ObjectConstructor;
            default: () => any;
        };
    };
    setup(props: any, context: any): () => any;
};
export default _default;
