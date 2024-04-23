
    export type RemoteKeys = 'app_02/Hello' | 'app_02/pi';
    type PackageType<T> = T extends 'app_02/pi' ? typeof import('app_02/pi') :T extends 'app_02/Hello' ? typeof import('app_02/Hello') :any;