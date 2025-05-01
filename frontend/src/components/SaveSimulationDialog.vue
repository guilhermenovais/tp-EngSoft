<template>
  <v-dialog v-model="visible" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h6">Salvar Simulação</v-card-title>
      <v-card-text>
        <v-text-field
          label="Nome da simulação"
          v-model="name"
          outlined
          dense
          autofocus
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" text @click="cancel">Cancelar</v-btn>
        <v-btn color="success" @click="confirm" :disabled="!name">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from "vue";

const emit = defineEmits(["confirm", "cancel"]);
const props = defineProps<{ modelValue: boolean }>();

const visible = ref(props.modelValue);
const name = ref("");

watch(
  () => props.modelValue,
  (value) => {
    visible.value = value;
    if (value) name.value = "";
  },
);

function cancel() {
  emit("cancel");
}

function confirm() {
  emit("confirm", name.value);
}
</script>
