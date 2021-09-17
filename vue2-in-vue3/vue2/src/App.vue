<template>
  <div>
    <h3>Vue2 App</h3>
    <Content :count="count"/>
    <Button @btnClick="inc"/>
  </div>
</template>

<script>
import Content from "./components/Content";
import Button from './components/Button';

export default {
  components: {
    Content,
    Button,
  },
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    inc() {
      this.count++;
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
