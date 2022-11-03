<template>
  <div @click="click">
    Webpack Content
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods:{
    click(){
      alert('im from Webpack')
    }
  }
}
</script>
