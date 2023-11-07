<template>
  <div class="row q-ma-lg">
    <div class="col-12">
      <q-toolbar>
        Button
      </q-toolbar>
      <app-button></app-button>
    </div>

    <div class="col-12 q-mt-lg">
      <q-toolbar>
        List
      </q-toolbar>
      <app-list></app-list>
    </div>
  </div>
</template>

<script>
import AppButton from 'components/AppButton.vue';
import AppList from 'components/AppList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ComponentsPage',
  components: {
    AppButton,
    AppList
  }
})
</script>
