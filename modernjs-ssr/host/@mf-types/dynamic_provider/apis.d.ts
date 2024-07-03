
    export type RemoteKeys = 'dynamic_provider/Image';
    type PackageType<T> = T extends 'dynamic_provider/Image' ? typeof import('dynamic_provider/Image') :any;