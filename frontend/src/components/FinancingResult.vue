<template>
  <v-card class="mt-6" v-if="props.result">
    <v-card-title>Resultado</v-card-title>
    <v-card-text>
      <p>
        <strong>Valor nominal total pago:</strong>
        {{ formatCurrency(props.result.valorNominalTotal) }}
      </p>
      <p>
        <strong>Valor real (ajustado pela inflação):</strong>
        {{ formatCurrency(props.result.valorRealTotal) }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  result: {
    valorNominalTotal: number;
    valorRealTotal: number;
  } | null;
}>();

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
</script>
