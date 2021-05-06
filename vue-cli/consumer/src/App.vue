<template>
  <div id="app">
    The content below is from the CORE
    <Section>
      <Button>Button of the CORE</Button>

      I'm inside the Section component which is loaded from CORE!
    </Section>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    Button: () => import('core/Button'),
    Section: () => import('core/Section'),
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
