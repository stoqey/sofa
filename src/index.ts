import SofaConnection, {SofaArgs} from './connection';

export * from './model';
export * from './connection';

/**
 * Main function to start Sofa
 * @param args SofaArgs
 */
export const startSofa = async (args: SofaArgs): Promise<boolean> => {
    const sofa = SofaConnection.Instance;
    await sofa.init(args);
    return await sofa.start();
};
