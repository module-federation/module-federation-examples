
    export type RemoteKeys = 'remote/Card';
    type PackageType<T> = T extends 'remote/Card' ? typeof import('remote/Card') :any;