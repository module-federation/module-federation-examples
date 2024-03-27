<template>
  <div>
    <span>App 3 loaded | </span>
    <span>Lib 1 instance ID: {{ sharedLib1Id }} | </span>
    <span>Lib 2 instance ID through lib 1: {{ sharedLib2IdThroughLib1 }} |</span>
    <span>Lib 2 instance ID: {{ sharedLib2Id }}</span>
  </div>
</template>

<script lang="ts">
import { getLib1InstanceId, getLib2InstanceIdThroughLib1 } from 'shared-lib';
import { getLib2InstanceId } from 'shared-lib-2';

export default {
  data() {
    return {
      sharedLib1Id: getLib1InstanceId(),
      sharedLib2IdThroughLib1: getLib2InstanceIdThroughLib1(),
      sharedLib2Id: getLib2InstanceId(),
      updateTimer: null as ReturnType<typeof setInterval> | null,
    };
  },
  mounted(): void {
    this.updateTimer = setInterval(() => {
      this.sharedLib1Id = getLib1InstanceId();
      this.sharedLib2IdThroughLib1 = getLib2InstanceIdThroughLib1();
      this.sharedLib2Id = getLib2InstanceId();
    }, 1000);
  },
  beforeDestroy(): void {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  },
};
</script>