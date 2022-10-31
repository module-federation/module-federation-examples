<template>
  <q-layout view="hHh lpR lFr">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen =! leftDrawerOpen" />

        <q-toolbar-title class="cursor-pointer" @click="$router.push('/')">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          App Exposes
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

      <q-list bordered separator>
        <q-item to="/components" class="text-body1 text-grey-8" clickable v-ripple>
          Components
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
    }
  }
})
</script>
