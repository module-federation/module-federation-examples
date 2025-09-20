export type RemoteKeys = 'app2/Content';
export type PackageType<T> = T extends 'app2/Content' ? typeof import('app2/Content') : any;
