<template>
  <h2 class="text-h5 mb-6">Simulações Salvas</h2>

  <v-container fluid>
    <v-row>
      <v-col v-for="simulation in simulations" :key="simulation.id" cols="12">
        <v-card
          class="pa-4 d-flex justify-space-between align-center"
          elevation="2"
        >
          <div>
            <div class="text-subtitle-1 font-weight-medium">
              {{ simulation.nome }}
            </div>
          </div>

          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              variant="text"
              icon
              @click="goToSimulation(simulation.id)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              icon
              @click="deleteSimulation(simulation.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-alert type="info" v-if="!simulations.length" class="mt-4">
      Nenhuma simulação encontrada.
    </v-alert>
  </v-container>

  <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar.visible = false">
        OK
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { SimulationService } from "@/services/SimulationService";
import { useUsuarioStore } from "@/stores/user";

const router = useRouter();
const usuarioStore = useUsuarioStore();

const simulations = ref<{ id: number; nome: string }[]>([]);

const snackbar = ref({
  visible: false,
  message: "",
  color: "success",
});

async function loadSimulations() {
  try {
    const userId = usuarioStore.usuario.id;
    simulations.value = (await SimulationService.getAllSimulations()).filter(
      (simulation) => simulation.id_autor === userId,
    );
  } catch (err) {
    console.error("Erro ao carregar simulações", err);
    snackbar.value = {
      visible: true,
      message: "Erro ao carregar simulações",
      color: "error",
    };
  }
}

onMounted(loadSimulations);

function goToSimulation(id: number) {
  router.push(`/savedSimulation/${id}`);
}

async function deleteSimulation(id: number) {
  try {
    await SimulationService.deleteSimulation(id);
    snackbar.value = {
      visible: true,
      message: "Simulação excluída com sucesso",
      color: "green",
    };
    await loadSimulations();
  } catch (err) {
    console.error("Erro ao excluir simulação", err);
    snackbar.value = {
      visible: true,
      message: "Erro ao excluir simulação",
      color: "error",
    };
  }
}
</script>
