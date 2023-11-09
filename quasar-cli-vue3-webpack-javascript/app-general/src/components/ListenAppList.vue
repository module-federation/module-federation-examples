<template>
  <div class="row q-ma-lg q-col-gutter-md">
    <div class="col">
      <AppList @delete-requested="handleDeleteRequested"/>
    </div>
    <div class="col">
      <q-card
        v-for="(item, index) in parentList"
        class="rounded-borders q-my-sm q-pa-md"
        flat
        bordered
        :key="index">
        <div class="text-body1">{{ item }}</div>
      </q-card>
    </div>
  </div>
</template>

<script>
import {defineComponent, defineAsyncComponent, ref} from 'vue';
export default defineComponent({
  components: {
    AppList: defineAsyncComponent(() => import('app_exposes/AppList.vue'))
  },
  setup(){
    const parentList = ref([]);

    const handleDeleteRequested = (value) => {
      parentList.value.push(value.item);
    }
    return {
      parentList,
      handleDeleteRequested
    }
  }
})
</script>
