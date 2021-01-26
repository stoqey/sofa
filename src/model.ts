import SofaConnection from './connection';
import {generateUUID} from './uuid';

interface CommonTypes {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    deleted?: Date;
    _type: string; // type for models/collections
    _scope: string; // scope for collections
}

export class Model {
    collection: Collection;
    collectionName: string;
    scope = '_default';

    constructor(name: string, scope?: string) {
        // this.collection = SofaConnection.Instance.getCollection();
        this.collectionName = name;
        if (scope) {
            this.scope = scope;
        }
    }

    /**
     * Refresh and get default collection from sofa
     * to avoid error `Cannot read property 'defaultCollection' of null`
     */
    public fresh(): void {
        this.collection = SofaConnection.Instance.getCollection();
    }

    /** Get this collection
     * getCollection
     */
    public getCollection(): Collection {
        this.fresh();
        return this.collection;
    }

    /**
     * create
     */
    public async create<T>(data: T): Promise<T & CommonTypes> {
        this.fresh();
        const id = generateUUID();
        const createdData = {
            id,
            createdAt: new Date(),
            _type: this.collectionName,
            _scope: this.scope,
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
    public async findById(id: string): Promise<any & CommonTypes> {
        this.fresh();
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
        this.fresh();
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

    public async delete(id: string): Promise<boolean> {
        this.fresh();
        try {
            await this.collection.remove(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // TODO
    // findMany a.k.a find
    // pagination
}

export default Model;
