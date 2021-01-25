import SofaConnection from './connection';
import {generateUUID} from './uuid';

export class Model {
    collection: Collection;
    collectionName: string;
    scope = '_default';

    constructor(name: string, scope?: string) {
        this.collection = SofaConnection.Instance.getCollection();
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
    public async create<T>(data: T): Promise<T> {
        const id = generateUUID();
        const createdData = {
            id,
            createdAt: new Date(),
            ...data,
        };

        try {
            await this.collection.upsert(id, createdData);
            return createdData;
        } catch (error) {
            throw error;
        }
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
