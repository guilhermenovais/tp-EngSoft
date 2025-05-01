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

<script lang="ts" setup>
import { reactive, watch } from "vue";
import type { FinancingInput } from "@/utils/calculateFinancing";

const emit = defineEmits<{
  (e: "update:modelValue", value: FinancingInput): void;
}>();

const form = reactive<FinancingInput>({
  valorTotal: 0,
  entrada: 0,
  juros: 0,
  inflacao: 0,
  qtdParcelas: 0,
  tabela: "PRICE",
});

watch(form, () => emit("update:modelValue", { ...form }), { deep: true });
</script>
