<template>
  <h1>Simulador de Financiamento</h1>
  <FinancingForm @update="handleInput" />
  <FinancingResult :result="result" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import FinancingForm from "@/components/FinancingForm.vue";
import FinancingResult from "@/components/FinancingResult.vue";
import type { FinancingData } from "@/types/FinancingData";
import { calculateFinancing } from "@/utils/calculateFinancing";

const result = ref<ReturnType<typeof calculateFinancing>>(null);

function handleInput(data: FinancingData) {
  result.value = calculateFinancing(data);
}
</script>
