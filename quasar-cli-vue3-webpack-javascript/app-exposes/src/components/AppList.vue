<template>
  <div class="row justify-center">
    <q-card class="app-list" title="Button" bordered flat>
      <q-card-section>
        <div class="text-center text-h6">AppList</div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item :key="index" v-for="(item, index) in list">
            <q-item-section data-e2e="EXPOSES_APP_NAMES">
              <q-item-label lines="1">{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.createdAt }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn data-e2e="CLOSE_BUTTON"
                icon="close"
                round
                flat
                @click="handleRemove(index)"></q-btn>
            </q-item-section>
          </q-item>

        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
 emits: ['delete-requested'],
 setup(props, {emit}){
   const list = ref([
     {
       label: 'Gualtiero',
       createdAt: 'Jan 1st, 2019'
     },
     {
       label: 'Riyaz',
       createdAt: 'Feb 2nd, 2019'
     },
     {
       label: 'Quy',
       createdAt: 'March 3rd, 2019'
     },
     {
       label: 'Sang',
       createdAt: 'April 4th, 2019'
     },
     {
       label: 'Loris',
       createdAt: 'May 5th, 2019'
     },
   ]);

   const handleRemove = (index) => {
     emit('delete-requested', {
       item: list.value[index],
       index
     });
     list.value.splice(index, 1);
   }
   return {
     list,
     handleRemove,
   }
 }
})
</script>

<style lang="scss" scoped>
.app-list {
  max-width: 37rem;
  width: 100%;
}
</style>
