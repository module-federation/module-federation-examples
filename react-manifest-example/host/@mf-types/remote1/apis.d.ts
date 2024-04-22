
    export type RemoteKeys = 'remote1/button';
    type PackageType<T> = T extends 'remote1/button' ? typeof import('remote1/button') :any;