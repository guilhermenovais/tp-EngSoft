<template>
  <v-form>
    <v-row dense>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="form.valorTotal"
          label="Valor Total"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="form.entrada"
          label="Entrada"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="form.juros"
          label="Juros ao ano (%)"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="form.inflacao"
          label="Inflação ao ano (%)"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="form.qtdParcelas"
          label="Quantidade de parcelas"
          :min="1"
          :step="1"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="form.tabela"
          :items="['SAC', 'PRICE']"
          label="Tabela"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import type { FinancingData } from "@/types/FinancingData";
import { watch } from "vue";

const emit = defineEmits<{
  (e: "update", value: FinancingData): void;
}>();

const form = reactive<FinancingData>({
  valorTotal: null,
  entrada: null,
  juros: null,
  inflacao: null,
  qtdParcelas: null,
  tabela: null,
});

watch(
  form,
  () => {
    emit("update", { ...form });
  },
  { deep: true },
);
</script>
