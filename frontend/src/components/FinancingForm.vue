<template>
  <v-form>
    <v-row dense>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="localForm.valorTotal"
          label="Valor Total"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="localForm.entrada"
          label="Entrada"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="localForm.juros"
          label="Juros ao ano (%)"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="localForm.inflacao"
          label="Inflação ao ano (%)"
          :min="0"
          :step="0.01"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <NumericInput
          v-model="localForm.qtdParcelas"
          label="Quantidade de parcelas"
          :min="1"
          :step="1"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="localForm.tabela"
          :items="['SAC', 'PRICE']"
          label="Tabela"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { FinancingInput } from "@/utils/calculateFinancing";

const props = defineProps<{
  modelValue: FinancingInput;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: FinancingInput): void;
}>();

const localForm = computed({
  get: () => props.modelValue,
  set: (val: FinancingInput) => emit("update:modelValue", val),
});
</script>
