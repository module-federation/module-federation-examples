<template>
  <div>
    <span>App 2 loaded | </span>
    <span>Lib 1 instance ID: {{ sharedLib1Id }} | </span>
    <span>Lib 2 instance ID through lib 1: {{ sharedLib2IdThroughLib1 }} |</span>
    <span>Lib 2 instance ID: {{ sharedLib2Id }}</span>
    <div ref="childContainer"></div>
  </div>
</template>

<script lang="ts">
import { init, loadRemote } from '@module-federation/runtime';
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

    init({
      name: 'app2',
      remotes: [{ name: 'app3', entry: 'http://localhost:3003/remoteEntry.js' }],
    });

    loadRemote('app3').then(module => {
      const typedModule = module as {
        mount: ({ parentContainer }: { parentContainer: HTMLElement }) => Promise<void>;
      };
      typedModule.mount({ parentContainer: this.$refs.childContainer as HTMLElement });
    });
  },
  beforeDestroy(): void {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  },
};
</script>