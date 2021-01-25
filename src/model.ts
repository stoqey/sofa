import SofaConnection from './connection';
import {generateUUID} from './uuid';

interface CommonTypes {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    deleted?: Date;
}

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
    public async findById(id: string): Promise<any> {
        try {
            const data = await this.collection.get(id);
            return data.content;
        } catch (error) {
            throw error;
        }
    }

    /**
     * update
     */
    public async updateById<T>(id: string, data: T): Promise<T> {
        const updatedDocument = {
            id,
            updatedAt: new Date(),
            ...data,
        };

        try {
            await this.collection.replace(id, updatedDocument);
            return updatedDocument;
        } catch (error) {
            throw error;
        }
    }
}

export default Model;
