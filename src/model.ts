import SofaConnection from './connection';
import {Pagination} from './pagination';
import {generateUUID} from './uuid';

export interface AutoModelFields {
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
     * Refresh and get default collection from SofaConnection
     * Because SofaConnection is a singleton, sometimes it might be undefined depending when model was created
     * So we have to call it from all model methods
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
    public async create<T>(data: T): Promise<T & AutoModelFields> {
        this.fresh();
        const id = generateUUID();
        const createdData = {
            ...data,
            id,
            createdAt: new Date(),
            _type: this.collectionName,
            _scope: this.scope,
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
    public async findById(id: string): Promise<any & AutoModelFields> {
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
            ...data,
            id,
            updatedAt: new Date(),
        };

        try {
            await this.collection.replace(id, updatedDocument);
            return updatedDocument;
        } catch (error) {
            throw error;
        }
    }

    /**
     * save
     */
    public async save<T>(data: T & {id: string}): Promise<T> {
        this.fresh();

        const id = data && data.id;

        const updatedDocument = {
            ...data,
            updatedAt: new Date(),
        };

        try {
            if (!id) {
                throw new Error('document must have id');
            }
            await this.collection.replace(id, updatedDocument);
            return updatedDocument;
        } catch (error) {
            console.error(error);
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

    /**
     * Pagination
     *  
        select = ['id', 'createdAt']
        where = {
         where: { owner: { $eq: "stoqey" }, _type: { $eq: "Trade" } },
        },
        page = 0,
        limit = 10,
        orderBy = { createdAt: "DESC" },
    * @param args PaginationArgs
    */
    public async pagination({
        select,
        where,
        orderBy,
        limit,
        page,
        customQuery = {},
    }: {
        select?: any[] | string;
        where?: any;
        orderBy?: any;
        limit?: number;
        page?: number;
        customQuery?: any; // can be $and or any other valid quries
    }): Promise<any[]> {
        // Where begins here
        let whereEx = {_type: {$eq: this.collectionName}};

        if (where) {
            whereEx = {
                ...whereEx,
                ...where,
            };
        }

        const bucketName = SofaConnection.Instance.bucketName;

        return Pagination({
            bucketName,
            select,
            where: {where: whereEx, ...customQuery},
            limit,
            page,
            orderBy,
        });
    }
}

export default Model;
