/* eslint-disable @typescript-eslint/ban-ts-comment */
import couchbase from 'couchbase';

export interface SofaArgs {
    connectionString: string;
    bucketName: string;
    username: string;
    password: string;
}

export class SofaConnection implements SofaArgs {
    private static _instance: SofaConnection;

    bucket: Bucket = null;
    cluster: Cluster = null;

    // Args
    connectionString: string;
    bucketName: string;
    username: string;
    password: string;

    public static get Instance(): SofaConnection {
        return this._instance || (this._instance = new this());
    }

    private constructor() {}

    /**
     * start
     */
    public async init(args: SofaArgs): Promise<SofaConnection> {
        const {connectionString, password, username, bucketName = 'default'} = args;

        this.connectionString = connectionString;
        this.bucketName = bucketName;
        this.username = username;
        this.password = password;

        this.cluster = await couchbase.connect(connectionString, {
            username,
            password,
        });
        this.bucket = this.cluster.bucket(bucketName);

        return this;
    }

    /**
     * getCollection
     */
    public getCollection(): Collection {
        return this.bucket.defaultCollection();
    }

    /**
     * shutdown cluster
     */
    public shutdown(): void {
        return this.cluster.close();
    }
}

export default SofaConnection;
