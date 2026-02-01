import type { PackageType as PackageType_0,RemoteKeys as RemoteKeys_0 } from './app2/apis.d.ts';
    declare module "@module-federation/runtime" {
      type RemoteKeys = RemoteKeys_0;
      type PackageType<T, Y=any> = T extends RemoteKeys_0 ? PackageType_0<T> :
Y ;
      export function loadRemote<T extends RemoteKeys,Y>(packageName: T): Promise<PackageType<T, Y>>;
      export function loadRemote<T extends string,Y>(packageName: T): Promise<PackageType<T, Y>>;
    }
declare module "@module-federation/enhanced/runtime" {
      type RemoteKeys = RemoteKeys_0;
      type PackageType<T, Y=any> = T extends RemoteKeys_0 ? PackageType_0<T> :
Y ;
      export function loadRemote<T extends RemoteKeys,Y>(packageName: T): Promise<PackageType<T, Y>>;
      export function loadRemote<T extends string,Y>(packageName: T): Promise<PackageType<T, Y>>;
    }
declare module "@module-federation/runtime-tools" {
      type RemoteKeys = RemoteKeys_0;
      type PackageType<T, Y=any> = T extends RemoteKeys_0 ? PackageType_0<T> :
Y ;
      export function loadRemote<T extends RemoteKeys,Y>(packageName: T): Promise<PackageType<T, Y>>;
      export function loadRemote<T extends string,Y>(packageName: T): Promise<PackageType<T, Y>>;
    }
    