export interface ServiceEventsDebouncedQueue {
    addOrUpdateById: {};
    removeItemById: {};
    enqueueAddOrUpdate(item: any): void;
    enqueueRemoval(item: any): void;
    flushAddOrUpdateQueue(): void;
    flushRemoveItemQueue(): void;
}
export default function enableServiceEvents({ service, Model, store, options }: {
    service: any;
    Model: any;
    store: any;
    options: any;
}): ServiceEventsDebouncedQueue;
