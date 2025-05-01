<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :title="item.title"
        :prepend-icon="item.icon"
        :key="item.title"
        :to="item.to"
        link
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const drawer = ref(true);

const items = [
  { title: "Calculadora", icon: "mdi-calculator", to: "/" },
  { title: "Simulações Salvas", icon: "mdi-archive", to: "/salvas" },
];
</script>
