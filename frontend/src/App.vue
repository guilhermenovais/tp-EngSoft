<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUsuarioStore } from "./stores/user";

const router = useRouter();
const usuarioStore = useUsuarioStore();

// Verifica se o usuário está logado
const isLoggedIn = computed(() => !!usuarioStore.usuario);

const goToLogin = () => {
  if (isLoggedIn.value) {
    usuarioStore.usuario = null;
    router.push("/login");
  } else {
    router.push("/login");
  }
};
</script>