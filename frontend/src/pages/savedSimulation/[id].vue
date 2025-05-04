<template>
  <v-container>
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="auto">
        <v-btn @click="goBack" variant="text" color="primary">
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <h2 class="text-h5 mr-2">{{ formData.nome }}</h2>
        <v-btn icon variant="text" @click="editDialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <Simulation
      v-model="formData"
      @saveButtonClicked="onSaveButtonClicked"
      :saveButtonLoading="saveButtonLoading"
    />

    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      timeout="3000"
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.visible = false"
          >OK</v-btn
        >
      </template>
    </v-snackbar>

    <v-dialog v-model="editDialog" max-width="500">
      <v-card @keyup.enter="saveName">
        <v-card-title>Editar Nome da Simulação</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedName"
            label="Nome"
            variant="outlined"
            autofocus
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="editDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveName">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { SimulationService } from "@/services/SimulationService";
import type { FinancingInput } from "@/utils/calculateFinancing";
import { useUsuarioStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const simulationId = parseInt((route.params as any).id as string, 10);

const loaded = ref(false);
const editDialog = ref(false);
const editedName = ref("");

const formData = ref<FinancingInput & { nome: string }>({
  nome: "",
  valorTotal: 0,
  entrada: 0,
  juros: 0,
  inflacao: 0,
  qtdParcelas: 0,
  tabela: "PRICE",
});

const saveButtonLoading = ref(false);
const usuarioStore = useUsuarioStore();

const snackbar = ref({
  visible: false,
  message: "",
  color: "success",
});

function goBack() {
  router.back();
}

function saveName() {
  formData.value.nome = editedName.value.trim() || formData.value.nome;
  editDialog.value = false;
}

onMounted(async () => {
  try {
    const data = await SimulationService.getSimulation(simulationId);
    formData.value = {
      nome: data.nome,
      valorTotal: data.valor_total,
      entrada: data.entrada,
      juros: data.juros,
      inflacao: data.inflacao,
      qtdParcelas: data.qtd_parcelas,
      tabela: data.tabela,
    };
    editedName.value = data.nome;
    loaded.value = true;
  } catch (err) {
    console.error("Erro ao carregar simulação", err);
    snackbar.value = {
      visible: true,
      message: "Simulação não encontrada",
      color: "error",
    };
  }
});

async function onSaveButtonClicked() {
  try {
    const userId = usuarioStore.usuario.id;
    saveButtonLoading.value = true;
    await SimulationService.updateSimulation(simulationId, {
      nome: formData.value.nome,
      id_autor: userId,
      valor_total: formData.value.valorTotal,
      entrada: formData.value.entrada,
      juros: formData.value.juros,
      inflacao: formData.value.inflacao,
      qtd_parcelas: formData.value.qtdParcelas,
      tabela: formData.value.tabela,
    });
    saveButtonLoading.value = false;
    snackbar.value = {
      visible: true,
      message: "Simulação atualizada com sucesso",
      color: "green",
    };
  } catch (err) {
    console.error("Erro ao salvar simulação", err);
    snackbar.value = {
      visible: true,
      message: "Erro ao atualizar simulação",
      color: "error",
    };
  }
}
</script>
