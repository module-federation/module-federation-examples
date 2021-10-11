<template>
  <div>
    <h3>Vue3 App</h3>
    <Content :count="count"/>
    
    <div id="vue2Button"></div>
    <vue2-button @btnClick="inc"/>
    
  </div>
</template>

<script>
import { ref } from "vue";
import Content from "./components/Content";
import { vue2ToVue3 } from './utils';
import Button from 'vue2App/Button';

export default {
  components: {
    Content,
    vue2Button: vue2ToVue3(Button, 'vue2Button'),
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc,
    };
  }
};
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
