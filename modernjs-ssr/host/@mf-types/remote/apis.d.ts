
    export type RemoteKeys = 'remote/Image';
    type PackageType<T> = T extends 'remote/Image' ? typeof import('remote/Image') :any;