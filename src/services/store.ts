const { Store } = window;

class StoreModel<T extends string | number | object> {
    readonly key: string;
    constructor(key: string) {
        this.key = key;
    }
    public get() { return Store.get(this.key) as T | undefined; }
    public set(payload: T) { Store.set(this.key, payload); }
    public clear() { Store.delete(this.key); }
}

// export const SomeStore = new StoreModel<SomeType>('<STORE-KEY>');