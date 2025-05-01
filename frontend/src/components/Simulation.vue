<template>
  <FinancingForm v-model="localFormData" />

  <div class="d-flex fill-width flex-row-reverse">
    <v-btn
      :disabled="financingCalculation.parcelas.length === 0"
      color="primary"
      @click="emit('saveButtonClicked')"
      :loading="saveButtonLoading"
    >
      Salvar simulação
    </v-btn>
  </div>

  <FinancingResult :result="financingCalculation" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import FinancingForm from "@/components/FinancingForm.vue";
import FinancingResult from "@/components/FinancingResult.vue";
import {
  calculateFinancing,
  type FinancingInput,
} from "@/utils/calculateFinancing";

const props = defineProps<{
  modelValue: FinancingInput;
  saveButtonLoading: boolean;
}>();

const emit = defineEmits<{
  (e: "saveButtonClicked"): void;
  (e: "update:modelValue", value: FinancingInput): void;
}>();

const localFormData = computed({
  get: () => props.modelValue,
  set: (val: FinancingInput) => emit("update:modelValue", val),
});

const financingCalculation = computed(() =>
  calculateFinancing(localFormData.value),
);
</script>
