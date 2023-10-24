<template>
  <div class="row q-ma-lg q-col-gutter-md">
    <div class="col">
      <AppButton class="app-button" @button-clicked="handleClick"></AppButton>
    </div>
    <div class="col">
      <q-card class="app-button row text-center items-center justify-center vertical-middle">
        <q-card-section>
          <div class="text-h6 text-grey-7">Counter</div>
          <div class="text-grey-7 text-h3" data-e2e="GENERAL_COUNTER">{{parentCounter}}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  name: 'ListenAppButton',
  components: {
    AppButton: defineAsyncComponent(()=> import('app_exposes/AppButton.vue'))
  },
  setup(){
    const parentCounter = ref(0);
    const handleClick = (value) => {
      parentCounter.value = value;
    }
    return {
      parentCounter,
      handleClick,
    }
  }
})
</script>

<style lang="scss" scoped>
.app-button {
  height: 250px;
}
</style>
