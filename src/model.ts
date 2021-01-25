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

    /**
     * create
     */
    public create() {}

    /**
     * save
     */
    public save() {}

    /**
     * findById
     */
    public findById() {}

    /**
     * findMany
     */
    public findMany() {}

    /**
     * update
     */
    public update() {}
}
