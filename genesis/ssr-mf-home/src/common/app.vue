<template>
    <div class="app">
        <div>
            <img src="../images/logo.svg" width="120" height="120" alt="logo" />
        </div>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
        </ul>
        <router-view />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
