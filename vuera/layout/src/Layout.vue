<template>
  <div class="layout-app">
    <!-- host app HOST-->
    <div class="app-label">
      # Hosting App [HOST]
    </div>
    <img src="./logo.png" width="30" />
    <h1>Layout App 1</h1>
    <div class="remote-component">
      <!-- remote-component REMOTE -->
      <div class="app-label">
        #remote-component [REMOTE]
      </div>
    </div>
    <Button />
  </div>
</template>

<script>
import Button from './Button'
console.log('xx n')
export default {
    components: {
        Button
    },
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
.remote-component {
  border: 1px solid blue;
  padding: 10px;
}
.layout-app {
  border: 1px solid green;
  padding: 10px;
}
.app-label {
  padding: 5px 2px;
  font-style: italic;
  font-size: 20px;
  color: gray;
}
</style>
