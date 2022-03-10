<template>
    <div>
        <h2>ssr-mf-home</h2>
        Home page
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'home',
    metaInfo() {
        return {
            title: 'Home page'
        };
    }
});
</script>
