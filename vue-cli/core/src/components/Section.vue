<template>
  <section class="section">
    This is a section from CORE.

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