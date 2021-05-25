<template>
  <div class="layout-app">
    <!-- host app HOST-->
    <div class="app-label">
      # Hosting App [HOST]
    </div>
    <img src="./logo.png" width="30" />
    <h1>Layout App 1</h1>
    <div class="remote-component">
      <div class="app-label">
        #remote-component [REMOTE]
      </div>
    </div>  
      <!-- remote-component REMOTE -->
    <div v-html="button"></div>
  </div>
</template>

<script>
import ReactDOMServer from "react-dom/server";
const Button = (await import('home/Button')).default

export default {
data() {
    return {
        button: ReactDOMServer.renderToString(Button({
            caption: 'React Button in vue'
        }))
    };
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
