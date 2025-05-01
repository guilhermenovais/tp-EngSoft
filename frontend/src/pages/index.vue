<template>
  <h2 class="text-h5 mb-4">Calculadora de Financiamento</h2>
  <FinancingForm v-model="formData" />
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
</script>
