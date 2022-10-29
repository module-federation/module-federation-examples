<template>
  <div class="row q-ma-lg">
    <div class="col-6 text-center">
      <h5> Exposed from Child</h5>
    </div>
    <div class="col-6 text-center">
      <h5> Listening in Parent</h5>
    </div>
    <div class="col-12">
      <ListenAppButton></ListenAppButton>
    </div>
    <div class="col-12">
      <ListenAppList/>
    </div>
  </div>
</template>
<script>
import {defineAsyncComponent, defineComponent} from "vue";
export default defineComponent({
  name: "SharedComponentsPage",
  components: {
    ListenAppButton: defineAsyncComponent(() => import('src/components/ListenAppButton.vue')),
    ListenAppList: defineAsyncComponent(() => import('src/components/ListenAppList.vue'))
  },
})
</script>

