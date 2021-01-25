import SofaConnection from './connection';
import {generateUUID} from './uuid';

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

    /**
     * getId
     */
    // public getId() {
    //     return `${metadata.scopeName}--${metadata.collectionName}::${id}`;
    // }

    /** Get this collection
     * getCollection
     */
    public getCollection(): Collection {
        return this.collection;
    }

    /**
     * create
     */
    public create(data: any): Promise<MutationResult> {
        const id = generateUUID();
        return this.collection.upsert(id, data);
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
    public updateById(id: string, data: any): Promise<MutationResult> {
        return this.collection.replace(id, data);
    }
}

export default Model;
