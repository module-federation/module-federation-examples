
    export type RemoteKeys = 'remote1/button' | 'remote1/app';
    type PackageType<T> = T extends 'remote1/app' ? typeof import('remote1/app') :T extends 'remote1/button' ? typeof import('remote1/button') :any;