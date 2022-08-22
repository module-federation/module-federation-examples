<template>
  <div @click="click">
    Webpack Content
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
