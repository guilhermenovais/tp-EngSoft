<template>
  <v-main>
    <Header @toggle-drawer="drawer = !drawer" />
    <NavigationDrawer v-model="drawer" />
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

const drawer = ref(false);
</script>
