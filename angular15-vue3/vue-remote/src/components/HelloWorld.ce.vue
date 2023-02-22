<template>
  <div class="hello">
    Vue Remote Custom Element Content
    <div class="test-scoped">Scoped: <span data="VUE_IN_ANGULAR_INTERACTION_TEXT">{{ msg }}</span></div>
    <div class="test">Not Scoped: {{ msg }}</div>
    <div>
      <button @click="click" data="VUE_IN_ANGULAR_BUTTON">Click Me</button>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color: blue;
  border: 1px solid green;
  padding: 20px;
}

.test-scoped {
  color: red;
}
</style>
<style>
.test {
  color: #0a340a;
}
</style>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: String,
    }
  },
  mounted() {
    this.msg = "Some Content"
  },
  methods: {
    click() {
      this.msg = "Interaction Works"
    }
  }
}
</script>
