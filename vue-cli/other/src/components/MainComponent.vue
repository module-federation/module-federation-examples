<template>
  <section class="section">
    <p>This is a component from /other-app.</p>
    <p>I am being imported.</p>
    <p>I also has my own behavior like fetching data</p>
    <p>
      <button @click="fetchData" type="button">
        Click to fetch from FakeApi
      </button>
    </p>
    <pre><code>{{result}}</code></pre>
  </section>
</template>

<script>
export default {
  name: "MainComponent",
  data() {
    return {
      result: null,
    };
  },
  methods: {
    fetchData() {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
          alert("Data fetched");
          this.result = json;
          console.log(json);
        });
    },
  },
};
</script>

<style>
.section {
  border: 1px solid black;
  padding: 10px;
}
</style>