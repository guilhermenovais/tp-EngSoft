<template>
  <v-data-table
    :headers="headers"
    :items="installments"
    class="elevation-1"
    density="compact"
  >
    <template #item.valorNominal="{ item }">
      {{ formatCurrency(item.valorNominal) }}
    </template>
    <template #item.valorReal="{ item }">
      {{ formatCurrency(item.valorReal) }}
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import type { Parcela } from "@/utils/calculateFinancing";

defineProps<{
  installments: Parcela[];
}>();

const headers: any = [
  { title: "Parcela", value: "numero", align: "start" },
  { title: "Valor Nominal", value: "valorNominal", align: "start" },
  { title: "Valor Real", value: "valorReal", align: "start" },
];

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
</script>
