<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-5" width="100%" max-width="600">
      <v-card-title class="text-center mb-4">
        {{ isCadastro ? 'Cadastro' : 'Login' }}
      </v-card-title>

      <!-- Formulário de Login -->
      <Form v-if="!isCadastro" :validation-schema="loginSchema" @submit="handleLogin">
        <Field name="email" v-slot="{ field, errorMessage }">
          <v-text-field
            v-bind="field"
            label="Email"
            type="email"
            outlined
            :error-messages="errorMessage"
          />
        </Field>

        <Field name="password" v-slot="{ field, errorMessage }">
          <v-text-field
            v-bind="field"
            label="Senha"
            type="password"
            outlined
            :error-messages="errorMessage"
          />
        </Field>

        <v-alert v-if="erroLogin" type="error" class="mb-3">
          {{ erroLogin }}
        </v-alert>

        <v-btn type="submit" color="primary" block class="mb-3">Entrar</v-btn>
      </Form>

      <!-- Formulário de Cadastro -->
      <Form v-else :validation-schema="registroSchema" @submit="handleRegister">
        <Field name="nome" v-slot="{ field, errorMessage }">
          <v-text-field v-bind="field" label="Nome" outlined :error-messages="errorMessage" />
        </Field>

        <Field name="email" v-slot="{ field, errorMessage }">
          <v-text-field v-bind="field" label="Email" type="email" outlined :error-messages="errorMessage" />
        </Field>

        <Field name="password" v-slot="{ field, errorMessage }">
          <v-text-field v-bind="field" label="Senha" type="password" outlined :error-messages="errorMessage" />
        </Field>

        <Field name="confirmPassword" v-slot="{ field, errorMessage }">
          <v-text-field
            v-bind="field"
            label="Confirmar Senha"
            type="password"
            outlined
            :error-messages="errorMessage"
          />
        </Field>

        <v-btn type="submit" color="primary" block class="mb-3">Cadastrar</v-btn>
      </Form>

      <v-btn variant="text" block @click="toggleMode">
        {{ isCadastro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar' }}
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import { loginUser, registerUser } from '../services/userServices';
import { useUsuarioStore } from '@/stores/user';

const toast = useToast();
const isCadastro = ref(false);
const erroLogin = ref(null);

// Esquema de validação para login
const loginSchema = yup.object({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Mínimo 6 caracteres')
});

// Esquema de validação para registro
const registroSchema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não conferem')
    .required('Campo obrigatório')
});

const toggleMode = () => {
  isCadastro.value = !isCadastro.value;
};

// Lógica de login
const handleLogin = async (values) => {
  try {
    const dados = await loginUser(values);
    const usuarioStore = useUsuarioStore();
    usuarioStore.setUsuario(dados);
    toast.success('Login realizado com sucesso!');
    window.location.href = '/frontend/'; // ou use router.push se estiver usando Vue Router
  } catch (error) {
    erroLogin.value = error.response?.data?.error || 'Erro ao realizar login';
    toast.error(erroLogin.value);
  }
};

// Lógica de cadastro
const handleRegister = async (values) => {
  try {
    await registerUser(values);
    toast.success('Cadastro realizado com sucesso!');
    isCadastro.value = false;
  } catch (error) {
    console.error("Erro detalhado:", error);
    toast.error(error.response?.data?.error || 'Erro ao realizar cadastro');
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.v-btn {
  font-weight: bold;
}
</style>
