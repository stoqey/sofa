export * from './couchbase';
import SofaConnection, {SofaArgs} from './connection';

export * from './model';
export * from './connection';
export * from './query';
export * from './pagination';

/**
 * Main function to start Sofa
 * @param @interface SofaArgs
 */
export const startSofa = async (args: SofaArgs): Promise<boolean> => {
    const sofa = SofaConnection.Instance;
    await sofa.init(args);
    return Promise.resolve(true);
};

export default startSofa;
