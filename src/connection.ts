/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as couchbase from 'couchbase';

interface SofaArgs {
    connectionString: string;
    bucketName: string;
    username: string;
    password: string;
}

class SofaConnection implements SofaArgs {
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
    public init(args: SofaArgs): {bucket: Bucket; cluster: Cluster} {
        const {connectionString, password, username, bucketName = 'default'} = args;

        this.connectionString = connectionString;
        this.bucketName = bucketName;
        this.username = username;
        this.password = password;

        // @ts-ignore
        this.cluster = new couchbase.Cluster(connectionString, {
            username,
            password,
        });
        this.bucket = this.cluster.bucket(bucketName);

        return this;
    }

    /**
     * getCollection
     */
    public getCollection(collectionName?: string): Collection {
        return collectionName
            ? this.bucket.collection(collectionName)
            : this.bucket.defaultCollection();
    }

    /**
     * start
     */
    public async start(): Promise<boolean> {
        // Create a N1QL Primary Index (but ignore if it exists)
        try {
            await this.cluster
                .queryIndexes()
                .createPrimaryIndex(this.bucketName, {ignoreIfExists: true});

            return true;
        } catch (e) {
            throw e;
        }
    }
}

export default SofaConnection;
