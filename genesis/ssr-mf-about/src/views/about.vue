<template>
    <div>
        <h2>ssr-mf-about</h2>
        About <br />
        <img src="../images/logo.svg" width="60" height="60" alt="logo" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'about',
    metaInfo() {
        return {
            title: 'About'
        };
    }
});
</script>
