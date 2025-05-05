<template>
  <v-app>
    <!-- Conteúdo central -->
    <v-main>
      <v-container
        class="fill-height d-flex flex-column justify-center align-center text-center"
      >
        <h1 class="text-h3 font-weight-bold mb-6">
          Bem-vindo à Calculadora de Financiamento
        </h1>
        <p class="mb-8 text-subtitle-1">
          Faça simulações de financiamento com facilidade. Acesse a calculadora ou entre em sua conta.
        </p>

        <div class="d-flex flex-column align-center gap-4">
          <v-btn color="primary" @click="goToCalculadora" large>
            Ir para a Calculadora
          </v-btn>

          <!-- Só aparece se NÃO estiver logado -->
          <v-btn
            v-if="!isLoggedIn"
            color="secondary"
            @click="goToLogin"
            large
          >
            Login / Cadastro
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  // Verifica se existe algum token ou user no localStorage
  const user = localStorage.getItem('user') || localStorage.getItem('token')
  isLoggedIn.value = !!user
})

const goToCalculadora = () => {
  router.push('/calculadora')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.gap-4 {
  gap: 1rem;
}
</style>
