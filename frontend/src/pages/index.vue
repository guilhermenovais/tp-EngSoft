<template>
  <h2 class="text-h5 mb-4">Calculadora de Financiamento</h2>

  <Simulation
    v-model="formData"
    @saveButtonClicked="onSaveButtonClicked"
    :saveButtonLoading="false"
  />

  <SaveSimulationDialog
    :modelValue="dialogVisible"
    @confirm="onSaveSimulationConfirm"
    @cancel="dialogVisible = false"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Simulation from "@/components/Simulation.vue";
import { type FinancingInput } from "@/utils/calculateFinancing";
import { SimulationService } from "@/services/SimulationService";
import { useUsuarioStore } from "@/stores/user";

const dialogVisible = ref(false);
const router = useRouter();

const usuarioStore = useUsuarioStore();

const isLoggedIn = computed(() => !!usuarioStore.usuario);

const formData = ref<FinancingInput>({
  valorTotal: 0,
  entrada: 0,
  juros: 0,
  inflacao: 0,
  qtdParcelas: 0,
  tabela: "PRICE",
});

function onSaveButtonClicked() {
  if (isLoggedIn.value) {
    dialogVisible.value = true;
  } else {
    goToLogin();
  }
}

async function onSaveSimulationConfirm(nome: string) {
  dialogVisible.value = false;

  const userId = usuarioStore.usuario.id;

  try {
    const response = await SimulationService.saveSimulation({
      nome,
      id_autor: userId,
      valor_total: formData.value.valorTotal,
      entrada: formData.value.entrada,
      juros: formData.value.juros,
      inflacao: formData.value.inflacao,
      qtd_parcelas: formData.value.qtdParcelas,
      tabela: formData.value.tabela,
    });

    router.push(`/savedSimulation/${response.id}`);
  } catch (err) {
    console.error("Erro ao salvar simulação", err);
    alert("Erro ao salvar simulação.");
  }
}

const goToLogin = () => {
  router.push("/login");
};
</script>
