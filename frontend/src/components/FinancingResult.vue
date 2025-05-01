<template>
  <v-card class="mt-6">
    <v-card-title>Resultado</v-card-title>
    <v-card-text>
      <p>
        <strong>Valor nominal total pago:</strong>
        {{ formatCurrency(result.valorNominalTotal) }}
      </p>
      <p>
        <strong>Valor real (ajustado pela inflação):</strong>
        {{ formatCurrency(result.valorRealTotal) }}
      </p>
    </v-card-text>

    <InstallmentTable
      v-if="result.parcelas.length"
      :installments="result.parcelas"
    />
  </v-card>
</template>

<script setup lang="ts">
import type { FinancingCalculation } from "@/utils/calculateFinancing";

defineProps<{
  result: FinancingCalculation;
}>();

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
</script>
