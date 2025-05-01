<template>
  <Simulation v-model="formData" @saveButtonClicked="onSaveButtonClicked" />

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

const dialogVisible = ref(false);
const router = useRouter();

const formData = ref<FinancingInput>({
  valorTotal: 0,
  entrada: 0,
  juros: 0,
  inflacao: 0,
  qtdParcelas: 0,
  tabela: "PRICE",
});

function onSaveButtonClicked() {
  dialogVisible.value = true;
}

async function onSaveSimulationConfirm(nome: string) {
  dialogVisible.value = false;

  try {
    const response = await SimulationService.saveSimulation({
      nome,
      id_autor: 1, // TODO: substituir por id real
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
</script>
