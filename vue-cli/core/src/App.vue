<template>
  <div id="app">
    <Section>
      <Button />
    </Section>
  </div>
</template>

<script>
import Section from './components/Section.vue'
import Button from './components/Button.vue'

export default {
  name: 'App',
  components: {
    Section,
    Button,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
