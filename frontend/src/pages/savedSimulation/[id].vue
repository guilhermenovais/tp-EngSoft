<template>
  <h2 class="text-h5 mb-4">{{ simulationName }}</h2>

  <Simulation
    v-model="formData"
    @saveButtonClicked="onSaveButtonClicked"
    :saveButtonLoading="saveButtonLoading"
  />

  <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar.visible = false">
        OK
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { SimulationService } from "@/services/SimulationService";
import type { FinancingInput } from "@/utils/calculateFinancing";

const route = useRoute();
const simulationId = parseInt((route.params as any).id as string, 10);

const loaded = ref(false);
const simulationName = ref("");
const formData = ref<FinancingInput>({
  valorTotal: 0,
  entrada: 0,
  juros: 0,
  inflacao: 0,
  qtdParcelas: 0,
  tabela: "PRICE",
});

const saveButtonLoading = ref(false);

const snackbar = ref({
  visible: false,
  message: "",
  color: "success",
});

onMounted(async () => {
  try {
    const data = await SimulationService.getSimulation(simulationId);
    formData.value = {
      valorTotal: data.valor_total,
      entrada: data.entrada,
      juros: data.juros,
      inflacao: data.inflacao,
      qtdParcelas: data.qtd_parcelas,
      tabela: data.tabela,
    };
    simulationName.value = data.nome;
    loaded.value = true;
  } catch (err) {
    console.error("Erro ao carregar simulação", err);
    snackbar.value = {
      visible: true,
      message: "Simulação não encontrada",
      color: "error",
    };
  }
});

async function onSaveButtonClicked() {
  try {
    saveButtonLoading.value = true;
    await SimulationService.updateSimulation(simulationId, {
      nome: simulationName.value,
      id_autor: 1, // TODO: substituir por id real
      valor_total: formData.value.valorTotal,
      entrada: formData.value.entrada,
      juros: formData.value.juros,
      inflacao: formData.value.inflacao,
      qtd_parcelas: formData.value.qtdParcelas,
      tabela: formData.value.tabela,
    });
    saveButtonLoading.value = false;
    snackbar.value = {
      visible: true,
      message: "Simulação atualizada com sucesso",
      color: "green",
    };
  } catch (err) {
    console.error("Erro ao salvar simulação", err);
    snackbar.value = {
      visible: true,
      message: "Erro ao atualizar simulação",
      color: "error",
    };
  }
}
</script>
