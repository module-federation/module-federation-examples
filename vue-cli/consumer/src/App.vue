<template>
  <div id="app">
    This is /consumer.

    <hr />
    <h4>The content below is imported from /core</h4>
    <Section>
      <Button>Button imported from /core</Button>
      <br />
      I'm inside the Section component loaded from /core, but my text is defined
      in /consumer
    </Section>

    <hr />
    <h4>The content below is imported from /other</h4>

    <MainComponent />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Button: () => import("core/Button"),
    Section: () => import("core/Section"),
    MainComponent: () => import("other/MainComponent"),
  },
};
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
