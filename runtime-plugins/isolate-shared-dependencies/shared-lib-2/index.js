function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const instanceId = getRandomInt(100000);

export function getLib2InstanceId() {
  return instanceId;
}
