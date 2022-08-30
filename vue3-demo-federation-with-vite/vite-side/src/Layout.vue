<template>
    <div class="main">
      <div class="vite-content" style="margin-top: 50px">
        <Content/>
      </div>
      <div class="webpack-content">
        <webpack-content/>
      </div>
    </div>

</template>

<script>
import Content from "./components/Content.vue";

export default {
  components: {
    Content,
  },
};
</script>

<style scoped>
.main{
  text-align: center;
  border-radius: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  width: 300px;
  height: 200px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}


.vite-content {
  background-color:#42b983;
  height: 50px;
  text-align: center;
  text-justify: distribute-center-last;
  line-height: 50px;
}

.webpack-content {
  background-color: #00bcd4;
  height: 50px;
  text-align: center;
  text-justify: distribute-center-last;
  line-height: 50px;
}
</style>
