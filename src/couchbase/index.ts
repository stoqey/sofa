/**
 * <p>AnalyticsIndexManager provides an interface for performing management
 * operations against the analytics indexes for the cluster.</p>
 */
export declare class AnalyticsIndexManager {
    createDataverse(
        dataverseName: string,
        options?: {
            ignoreIfExists?: boolean;
            timeout?: number;
        },
        callback?: CreateDataverseCallback
    ): Promise<boolean>;
    dropDataverse(
        dataverseName: string,
        options?: {
            ignoreIfNotExists?: boolean;
            timeout?: number;
        },
        callback?: DropDataverseCallback
    ): Promise<boolean>;
    createDataset(
        datasetName: string,
        options?: {
            ignoreIfExists?: boolean;
            dataverseName?: string;
            condition?: string;
            timeout?: number;
        },
        callback?: CreateDatasetCallback
    ): Promise<boolean>;
    dropDataset(
        datasetName: string,
        options?: {
            ignoreIfNotExists?: boolean;
            dataverseName?: string;
            timeout?: number;
        },
        callback?: DropDatasetCallback
    ): Promise<boolean>;
    getAllDatasets(
        options?: {
            timeout?: number;
        },
        callback?: GetAllDatasetsCallback
    ): Promise<AnalyticsDataset[]>;
    createIndex(
        datasetName: string,
        indexName: string,
        fields: string[],
        options?: {
            dataverseName?: string;
            ignoreIfExists?: boolean;
            timeout?: number;
        },
        callback?: CreateAnalyticsIndexCallback
    ): Promise<boolean>;
    dropIndex(
        datasetName: string,
        indexName: string,
        options?: {
            dataverseName?: string;
            ignoreIfNotExists?: boolean;
            timeout?: number;
        },
        callback?: DropAnalyticsIndexCallback
    ): Promise<boolean>;
    getAllIndexes(
        options?: {
            timeout?: number;
        },
        callback?: GetAllAnalyticsIndexesCallback
    ): Promise<AnalyticsIndex[]>;
    connectLink(
        linkName: string,
        options?: {
            timeout?: number;
        },
        callback?: ConnectLinkCallback
    ): Promise<boolean>;
    disconnectLink(
        linkName: string,
        options?: {
            timeout?: number;
        },
        callback?: DisconnectLinkCallback
    ): Promise<boolean>;
    getPendingMutations(
        options?: {
            timeout?: number;
        },
        callback?: GetPendingMutationsCallback
    ): Promise<{
        [key: string]: number;
    }>;
}

export declare type CreateDataverseCallback = (err: Error, success: boolean) => void;

export declare type DropDataverseCallback = (err: Error, success: boolean) => void;

export declare type CreateDatasetCallback = (err: Error, success: boolean) => void;

export declare type DropDatasetCallback = (err: Error, success: boolean) => void;

export declare type AnalyticsDataset = {
    name: string;
    dataverseName: string;
    linkName: string;
    bucketName: string;
};

export declare type GetAllDatasetsCallback = (err: Error, datasets: AnalyticsDataset[]) => void;

export declare type CreateAnalyticsIndexCallback = (err: Error, success: boolean) => void;

export declare type DropAnalyticsIndexCallback = (err: Error, success: boolean) => void;

export declare type AnalyticsIndex = {
    name: string;
    datasetName: string;
    dataverseName: string;
    isPrimary: boolean;
};

export declare type GetAllAnalyticsIndexesCallback = (
    err: Error,
    indexes: AnalyticsIndex[]
) => void;

export declare type ConnectLinkCallback = (err: Error, success: boolean) => void;

export declare type DisconnectLinkCallback = (err: Error, success: boolean) => void;

export declare type GetPendingMutationsCallback = (
    err: Error,
    pendingMutations: {
        [key: string]: number;
    }
) => void;

/**
 * <p>BinaryCollection provides various binary operations which
 * are available to be performed against a collection.</p>
 */
export declare class BinaryCollection {
    increment(
        key: string,
        value: number,
        options?: {
            timeout?: number;
        },
        callback?: IncrementCallback
    ): Promise<IncrementResult>;
    decrement(
        key: string,
        value: number,
        options?: {
            timeout?: number;
        },
        callback?: DecrementCallback
    ): Promise<DecrementResult>;
    append(
        key: string,
        value: Buffer,
        options?: {
            timeout?: number;
        },
        callback?: AppendCallback
    ): Promise<AppendResult>;
    prepend(
        key: string,
        value: Buffer,
        options?: {
            timeout?: number;
        },
        callback?: PrependCallback
    ): Promise<PrependResult>;
}

export declare type IncrementResult = {
    value: number;
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type IncrementCallback = (err: Error, res: IncrementResult) => void;

export declare type DecrementResult = {
    value: number;
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type DecrementCallback = (err: Error, res: DecrementResult) => void;

export declare type AppendResult = {
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type AppendCallback = (err: Error, res: AppendResult) => void;

export declare type PrependResult = {
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type PrependCallback = (err: Error, res: PrependResult) => void;

export declare type Cas = any;

export declare type MutationToken = any;

/**
 * <p>Bucket represents a storage grouping of data within a Couchbase Server cluster.</p>
 */
export declare class Bucket {
    /**
     * <p>Ping returns information from pinging the connections for this bucket.</p>
     */
    ping(
        options?: {
            reportId?: string;
            serviceTypes?: ServiceType[];
            timeout?: number;
        },
        callback?: PingCallback
    ): Promise<PingResult>;
    /**
     * @param designDoc - <p>The design document containing the view to query</p>
     * @param viewName - <p>The name of the view to query</p>
     */
    viewQuery(
        designDoc: string,
        viewName: string,
        options?: {
            scanConsistency?: ViewScanConsistency;
            skip?: number;
            limit?: number;
            order?: ViewOrdering;
            reduce?: string;
            group?: boolean;
            groupLevel?: number;
            key?: string;
            keys?: string[];
            range?: {
                start?: string | string[];
                end?: string | string[];
                inclusiveEnd?: boolean;
            };
            idRange?: {
                start?: string;
                end?: string;
            };
            fullSet?: boolean;
            onError?: ViewErrorMode;
            timeout?: number;
        },
        callback?: ViewQueryCallback
    ): Promise<ViewQueryResult>;
    /**
     * <p>Gets a reference to a specific scope.</p>
     */
    scope(scopeName: string): Scope;
    /**
     * <p>Gets a reference to the default scope.</p>
     */
    defaultScope(): Scope;
    /**
     * <p>Gets a reference to a specific collection.</p>
     */
    collection(collectionName: string): Collection;
    /**
     * <p>Gets a reference to the default collection.</p>
     */
    defaultCollection(): Collection;
    /**
     * <p>Gets a view index manager for this bucket</p>
     */
    viewIndexes(): ViewIndexManager;
    /**
     * <p>Gets a collection manager for this bucket</p>
     */
    collections(): CollectionManager;
    /**
     * <p>Returns the name of this bucket.</p>
     */
    name: string;
}

export declare type ViewQueryResult = {
    rows: object[];
    meta: any;
};

export declare type ViewQueryCallback = (err: Error, res: ViewQueryResult) => void;

/**
 * <p>BucketManager provides an interface for adding/removing/updating
 * buckets within the cluster.</p>
 */
export declare class BucketManager {
    createBucket(
        settings: CreateBucketSettings,
        options?: {
            timeout?: number;
        },
        callback?: CreateBucketCallback
    ): Promise<boolean>;
    updateBucket(
        settings: BucketSettings,
        options?: {
            timeout?: number;
        },
        callback?: UpdateBucketCallback
    ): Promise<boolean>;
    dropBucket(
        bucketName: string,
        options?: {
            timeout?: number;
        },
        callback?: DropBucketCallback
    ): Promise<boolean>;
    getBucket(
        bucketName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetBucketCallback
    ): Promise<BucketSettings>;
    getAllBuckets(
        bucketName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetAllBucketsCallback
    ): Promise<BucketSettings[]>;
    flushBucket(
        bucketName: string,
        options?: {
            timeout?: number;
        },
        callback?: FlushBucketCallback
    ): Promise<boolean>;
}

/**
 * <p>BucketSettings provides information about a specific bucket.</p>
 */
export declare type BucketSettings = {
    name: string;
    flushEnabled: boolean;
    ramQuotaMB: number;
    numReplicas: number;
    replicaIndexes: boolean;
    bucketType: BucketType;
    ejectionMethod: EvictionPolicy;
    maxTTL: number;
    compressionMode: CompressionMode;
    minimumDurabilityLevel: DurabilityLevel;
};

/**
 * <p>CreateBucketSettings provides information for creating a bucket.</p>
 */
export declare type CreateBucketSettings = {
    conflictResolutionType: ConflictResolutionType;
};

export declare type CreateBucketCallback = (err: Error, res: boolean) => void;

export declare type UpdateBucketCallback = (err: Error, res: boolean) => void;

export declare type DropBucketCallback = (err: Error, res: boolean) => void;

export declare type GetBucketCallback = (err: Error, res: BucketSettings) => void;

export declare type GetAllBucketsCallback = (err: Error, res: BucketSettings[]) => void;

export declare type FlushBucketCallback = (err: Error, res: boolean) => void;

/**
 * <p>CertificateAuthenticator provides an authenticator implementation
 * which uses TLS Certificate Authentication.</p>
 */
export declare class CertificateAuthenticator {
    constructor(certificatePath: string, keyPath: string);
}

/**
 * <p>Cluster represents an entire Couchbase Server cluster.</p>
 */
export declare class Cluster {
    /**
     * <p>Connect establishes a connection to the cluster and is the entry
     * point for all SDK operations.</p>
     */
    static connect(
        connStr: string,
        options?: {
            username?: string;
            password?: string;
            authenticator?: string;
            trustStorePath?: string;
            kvTimeout?: number;
            kvDurableTimeout?: number;
            viewTimeout?: number;
            queryTimeout?: number;
            analyticsTimeout?: number;
            searchTimeout?: number;
            managementTimeout?: number;
            transcoder?: Transcoder;
            logFunc?: LoggingCallback;
        },
        callback?: ConnectCallback
    ): Promise<Cluster>;
    /**
     * <p>Diagnostics returns stateful data about the current SDK connections.</p>
     */
    diagnostics(
        options?: {
            reportId?: string;
        },
        callback?: DiagnosticsCallback
    ): Promise<DiagnosticsResult>;
    /**
     * <p>Ping returns information from pinging the connections for this cluster.</p>
     */
    ping(
        options?: {
            reportId?: string;
            serviceTypes?: ServiceType[];
            timeout?: number;
        },
        callback?: PingCallback
    ): Promise<PingResult>;
    /**
     * @param query - <p>The query string to execute.</p>
     * @param [options.parameters] - <p>parameters specifies a list of values to substitute within the query
     * statement during execution.</p>
     * @param [options.scanConsistency] - <p>scanConsistency specifies the level of consistency that is required for
     * the results of the query.</p>
     * @param [options.consistentWith] - <p>consistentWith specifies a MutationState object to use when determining
     * the level of consistency needed for the results of the query.</p>
     * @param [options.adhoc] - <p>adhoc specifies that the query is an adhoc query and should not be
     * prepared and cached within the SDK.</p>
     * @param [options.flexIndex] - <p>flexIndex specifies to enable the use of FTS indexes when selecting
     * indexes to use for the query.</p>
     * @param [options.clientContextId] - <p>clientContextId specifies a unique identifier for the execution of this
     * query to enable various tools to correlate the query.</p>
     * @param [options.readOnly] - <p>readOnly specifies that query should not be permitted to mutate any data.
     * This option also enables a few minor performance improvements and the
     * ability to automatically retry the query on failure.</p>
     * @param [options.profile] - <p>profile enables the return of profiling data from the server.</p>
     * @param [options.metrics] - <p>metrics enables the return of metrics data from the server</p>
     * @param [options.raw] - <p>raw specifies an object represent raw key value pairs that should be
     * included with the query.</p>
     * @param [options.timeout] - <p>timeout specifies the number of ms to wait for completion before
     * cancelling the operation and returning control to the application.</p>
     */
    query(
        query: string,
        options?: {
            parameters?: any | any[];
            scanConsistency?: QueryScanConsistency;
            consistentWith?: MutationState;
            adhoc?: boolean;
            flexIndex?: boolean;
            clientContextId?: string;
            maxParallelism?: number;
            pipelineBatch?: number;
            pipelineCap?: number;
            scanWait?: number;
            scanCap?: number;
            readOnly?: boolean;
            profile?: QueryProfileMode;
            metrics?: boolean;
            raw?: any;
            timeout?: number;
        },
        callback?: QueryCallback
    ): Promise<QueryResult>;
    /**
     * @param query - <p>The query string to execute.</p>
     * @param [options.parameters] - <p>parameters specifies a list of values to substitute within the query
     * statement during execution.</p>
     * @param [options.scanConsistency] - <p>scanConsistency specifies the level of consistency that is required for
     * the results of the query.</p>
     * @param [options.clientContextId] - <p>clientContextId specifies a unique identifier for the execution of this
     * query to enable various tools to correlate the query.</p>
     * @param [options.priority] - <p>priority specifies that this query should be executed with a higher
     * priority than others, causing it to receive extra resources.</p>
     * @param [options.readOnly] - <p>readOnly specifies that query should not be permitted to mutate any data.
     * This option also enables a few minor performance improvements and the
     * ability to automatically retry the query on failure.</p>
     * @param [options.raw] - <p>raw specifies an object represent raw key value pairs that should be
     * included with the query.</p>
     * @param [options.timeout] - <p>timeout specifies the number of ms to wait for completion before
     * cancelling the operation and returning control to the application.</p>
     */
    analyticsQuery(
        query: string,
        options?: {
            parameters?: any | any[];
            scanConsistency?: AnalyticsScanConsistency;
            clientContextId?: string;
            priority?: boolean;
            readOnly?: boolean;
            raw?: any;
            timeout?: number;
        },
        callback?: AnalyticsQueryCallback
    ): Promise<AnalyticsResult>;
    /**
     * @param indexName - <p>The name of the index to execute the query against.</p>
     * @param query - <p>The search query object describing the requested search.</p>
     */
    searchQuery(
        indexName: string,
        query: SearchQuery,
        options?: {
            skip?: number;
            limit?: number;
            explain?: boolean;
            highlight?: {
                style?: HighlightStyle;
                fields?: string[];
            };
            fields?: string[];
            facets?: SearchFacet[];
            sort?: SearchSort;
            disableScoring?: boolean;
            consistency?: SearchScanConsistency;
            consistentWith?: MutationState;
            timeout?: number;
        },
        callback?: SearchQueryCallback
    ): Promise<SearchQueryResult>;
    /**
     * <p>Gets a reference to a bucket.</p>
     */
    bucket(bucketName: string): Bucket;
    /**
     * <p>Closes all connections associated with this cluster.  Any
     * running operations will be cancelled.  Further operations
     * will cause new connections to be established.</p>
     */
    close(): void;
    /**
     * <p>Gets a user manager for this cluster</p>
     */
    users(): UserManager;
    /**
     * <p>Gets a bucket manager for this cluster</p>
     */
    buckets(): BucketManager;
    /**
     * <p>Gets a query index manager for this cluster</p>
     */
    queryIndexes(): QueryIndexManager;
    /**
     * <p>Gets an analytics index manager for this cluster</p>
     */
    analyticsIndexes(): AnalyticsIndexManager;
    /**
     * <p>Gets a search index manager for this cluster</p>
     */
    searchIndexes(): SearchIndexManager;
}

export declare type ConnectCallback = (err: Error, cluster: Cluster) => void;

/**
 * <p>Contains the results from a previously executed Diagnostics operation.</p>
 */
export declare type DiagnosticsResult = {
    id: string;
    version: number;
    sdk: string;
    services: any;
};

export declare type DiagnosticsCallback = (err: Error, res: DiagnosticsResult) => void;

/**
 * <p>Contains the results from a previously executed Diagnostics operation.</p>
 */
export declare type PingResult = {
    id: string;
    version: number;
    sdk: string;
    services: any;
};

export declare type PingCallback = (err: Error, res: PingResult) => void;

export declare type QueryResult = {
    rows: object[];
    meta: any;
};

export declare type QueryCallback = (err: Error, res: QueryResult) => void;

export declare type AnalyticsResult = {
    rows: object[];
    meta: any;
};

export declare type AnalyticsQueryCallback = (err: Error, res: AnalyticsResult) => void;

export declare type SearchQueryResult = {
    rows: object[];
    meta: any;
};

export declare type SearchQueryCallback = (err: Error, res: SearchQueryResult) => void;

/**
 * <p>Collection provides an interface for performing operations against
 * a collection within the cluster.</p>
 */
export declare class Collection {
    get(
        key: string,
        options?: {
            project?: string[];
            withExpiry?: boolean;
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: GetCallback
    ): Promise<GetResult>;
    exists(
        key: string,
        options?: {
            timeout?: number;
        },
        callback?: ExistsCallback
    ): Promise<ExistsResult>;
    getAnyReplica(
        key: string,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: GetAnyReplicaCallback
    ): Promise<GetReplicaResult>;
    getAllReplicas(
        key: string,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: GetAllReplicasCallback
    ): Promise<GetReplicaResult[]>;
    insert(
        key: string,
        value: any,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: MutateCallback
    ): Promise<MutationResult>;
    upsert(
        key: string,
        value: any,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: MutateCallback
    ): Promise<MutationResult>;
    replace(
        key: string,
        value: any,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
            cas?: Cas;
        },
        callback?: MutateCallback
    ): Promise<MutationResult>;
    remove(
        key: string,
        options?: {
            timeout?: number;
        },
        callback?: RemoveCallback
    ): Promise<RemoveResult>;
    getAndTouch(
        key: string,
        expiry: number,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: GetAndTouchCallback
    ): Promise<GetAndTouchResult>;
    touch(
        key: string,
        expiry: number,
        options?: {
            timeout?: number;
        },
        callback?: TouchCallback
    ): Promise<TouchResult>;
    getAndLock(
        key: string,
        lockTime: number,
        options?: {
            transcoder?: Transcoder;
            timeout?: number;
        },
        callback?: GetAndLockCallback
    ): Promise<GetAndLockCallback>;
    unlock(
        key: string,
        cas: Cas,
        options?: {
            timeout?: number;
        },
        callback?: UnlockCallback
    ): Promise<UnlockResult>;
    lookupIn(
        key: string,
        spec: LookupInSpec[],
        options?: {
            timeout?: number;
        },
        callback?: LookupInCallback
    ): Promise<LookupInResult>;
    mutateIn(
        key: string,
        spec: MutateInSpec,
        options?: {
            cas?: Cas;
            timeout?: number;
        },
        callback?: MutateInCallback
    ): Promise<MutateInResult>;
    list(key: string): CouchbaseList;
    queue(key: string): CouchbaseQueue;
    map(key: string): CouchbaseMap;
    set(key: string): CouchbaseSet;
    binary(): BinaryCollection;
}

/**
 * <p>Contains the results from a previously execute Get operation.</p>
 */
export declare type GetResult = {
    content: any;
    cas: Cas;
    expiry?: number;
};

export declare type GetCallback = (err: Error, res: GetResult) => void;

/**
 * <p>Contains the results from a previously execute Get operation.</p>
 */
export declare type ExistsResult = {
    exists: boolean;
    cas: Cas;
};

export declare type ExistsCallback = (err: Error, res: ExistsResult) => void;

/**
 * <p>Contains the results from a previously executed replica get operation.</p>
 */
export declare type GetReplicaResult = {
    value: any;
    cas: Cas;
    isReplica: boolean;
};

export declare type GetAnyReplicaCallback = (err: Error, res: GetReplicaResult) => void;

export declare type GetAllReplicasCallback = (err: Error, res: GetReplicaResult[]) => void;

/**
 * <p>Contains the results from a previously executed mutation operation.</p>
 */
export declare type MutationResult = {
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type MutateCallback = (err: Error, res: MutationResult) => void;

export declare type RemoveResult = {
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type RemoveCallback = (err: Error, res: RemoveResult) => void;

export declare type GetAndTouchResult = {
    content: any;
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type GetAndTouchCallback = (err: Error, res: GetAndTouchResult) => void;

export declare type TouchResult = {
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type TouchCallback = (err: Error, res: TouchResult) => void;

export declare type GetAndLockResult = {
    content: any;
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type GetAndLockCallback = (err: Error, res: GetAndLockResult[]) => void;

export declare type UnlockResult = {
    content: any;
    cas: Cas;
    mutationToken?: MutationToken;
};

export declare type UnlockCallback = (err: Error, res: UnlockResult) => void;

export declare type LookupInResult = {
    content: any;
    cas: Cas;
};

export declare type LookupInCallback = (err: Error, res: LookupInResult) => void;

export declare type MutateInResult = {
    content: any;
};

export declare type MutateInCallback = (err: Error, res: MutateInResult) => void;

/**
 * <p>CollectionManager allows the management of collections within a Bucket.</p>
 */
export declare class CollectionManager {
    /**
     * <p>createCollection creates a collection within a scope in a bucket.</p>
     * @param collectionSpec - <p>The details of the collection to create.</p>
     * @param [options.timeout] - <p>Timeout for the operation in milliseconds.</p>
     */
    createCollection(
        collectionSpec: CollectionSpec,
        options?: {
            timeout?: number;
        },
        callback?: CreateCollectionCallback
    ): Promise<boolean>;
    /**
     * <p>dropCollection drops a collection from a scope in a bucket.</p>
     * @param collectionName - <p>The name of the collection to drop.</p>
     * @param scopeName - <p>The name of the scope containing the collection to drop.</p>
     * @param [options.timeout] - <p>Timeout for the operation in milliseconds.</p>
     */
    dropCollection(
        collectionName: string,
        scopeName: string,
        options?: {
            timeout?: number;
        },
        callback?: DropCollectionCallback
    ): Promise<boolean>;
    /**
     * <p>createScope creates a scope within a bucket.</p>
     * @param scopeName - <p>The name of the scope to create.</p>
     * @param [options.timeout] - <p>Timeout for the operation in milliseconds.</p>
     */
    createScope(
        scopeName: string,
        options?: {
            timeout?: number;
        },
        callback?: CreateScopeCallback
    ): Promise<boolean>;
    /**
     * <p>dropScope drops a scope from a bucket.</p>
     * @param scopeName - <p>The name of the scope to drop.</p>
     * @param [options.timeout] - <p>Timeout for the operation in milliseconds.</p>
     */
    dropScope(
        scopeName: string,
        options?: {
            timeout?: number;
        },
        callback?: DropScopeCallback
    ): Promise<boolean>;
}

/**
 * @property name - <p>The name of the collection to create.</p>
 * @property scopeName - <p>The name of the scope to create the collection in.</p>
 * @property maxExpiry - <p>The maximum expiry for documents in this bucket.</p>
 */
export declare type CollectionSpec = {
    name: string;
    scopeName: string;
    maxExpiry: number;
};

export declare type CreateCollectionCallback = (err: Error, res: boolean) => void;

export declare type DropCollectionCallback = (err: Error, res: boolean) => void;

export declare type CreateScopeCallback = (err: Error, res: boolean) => void;

export declare type DropScopeCallback = (err: Error, res: boolean) => void;

export declare type LoggingEntry = {
    severity: number;
    srcFile: string;
    srcLine: number;
    subsys: string;
    message: string;
};

export declare type LoggingCallback = (entry: LoggingEntry) => void;

/**
 * <p>CouchbaseList provides a simplified interface
 * for storing lists within a Couchbase document.</p>
 */
export declare class CouchbaseList {
    getAll(callback: (...params: any[]) => any): void;
    getAt(index: any, callback: (...params: any[]) => any): void;
    removeAt(index: any, callback: (...params: any[]) => any): void;
    indexOf(value: any, callback: (...params: any[]) => any): void;
    size(callback: (...params: any[]) => any): void;
    push(value: any, callback: (...params: any[]) => any): void;
    unshift(value: any, callback: (...params: any[]) => any): void;
}

/**
 * <p>CouchbaseMap provides a simplified interface
 * for storing a map within a Couchbase document.</p>
 */
export declare class CouchbaseMap {
    getAll(callback: (...params: any[]) => any): void;
    forEach(rowCallback: (...params: any[]) => any, callback: (...params: any[]) => any): void;
    set(item: any, value: any, callback: (...params: any[]) => any): void;
    get(item: any, callback: (...params: any[]) => any): void;
    remove(item: any, callback: (...params: any[]) => any): void;
    exists(item: any, callback: (...params: any[]) => any): void;
    keys(callback: (...params: any[]) => any): void;
    values(callback: (...params: any[]) => any): void;
    size(callback: (...params: any[]) => any): void;
}

/**
 * <p>CouchbaseQueue provides a simplified interface
 * for storing a queue within a Couchbase document.</p>
 */
export declare class CouchbaseQueue {
    size(callback: (...params: any[]) => any): void;
    push(value: any, callback: (...params: any[]) => any): void;
    pop(callback: (...params: any[]) => any): void;
}

/**
 * <p>CouchbaseSet provides a simplified interface
 * for storing a set within a Couchbase document.</p>
 */
export declare class CouchbaseSet {
    add(item: any, callback: (...params: any[]) => any): void;
    contains(item: any, callback: (...params: any[]) => any): void;
    remove(item: any, callback: (...params: any[]) => any): void;
    values(callback: (...params: any[]) => any): void;
    size(callback: (...params: any[]) => any): void;
}

/**
 * <p>Transcoder provides an interface for performing custom transcoding
 * of document contents being retrieved and stored to the cluster.</p>
 */
export declare interface Transcoder {
    /**
     * <p>Encodes a value.  Must return an array of two values, containing
     * a {@link Buffer} and {@link number}.</p>
     */
    encode(value: any): any[];
    decode(bytes: Buffer, flags: number): any;
}

export declare class DesignDocumentView {
    map: string;
    reduce: string;
}

export declare class DesignDocument {
    constructor(
        name: string,
        views: {
            [key: string]: DesignDocumentView;
        }
    );
    /**
     * <p>Returns the View class ({@link DesignDocumentView}).</p>
     */
    static View: (...params: any[]) => any;
    name: string;
    views: {
        [key: string]: DesignDocumentView;
    };
}

export declare const enum DurabilityLevel {
    None = 0,
    Majority = 1,
    MajorityAndPersistOnMaster = 2,
    PersistToMajority = 3,
}

export declare const enum BucketType {
    Couchbase = 'membase',
    Memcached = 'memcached',
    Ephemeral = 'ephemeral',
}

export declare const enum EvictionPolicy {
    FullEviction = 'fullEviction',
    ValueOnly = 'valueOnly',
    NotRecentlyUsed = 'nruEviction',
    NoEviction = 'noEviction',
}

export declare const enum CompressionMode {
    Off = 'off',
    Passive = 'passive',
    Active = 'active',
}

export declare const enum ConflictResolutionType {
    Timestamp = 'lww',
    SequenceNumber = 'seqno',
}

export declare const enum QueryProfileMode {
    Off = 'off',
    Phases = 'phases',
    Timings = 'timings',
}

export declare const enum QueryScanConsistency {
    NotBounded = 'not_bounded',
    RequestPlus = 'request_plus',
}

export declare const enum QueryStatus {
    Running = 'running',
    Success = 'success',
    Errors = 'errors',
    Completed = 'completed',
    Stopped = 'stopped',
    Timeout = 'timeout',
    Closed = 'closed',
    Fatal = 'fatal',
    Aborted = 'aborted',
    Unknown = 'unknown',
}

export declare const enum AnalyticsScanConsistency {
    NotBounded = 'not_bounded',
    RequestPlus = 'request_plus',
}

export declare const enum AnalyticsStatus {
    Running = 'running',
    Success = 'success',
    Errors = 'errors',
    Completed = 'completed',
    Stopped = 'stopped',
    Timeout = 'timeout',
    Closed = 'closed',
    Fatal = 'fatal',
    Aborted = 'aborted',
    Unknown = 'unknown',
}

export declare const enum HighlightStyle {
    HTML = 'html',
    ANSI = 'ansi',
}

export declare const enum ViewScanConsistency {
    RequestPlus = 'false',
    UpdateAfter = 'update_after',
    NotBounded = 'ok',
}

export declare const enum ViewOrdering {
    Ascending = 'false',
    Descending = 'true',
}

export declare const enum ViewErrorMode {
    Continue = 'continue',
    Stop = 'stop',
}

export declare const enum SearchScanConsistency {
    NotBounded = '',
}

export declare const enum LookupInMacro {
    Document = '{}',
    Expiry = '{}',
    Cas = '{}',
    SeqNo = '{}',
    LastModified = '{}',
    IsDeleted = '{}',
    ValueSizeBytes = '{}',
    RevId = '{}',
}

export declare const enum MutateInMacro {
    Cas = '{}',
    SeqNo = '{}',
    ValueCrc32c = '{}',
}

export declare const enum ServiceType {
    KeyValue = 'kv',
    Management = 'mgmt',
    Views = 'views',
    Query = 'query',
    Search = 'search',
    Analytics = 'analytics',
}

export declare class CouchbaseError {}

export declare class TimeoutError {}

export declare class RequestCanceledError {}

export declare class InvalidArgumentError {}

export declare class ServiceNotAvailableError {}

export declare class InternalServerFailureError {}

export declare class AuthenticationFailureError {}

export declare class TemporaryFailureError {}

export declare class ParsingFailureError {}

export declare class CasMismatchError {}

export declare class BucketNotFoundError {}

export declare class CollectionNotFoundError {}

export declare class EncodingFailureError {}

export declare class DecodingFailureError {}

export declare class UnsupportedOperationError {}

export declare class AmbiguousTimeoutError {}

export declare class UnambiguousTimeoutError {}

export declare class FeatureNotAvailableError {}

export declare class ScopeNotFoundError {}

export declare class IndexNotFoundError {}

export declare class IndexExistsError {}

export declare class DocumentNotFoundError {}

export declare class DocumentUnretrievableError {}

export declare class DocumentLockedError {}

export declare class ValueTooLargeError {}

export declare class DocumentExistsError {}

export declare class ValueNotJsonError {}

export declare class DurabilityLevelNotAvailableError {}

export declare class DurabilityImpossibleError {}

export declare class DurabilityAmbiguousError {}

export declare class DurableWriteInProgressError {}

export declare class DurableWriteReCommitInProgressError {}

export declare class MutationLostError {}

export declare class PathNotFoundError {}

export declare class PathMismatchError {}

export declare class PathInvalidError {}

export declare class PathTooBigError {}

export declare class PathTooDeepError {}

export declare class ValueTooDeepError {}

export declare class ValueInvalidError {}

export declare class DocumentNotJsonError {}

export declare class NumberTooBigError {}

export declare class DeltaInvalidError {}

export declare class PathExistsError {}

export declare class PlanningFailureError {}

export declare class IndexFailureError {}

export declare class PreparedStatementFailure {}

export declare class CompilationFailureError {}

export declare class JobQueueFullError {}

export declare class DatasetNotFoundError {}

export declare class DataverseNotFoundError {}

export declare class DatasetExistsError {}

export declare class DataverseExistsError {}

export declare class LinkNotFoundError {}

export declare class ViewNotFoundError {}

export declare class DesignDocumentNotFoundError {}

export declare class CollectionExistsError {}

export declare class ScopeExistsError {}

export declare class UserNotFoundError {}

export declare class GroupNotFoundError {}

export declare class BucketExistsError {}

export declare class UserExistsError {}

export declare class BucketNotFlushableError {}

export declare class ErrorContext {}

export declare class KeyValueErrorContext {}

export declare class ViewErrorContext {}

export declare class QueryErrorContext {}

export declare class SearchErrorContext {}

export declare class AnalyticsErrorContext {}

export declare class LookupInSpec {
    static get(path: string, options?: any): LookupInSpec;
    static exists(path: string, options?: any): LookupInSpec;
    static count(path: string, options?: any): LookupInSpec;
}

export declare class MutateInSpec {
    static insert(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
        }
    ): MutateInSpec;
    static upsert(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
        }
    ): MutateInSpec;
    static replace(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
        }
    ): MutateInSpec;
    static remove(path: string, options?: any): MutateInSpec;
    static arrayAppend(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
            multi?: boolean;
        }
    ): MutateInSpec;
    static arrayPrepend(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
            multi?: boolean;
        }
    ): MutateInSpec;
    static arrayInsert(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
            multi?: boolean;
        }
    ): MutateInSpec;
    static arrayAddUnique(
        path: string,
        value: any,
        options?: {
            createPath?: boolean;
        }
    ): MutateInSpec;
    static increment(
        path: string,
        value: number,
        options?: {
            createPath?: boolean;
        }
    ): MutateInSpec;
    static decrement(
        path: string,
        value: number,
        options?: {
            createPath?: boolean;
        }
    ): MutateInSpec;
}

/**
 * <p>Implements mutation token aggregation for performing consistentWith
 * on queries.  Accepts any number of arguments (one per document/tokens).</p>
 */
export declare class MutationState {
    constructor();
    /**
     * <p>Adds an additional token to this MutationState
     * Accepts any number of arguments (one per document/tokens).</p>
     */
    add(): void;
}

/**
 * <p>PasswordAuthenticator provides an authenticator implementation
 * which uses a Role Based Access Control Username and Password.</p>
 */
export declare class PasswordAuthenticator {
    constructor(username: string, password: string);
}

/**
 * <p>QueryIndex represents a single query index.</p>
 */
export declare class QueryIndex {
    name: string;
    isPrimary: boolean;
    type: string;
    state: string;
    keyspace: string;
    indexKey: string[];
    condition: string;
    partition: string;
}

/**
 * <p>QueryIndexManager provides an interface for managing the
 * query indexes on the cluster.</p>
 */
export declare class QueryIndexManager {
    createIndex(
        bucketName: string,
        indexName: string,
        fields: string[],
        options?: {
            ignoreIfExists?: boolean;
            deferred?: boolean;
            timeout?: number;
        },
        callback?: CreateQueryIndexCallback
    ): Promise<boolean>;
    createPrimaryIndex(
        bucketName: string,
        options?: {
            ignoreIfExists?: boolean;
            deferred?: boolean;
            timeout?: number;
        },
        callback?: CreatePrimaryIndexCallback
    ): Promise<boolean>;
    dropIndex(
        bucketName: string,
        indexName: string,
        options?: {
            ignoreIfNotExists?: boolean;
            timeout?: number;
        },
        callback?: DropQueryIndexCallback
    ): Promise<boolean>;
    dropPrimaryIndex(
        bucketName: string,
        options?: {
            ignoreIfNotExists?: boolean;
            timeout?: number;
        },
        callback?: DropPrimaryIndexCallback
    ): Promise<boolean>;
    getAllIndexes(
        bucketName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetAllQueryIndexesCallback
    ): Promise<QueryIndex[]>;
    buildDeferredIndexes(
        bucketName: string,
        options?: {
            timeout?: number;
        },
        callback?: BuildDeferredIndexesCallback
    ): Promise<string[]>;
    watchIndexes(
        bucketName: string,
        indexNames: string[],
        duration: number,
        options?: {
            watchPrimary?: number;
        },
        callback?: WatchIndexesCallback
    ): Promise<boolean>;
}

export declare type CreateQueryIndexCallback = (err: Error, res: boolean) => void;

export declare type CreatePrimaryIndexCallback = (err: Error, res: boolean) => void;

export declare type DropQueryIndexCallback = (err: Error, res: boolean) => void;

export declare type DropPrimaryIndexCallback = (err: Error, res: boolean) => void;

export declare type GetAllQueryIndexesCallback = (err: Error, res: QueryIndex[]) => void;

export declare type BuildDeferredIndexesCallback = (err: Error, res: string[]) => void;

export declare type WatchIndexesCallback = (err: Error, res: boolean) => void;

export declare class Scope {
    /**
     * <p>Gets a reference to a specific collection.</p>
     */
    collection(collectionName: string): Collection;
    /**
     * @param query - <p>The query string to execute.</p>
     * @param [options.parameters] - <p>parameters specifies a list of values to substitute within the query
     * statement during execution.</p>
     * @param [options.scanConsistency] - <p>scanConsistency specifies the level of consistency that is required for
     * the results of the query.</p>
     * @param [options.consistentWith] - <p>consistentWith specifies a MutationState object to use when determining
     * the level of consistency needed for the results of the query.</p>
     * @param [options.adhoc] - <p>adhoc specifies that the query is an adhoc query and should not be
     * prepared and cached within the SDK.</p>
     * @param [options.flexIndex] - <p>flexIndex specifies to enable the use of FTS indexes when selecting
     * indexes to use for the query.</p>
     * @param [options.clientContextId] - <p>clientContextId specifies a unique identifier for the execution of this
     * query to enable various tools to correlate the query.</p>
     * @param [options.readOnly] - <p>readOnly specifies that query should not be permitted to mutate any data.
     * This option also enables a few minor performance improvements and the
     * ability to automatically retry the query on failure.</p>
     * @param [options.profile] - <p>profile enables the return of profiling data from the server.</p>
     * @param [options.metrics] - <p>metrics enables the return of metrics data from the server</p>
     * @param [options.raw] - <p>raw specifies an object represent raw key value pairs that should be
     * included with the query.</p>
     * @param [options.timeout] - <p>timeout specifies the number of ms to wait for completion before
     * cancelling the operation and returning control to the application.</p>
     */
    query(
        query: string,
        options?: {
            parameters?: any | any[];
            scanConsistency?: QueryScanConsistency;
            consistentWith?: MutationState;
            adhoc?: boolean;
            flexIndex?: boolean;
            clientContextId?: string;
            maxParallelism?: number;
            pipelineBatch?: number;
            pipelineCap?: number;
            scanWait?: number;
            scanCap?: number;
            readOnly?: boolean;
            profile?: QueryProfileMode;
            metrics?: boolean;
            raw?: any;
            timeout?: number;
        },
        callback?: QueryCallback
    ): Promise<QueryResult>;
    /**
     * @param query - <p>The query string to execute.</p>
     * @param [options.parameters] - <p>parameters specifies a list of values to substitute within the query
     * statement during execution.</p>
     * @param [options.scanConsistency] - <p>scanConsistency specifies the level of consistency that is required for
     * the results of the query.</p>
     * @param [options.clientContextId] - <p>clientContextId specifies a unique identifier for the execution of this
     * query to enable various tools to correlate the query.</p>
     * @param [options.priority] - <p>priority specifies that this query should be executed with a higher
     * priority than others, causing it to receive extra resources.</p>
     * @param [options.readOnly] - <p>readOnly specifies that query should not be permitted to mutate any data.
     * This option also enables a few minor performance improvements and the
     * ability to automatically retry the query on failure.</p>
     * @param [options.raw] - <p>raw specifies an object represent raw key value pairs that should be
     * included with the query.</p>
     * @param [options.timeout] - <p>timeout specifies the number of ms to wait for completion before
     * cancelling the operation and returning control to the application.</p>
     */
    analyticsQuery(
        query: string,
        options?: {
            parameters?: any | any[];
            scanConsistency?: AnalyticsScanConsistency;
            clientContextId?: string;
            priority?: boolean;
            readOnly?: boolean;
            raw?: any;
            timeout?: number;
        },
        callback?: AnalyticsQueryCallback
    ): Promise<AnalyticsResult>;
}

export declare class TermFacet {}

export declare class NumericFacet {
    addRange(name: string, min: number, max: number): void;
}

export declare class DateFacet {
    addRange(name: string, start: Date, end: Date): void;
}

export declare class SearchFacet {
    static term(field: string, size: number): void;
    static numeric(field: string, size: number): void;
    static date(field: string, size: number): void;
}

/**
 * <p>SearchIndexManager provides an interface for managing the
 * search indexes on the cluster.</p>
 */
export declare class SearchIndexManager {
    getIndex(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetSearchIndexCallback
    ): Promise<SearchIndex>;
    getAllIndexes(
        options?: {
            timeout?: number;
        },
        callback?: GetAllSearchIndexesCallback
    ): Promise<SearchIndex[]>;
    upsertIndex(
        indexDefinition: SearchIndex,
        options?: {
            timeout?: number;
        },
        callback?: UpsertSearchIndexCallback
    ): Promise<boolean>;
    dropIndex(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: DropSearchIndexCallback
    ): Promise<boolean>;
    getIndexedDocumentsCount(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetIndexedDocumentsCountCallback
    ): Promise<number>;
    pauseIngest(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: PauseIngestCallback
    ): Promise<boolean>;
    resumeIngest(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: ResumeIngestCallback
    ): Promise<boolean>;
    allowQuerying(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: AllowQueryingCallback
    ): Promise<boolean>;
    disallowQuerying(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: DisallowQueryingCallback
    ): Promise<boolean>;
    freezePlan(
        indexName: string,
        options?: {
            timeout?: number;
        },
        callback?: FreezePlanCallback
    ): Promise<boolean>;
    analyzeDocument(
        indexName: string,
        document: any,
        options?: {
            timeout?: number;
        },
        callback?: AnalyzeDocumentCallback
    ): Promise<object[]>;
}

/**
 * <p>SearchIndex provides information about a search index.</p>
 */
export declare type SearchIndex = {
    uuid: string;
    name: string;
    sourceName: string;
    type: string;
    params: {
        [key: string]: object;
    };
    sourceUuid: string;
    sourceParams: {
        [key: string]: object;
    };
    sourceType: string;
    planParams: {
        [key: string]: object;
    };
};

export declare type GetSearchIndexCallback = (err: Error, res: SearchIndex) => void;

export declare type GetAllSearchIndexesCallback = (err: Error, res: SearchIndex[]) => void;

export declare type UpsertSearchIndexCallback = (err: Error, res: boolean) => void;

export declare type DropSearchIndexCallback = (err: Error, res: boolean) => void;

export declare type GetIndexedDocumentsCountCallback = (err: Error, res: number) => void;

export declare type PauseIngestCallback = (err: Error, res: boolean) => void;

export declare type ResumeIngestCallback = (err: Error, res: boolean) => void;

export declare type AllowQueryingCallback = (err: Error, res: boolean) => void;

export declare type DisallowQueryingCallback = (err: Error, res: boolean) => void;

export declare type FreezePlanCallback = (err: Error, res: boolean) => void;

export declare type AnalyzeDocumentCallback = (err: Error, res: object[]) => void;

export declare class MatchQuery {
    field(field: string): MatchQuery;
    analyzer(analyzer: string): MatchQuery;
    prefixLength(prefixLength: number): MatchQuery;
    fuzziness(fuzziness: number): MatchQuery;
    boost(boost: number): MatchQuery;
}

export declare class MatchPhraseQuery {
    field(field: string): MatchPhraseQuery;
    analyzer(analyzer: string): MatchPhraseQuery;
    boost(boost: number): MatchPhraseQuery;
}

export declare class RegexpQuery {
    field(field: string): RegexpQuery;
    boost(boost: number): RegexpQuery;
}

export declare class QueryStringQuery {
    boost(boost: number): QueryStringQuery;
}

export declare class NumericRangeQuery {
    min(min: number, inclusive: boolean): NumericRangeQuery;
    max(max: number, inclusive: boolean): NumericRangeQuery;
    field(field: string): NumericRangeQuery;
    boost(boost: number): NumericRangeQuery;
}

export declare class DateRangeQuery {
    start(start: Date, inclusive: boolean): DateRangeQuery;
    end(end: Date, inclusive: boolean): DateRangeQuery;
    field(field: string): DateRangeQuery;
    dateTimeParser(parser: string): DateRangeQuery;
    boost(field: string): DateRangeQuery;
}

export declare class ConjunctionQuery {
    and(): ConjunctionQuery;
    boost(boost: number): ConjunctionQuery;
}

export declare class DisjunctionQuery {
    or(): DisjunctionQuery;
    boost(boost: number): DisjunctionQuery;
}

export declare class BooleanQuery {
    must(query: SearchQuery): BooleanQuery;
    should(query: SearchQuery): BooleanQuery;
    mustNot(query: SearchQuery): BooleanQuery;
    shouldMin(shouldMin: boolean): BooleanQuery;
    boost(boost: number): BooleanQuery;
}

export declare class WildcardQuery {
    field(field: string): WildcardQuery;
    boost(boost: number): WildcardQuery;
}

export declare class DocIdQuery {
    addDocIds(): DocIdQuery;
    field(field: string): DocIdQuery;
    boost(boost: number): DocIdQuery;
}

export declare class BooleanFieldQuery {
    field(field: string): BooleanFieldQuery;
    boost(boost: number): BooleanFieldQuery;
}

export declare class TermQuery {
    field(field: string): TermQuery;
    prefixLength(prefixLength: number): TermQuery;
    fuzziness(fuzziness: number): TermQuery;
    boost(boost: number): TermQuery;
}

export declare class PhraseQuery {
    field(field: string): PhraseQuery;
    boost(boost: number): PhraseQuery;
}

export declare class PrefixQuery {
    field(field: string): PrefixQuery;
    boost(boost: number): PrefixQuery;
}

export declare class MatchAllQuery {}

export declare class MatchNoneQuery {}

export declare class GeoDistanceQuery {
    field(field: string): GeoDistanceQuery;
    boost(boost: number): GeoDistanceQuery;
}

export declare class GeoBoundingBoxQuery {
    field(field: string): GeoBoundingBoxQuery;
    boost(boost: number): GeoBoundingBoxQuery;
}

export declare class GeoPolygonQuery {
    field(field: string): GeoPolygonQuery;
    boost(boost: number): GeoPolygonQuery;
}

export declare class SearchQuery {
    static match(match: any): MatchQuery;
    static matchPhrase(phrase: string): MatchPhraseQuery;
    static regexp(regexp: string): RegexpQuery;
    static queryString(query: string): QueryStringQuery;
    static numericRange(): NumericRangeQuery;
    static dateRange(): DateRangeQuery;
    static conjuncts(): ConjunctionQuery;
    static disjuncts(): DisjunctionQuery;
    static boolean(): BooleanQuery;
    static wildcard(wildcard: string): WildcardQuery;
    static docIds(): DocIdQuery;
    static booleanField(val: boolean): BooleanFieldQuery;
    static term(term: string): TermQuery;
    static phrase(terms: string): PhraseQuery;
    static prefix(prefix: string): PrefixQuery;
    static matchAll(): MatchAllQuery;
    static matchNone(): MatchNoneQuery;
    static geoDistance(lon: number, lat: number, distance: string): GeoDistanceQuery;
    static geoBoundingBox(
        tl_lon: number,
        tl_lat: number,
        br_lon: number,
        br_lat: number
    ): GeoBoundingBoxQuery;
    static geoPolygon(points: any[]): GeoPolygonQuery;
}

export declare class ScoreSort {
    descending(descending: boolean): ScoreSort;
}

export declare class IdSort {
    descending(descending: boolean): IdSort;
}

export declare class FieldSort {
    type(type: string): FieldSort;
    mode(mode: string): FieldSort;
    missing(missing: boolean): FieldSort;
    descending(descending: boolean): FieldSort;
}

export declare class GeoDistanceSort {
    unit(unit: string): GeoDistanceSort;
    descending(descending: boolean): GeoDistanceSort;
}

export declare class SearchSort {
    static score(): ScoreSort;
    static id(): IdSort;
    static field(): FieldSort;
    static geoDistance(): GeoDistanceSort;
}

/**
 * <p>Origin represents a server-side origin information</p>
 */
export declare class Origin {
    /**
     * <p>The type of this origin.</p>
     */
    type: string;
    /**
     * <p>The name of this origin.</p>
     */
    name: string;
}

/**
 * <p>Role represents a server-side role object</p>
 */
export declare class Role {
    /**
     * <p>The name of the role (eg. data_access).</p>
     */
    name: string;
    /**
     * <p>The bucket this role is scoped to.</p>
     */
    bucket: string;
    /**
     * <p>The scope this role is scoped to.</p>
     */
    scope: string;
    /**
     * <p>The collection this role is scoped to.</p>
     */
    collection: string;
}

/**
 * <p>RoleAndDescription represents a server-side role object
 * along with description information.</p>
 */
export declare class RoleAndDescription {
    /**
     * <p>The displayed name for this role.</p>
     */
    displayName: string;
    /**
     * <p>The description of this role.</p>
     */
    description: string;
}

/**
 * <p>RoleAndOrigin represents a server-side role object along
 * with the origin information which goes with the role.</p>
 */
export declare class RoleAndOrigin {
    /**
     * <p>The list of the origins associated with this role.</p>
     */
    origins: Origin[];
}

/**
 * <p>User represents a server-side user object.</p>
 */
export declare class User {
    /**
     * <p>The username of the user.</p>
     */
    username: string;
    /**
     * <p>The display-friendly name of the user.</p>
     */
    displayName: string;
    /**
     * <p>The groups this user is a part of.</p>
     */
    groups: Group[];
    /**
     * <p>The roles this user has.</p>
     */
    roles: Role[];
    /**
     * <p>The password for this user.  Used only during creates/updates.</p>
     */
    password: string;
}

/**
 * <p>UserAndMetadata represents a server-side user object with its
 * metadata information included.</p>
 */
export declare class UserAndMetadata {
    /**
     * <p>The domain this user is within.</p>
     */
    domain: string;
    /**
     * <p>The effective roles of this user.</p>
     */
    effectiveRoles: Role[];
    /**
     * <p>The effective roles with their origins for this user.</p>
     */
    effectiveRolesAndOrigins: RoleAndOrigin[];
    /**
     * <p>Indicates the last time the users password was changed.</p>
     */
    passwordChanged: number;
    /**
     * <p>Groups assigned to this user from outside the system.</p>
     */
    externalGroups: string[];
}

/**
 * <p>Group represents a server Group object.</p>
 */
export declare class Group {
    /**
     * <p>The name of the group.</p>
     */
    name: string;
    /**
     * <p>The description of this group.</p>
     */
    description: string;
    /**
     * <p>The roles associated with this group.</p>
     */
    roles: Role[];
    /**
     * <p>The reference this group has to an external LDAP group.</p>
     */
    ldapGroupReference: string;
}

/**
 * <p>UserManager is an interface which enables the management of users
 * within a cluster.</p>
 */
export declare class UserManager {
    getUser(
        username: string,
        options?: {
            domainName?: string;
            timeout?: number;
        },
        callback?: GetUserCallback
    ): Promise<User>;
    getAllUsers(
        options?: {
            domainName?: string;
            timeout?: number;
        },
        callback?: GetAllUsersCallback
    ): Promise<User[]>;
    upsertUser(
        user: User,
        options?: {
            domainName?: string;
            timeout?: number;
        },
        callback?: UpsertUserCallback
    ): Promise<boolean>;
    dropUser(
        username: string,
        options?: {
            domainName?: string;
            timeout?: number;
        },
        callback?: DropUserCallback
    ): Promise<boolean>;
    getRoles(
        options?: {
            timeout?: number;
        },
        callback?: GetRolesCallback
    ): Promise<RoleAndDescription[]>;
    getGroup(
        groupName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetGroupCallback
    ): Promise<Group>;
    getAllGroups(
        options?: {
            timeout?: number;
        },
        callback?: GetAllGroupsCallback
    ): Promise<Group[]>;
    upsertGroup(
        group: Group,
        options?: {
            timeout?: number;
        },
        callback?: UpsertGroupCallback
    ): Promise<boolean>;
    dropGroup(
        username: string,
        options?: {
            timeout?: number;
        },
        callback?: DropGroupCallback
    ): Promise<boolean>;
}

export declare type GetUserCallback = (err: Error, res: User) => void;

export declare type GetAllUsersCallback = (err: Error, res: User[]) => void;

export declare type UpsertUserCallback = (err: Error, res: boolean) => void;

export declare type DropUserCallback = (err: Error, res: boolean) => void;

export declare type GetRolesCallback = (err: Error, res: RoleAndDescription[]) => void;

export declare type GetGroupCallback = (err: Error, res: Group) => void;

export declare type GetAllGroupsCallback = (err: Error, res: Group[]) => void;

export declare type UpsertGroupCallback = (err: Error, res: boolean) => void;

export declare type DropGroupCallback = (err: Error, res: boolean) => void;

/**
 * <p>ViewIndexManager is an interface which enables the management
 * of view indexes on the cluster.</p>
 */
export declare class ViewIndexManager {
    getAllDesignDocuments(
        options?: {
            timeout?: number;
        },
        callback?: GetAllDesignDocumentsCallback
    ): Promise<DesignDocument[]>;
    getDesignDocument(
        designDocName: string,
        options?: {
            timeout?: number;
        },
        callback?: GetDesignDocumentCallback
    ): Promise<DesignDocument>;
    upsertDesignDocument(
        designDoc: DesignDocument,
        options?: {
            timeout?: number;
        },
        callback?: UpsertDesignDocumentCallback
    ): Promise<DesignDocument>;
    dropDesignDocument(
        designDocName: string,
        options?: {
            timeout?: number;
        },
        callback?: DropDesignDocumentCallback
    ): Promise<DesignDocument>;
    publishDesignDocument(
        designDocName: string,
        options?: {
            timeout?: number;
        },
        callback?: PublishDesignDocumentCallback
    ): Promise<boolean>;
}

export declare type GetAllDesignDocumentsCallback = (err: Error, res: DesignDocument[]) => void;

export declare type GetDesignDocumentCallback = (err: Error, res: DesignDocument) => void;

export declare type UpsertDesignDocumentCallback = (err: Error, res: boolean) => void;

export declare type DropDesignDocumentCallback = (err: Error, res: boolean) => void;

export declare type PublishDesignDocumentCallback = (err: Error, res: boolean) => void;
