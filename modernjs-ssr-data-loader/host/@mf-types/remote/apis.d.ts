
    export type RemoteKeys = 'remote/Image' | 'remote/Button' | 'remote/main/mf-routes' | 'remote/main/route-server-loaders';
    type PackageType<T> = T extends 'remote/main/route-server-loaders' ? typeof import('remote/main/route-server-loaders') :T extends 'remote/main/mf-routes' ? typeof import('remote/main/mf-routes') :T extends 'remote/Button' ? typeof import('remote/Button') :T extends 'remote/Image' ? typeof import('remote/Image') :any;