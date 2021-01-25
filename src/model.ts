import SofaConnection from './connection';

export class Model {
    collection: Collection;
    collectionName: string;
    scope = '_default';

    constructor(name: string, scope?: string) {
        this.collection = SofaConnection.Instance.getCollection(name);
        this.collectionName = name;
        if (scope) {
            this.scope = scope;
        }
    }

    /** Get this collection
     * getCollection
     */
    public getCollection(): Collection {
        return this.collection;
    }

    /**
     * create
     */
    public create(data: any, key?: string) {
        return this.collection.upsert(key, data);
    }

    /**
     * findById
     */
    public findById(id: string): Promise<GetResult> {
        return this.collection.get(id);
    }

    /**
     * update
     */
    public updateById(id: string, data: any) {
        return this.collection.replace(id, data);
    }
}
