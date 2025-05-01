<template>
  <h2 class="text-h5 mb-4">Calculadora de Financiamento</h2>
  <FinancingForm v-model="formData" />

  <div class="d-flex fill-width flex-row-reverse">
    <v-btn
      :disabled="financingCalculation.parcelas.length === 0"
      color="primary"
      @click="openDialog"
      >Salvar simulação</v-btn
    >
  </div>

  <SaveSimulationDialog
    :modelValue="dialogVisible"
    @confirm="saveSimulation"
    @cancel="dialogVisible = false"
  />
  <FinancingResult :result="financingCalculation" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import FinancingForm from "@/components/FinancingForm.vue";
import FinancingResult from "@/components/FinancingResult.vue";
import {
  calculateFinancing,
  type FinancingCalculation,
  type FinancingInput,
} from "@/utils/calculateFinancing";
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

const financingCalculation = ref<FinancingCalculation>({
  valorNominalTotal: 0,
  valorRealTotal: 0,
  parcelas: [],
});

watch(
  formData,
  (data) => {
    financingCalculation.value = calculateFinancing(data);
  },
  { deep: true },
);

function openDialog() {
  dialogVisible.value = true;
}

async function saveSimulation(nome: string) {
  dialogVisible.value = false;
  try {
    const response = await SimulationService.saveSimulation({
      nome,
      id_autor: 1, // TODO: substituir por id real do usuário logado
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
