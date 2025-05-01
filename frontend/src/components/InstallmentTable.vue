<template>
  <v-data-table
    :headers="headers"
    :items="installments"
    class="elevation-1"
    density="compact"
    :items-per-page="itemsPerPage"
    items-per-page-text="Parcelas por página"
    :items-per-page-options="itemsPerPageOptions"
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

const props = defineProps<{
  installments: Parcela[];
}>();

const headers: any = [
  { title: "Parcela", value: "numero", align: "start" },
  { title: "Valor Nominal", value: "valorNominal", align: "start" },
  { title: "Valor Real", value: "valorReal", align: "start" },
];

const itemsPerPage = ref<number>(5);

const itemsPerPageOptions = computed<{ title: string; value: number }[]>(() => {
  return [
    { title: "5", value: 5 },
    { title: "10", value: 10 },
    { title: "Todas", value: props.installments.length },
  ];
});

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
</script>
