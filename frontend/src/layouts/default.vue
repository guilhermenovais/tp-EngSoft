<template>
  <v-main>
    <Header @toggle-drawer="drawer = !drawer" />
    <NavigationDrawer v-model="drawer" />
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
const drawer = ref(false);
</script>
