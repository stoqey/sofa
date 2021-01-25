import SofaConnection, {SofaArgs} from './connection';
export * from './connection';

/**
 * Main function to start Sofa
 * @param args SofaArgs
 */
export const startSofa = (args: SofaArgs): Promise<boolean> => {
    const sofa = SofaConnection.Instance;
    sofa.init(args);
    return sofa.start();
};
