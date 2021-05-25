import Vue from 'vue'
import Layout from "./Layout.vue";

console.log('xxx-app');
new Vue({
    el: '#app',
    render: h => h(Layout),
  })