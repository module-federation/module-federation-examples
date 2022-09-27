export declare const computeRemoteFilename: (isServer: boolean, filename: string) => string;
export declare const promiseFactory: (factory: string | Function) => string;
export declare const promiseTemplate: (remote: string, ...otherPromises: Function[]) => string;
