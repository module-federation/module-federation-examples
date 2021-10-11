<template>
  <button @click="click">vue2 button click</button>
</template>

<script>

export default {
  methods: {
    click() {
      this.$emit("btnClick");
      // vue3 events needs the Camel-Case start with "on"
      this.$emit("onBtnClick");
    }
  }
}
</script>

