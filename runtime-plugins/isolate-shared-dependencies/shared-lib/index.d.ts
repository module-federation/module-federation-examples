declare module "shared-lib" {
  export function getLib1InstanceId(): number;
  export function getLib2InstanceIdThroughLib1(): number;
}
