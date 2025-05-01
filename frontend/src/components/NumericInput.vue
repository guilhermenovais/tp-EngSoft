<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    type="text"
    :min="min"
    :max="max"
    :step="step"
    :rules="rules"
    @keydown="onKeyDown"
    @input="onInput"
    hide-details="auto"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: number | null;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  rules?: ((v: number | null) => boolean | string)[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
}>();

const internalValue = ref(props.modelValue?.toString() ?? "");

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val?.toString() ?? "";
  },
);

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let value = target.value.replace(",", ".");

  if (value === "" || isNaN(Number(value))) {
    emit("update:modelValue", null);
  } else {
    emit("update:modelValue", Number(value));
  }
}

function onKeyDown(event: KeyboardEvent) {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    ".",
    ",",
    "-",
  ];

  const isDigit = /^[0-9]$/.test(event.key);
  const isAllowed = allowedKeys.includes(event.key);

  if (!isDigit && !isAllowed) {
    event.preventDefault();
  }
}
</script>
