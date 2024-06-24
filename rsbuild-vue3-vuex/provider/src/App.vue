<script>
export default {
  name: "App",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {},
};
</script>
<template>
  <div>
    Hi from landing page provider {{ year }}
  </div>
</template>
