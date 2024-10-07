
    export type RemoteKeys = 'remote2/button';
    type PackageType<T> = T extends 'remote2/button' ? typeof import('remote2/button') :any;