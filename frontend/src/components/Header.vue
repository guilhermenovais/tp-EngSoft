<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

    <v-app-bar-title>Calculadora de Financiamentos</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Exibir logout e nome do usuário se estiver logado -->
    <template v-if="isLoggedIn">
      <span class="mr-4">{{ usuarioStore.usuario?.username }}</span>
      <v-btn color="red" variant="tonal" @click="logout">Sair</v-btn>
    </template>

    <!-- Exibir botão de login se não estiver logado -->
    <v-btn v-else color="green" variant="tonal" @click="goToLogin">Entrar</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUsuarioStore } from "@/stores/user";

const router = useRouter();
const usuarioStore = useUsuarioStore();

const isLoggedIn = computed(() => !!usuarioStore.usuario);

const logout = () => {
  usuarioStore.usuario = null;
  localStorage.removeItem("user");
  router.push("/login");
};

const goToLogin = () => {
  router.push("/login");
};
</script>