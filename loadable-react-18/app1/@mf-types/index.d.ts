import type { PackageType as App2PackageType, RemoteKeys as App2RemoteKeys } from './app2/apis.d.ts';

declare module '@module-federation/runtime' {
  type RemoteKeys = App2RemoteKeys;
  type PackageType<T, Fallback = any> = T extends RemoteKeys ? App2PackageType<T> : Fallback;
  export function loadRemote<T extends RemoteKeys, Fallback>(packageName: T): Promise<PackageType<T, Fallback>>;
  export function loadRemote<T extends string, Fallback>(packageName: T): Promise<PackageType<T, Fallback>>;
}

declare module '@module-federation/enhanced/runtime' {
  type RemoteKeys = App2RemoteKeys;
  type PackageType<T, Fallback = any> = T extends RemoteKeys ? App2PackageType<T> : Fallback;
  export function loadRemote<T extends RemoteKeys, Fallback>(packageName: T): Promise<PackageType<T, Fallback>>;
  export function loadRemote<T extends string, Fallback>(packageName: T): Promise<PackageType<T, Fallback>>;
}

declare module '@module-federation/runtime-tools' {
  type RemoteKeys = App2RemoteKeys;
  type PackageType<T, Fallback = any> = T extends RemoteKeys ? App2PackageType<T> : Fallback;
  export function loadRemote<T extends RemoteKeys, Fallback>(packageName: T): Promise<PackageType<T, Fallback>>;
  export function loadRemote<T extends string, Fallback>(packageName: T): Promise<PackageType<T, Fallback>>;
}
