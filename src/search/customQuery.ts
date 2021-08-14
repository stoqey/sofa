import SofaConnection from '../connection';

export interface CustomQueryArgs {
    bucketName: string;
    select?: any[] | string;
    query: any;
}

/**
 * Common pagination
 *  query,
    bucketName = "",
    select = ["id", "owner"] || "*"
 * @param args PaginationArgs
 */
export const CustomQuery = async <T>(args: CustomQueryArgs): Promise<T[]> => {
    const {query, bucketName = '_default', select = '*'} = args;

    const cluster = SofaConnection.Instance.cluster;

    try {
        console.log('query', query);

        const {rows} = await cluster.query(query);

        const completedRows: T[] = rows.map((r: any) => {
            return select === '*' ? r[bucketName] : r;
        });

        return completedRows;
    } catch (error) {
        console.error('error running pagination', error);
        return [];
    }
};
