/**
 * A global object that holds references to all Model Classes in the application.
 */
export declare const clients: {
    [k: string]: any;
};
/**
 * prepareAddModel wraps options in a closure around addModel
 * @param options
 */
export declare function addClient({ client, serverAlias }: {
    client: any;
    serverAlias: any;
}): void;
export declare function clearClients(): void;
