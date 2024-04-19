
    export type RemoteKeys = 'app_02/Hello';
    type PackageType<T> = T extends 'app_02/Hello' ? typeof import('app_02/Hello') :any;