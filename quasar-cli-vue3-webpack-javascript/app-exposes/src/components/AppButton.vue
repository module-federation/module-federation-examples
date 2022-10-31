<template>
  <div class="row justify-center">
    <q-card class="text-center app-button" title="Button" bordered flat>
      <q-card-section>
        <div class="text-h6">App Button</div>
      </q-card-section>
      <q-card-section>
        <div data-cy="app-button-counter" class="text-h3">{{counter}}</div>
        <q-btn data-cy="app-button" @click="handleClick">Click me</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref} from 'vue';
export default defineComponent({
  name: 'AppButton',
  emits: ['button-clicked'],
  setup(props, { emit }){
    const counter = ref(0);
    const handleClick = () => {
      counter.value++;
      emit('button-clicked', counter.value);
    }

    return {
      counter,
      handleClick,
    }
  }
})

</script>

<style lang="scss" scoped>
.app-button {
  max-width: 37rem;
  width: 100%;
}
</style>
