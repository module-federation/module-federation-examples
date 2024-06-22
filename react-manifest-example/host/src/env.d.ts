/// <reference types="@rsbuild/core/types" />

// import type { PackageType as PackageType_0,RemoteKeys as RemoteKeys_0, PackageExportType as PackageExportType_0 } from './remote2/apis.d.ts';
// import type { PackageType as PackageType_1,RemoteKeys as RemoteKeys_1, PackageExportType as PackageExportType_1 } from './remote1/apis.d.ts';

// declare module "@module-federation/enhanced/runtime" {
//     type RemoteKeys = RemoteKeys_0 | RemoteKeys_1;
//     type PackageType<T, R=any> = T extends RemoteKeys_0 ? PackageType_0<T> : T extends RemoteKeys_1 ? PackageType_1<T> : R ;
//     type GetType<T, Y extends keyof T> = T[Y];
//     export function createRemoteComponent<T extends RemoteKeys,Y>(info: {name: T, export: Y}): GetType<PackageType<T>, Y>;
// }
