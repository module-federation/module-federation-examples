<script>
export default {
  name: "App",
};
</script>
<template>
  <div :class="$style.view">
    <div :class="$style.main">
      <router-view />
    </div>
  </div>
</template>

<style module scoped>
.view {
  @apply min-h-screen overflow-hidden bg-gray-100 print:!overflow-visible print:invisible print:h-full;
}

.main {
  @apply m-auto;
}
</style>
