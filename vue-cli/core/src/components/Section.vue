<template>
  <section class="section">
    <h1>
      This is a section from /code.
    </h1>

    <slot />
  </section>
</template>

<script>
export default {
  name: 'Section',
}
</script>

<style>
.section {
  border: 1px solid black;
  padding: 10px;
}
</style>