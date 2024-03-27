import { getLib2InstanceId } from "shared-lib-2";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const instanceId = getRandomInt(100000);

export function getLib1InstanceId() {
  return instanceId;
}

export function getLib2InstanceIdThroughLib1() {
  return getLib2InstanceId();
}
