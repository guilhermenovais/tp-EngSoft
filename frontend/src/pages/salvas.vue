<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Simulações Salvas</h1>

    <div v-if="loading">Carregando simulações...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="simulations.length === 0">Nenhuma simulação salva encontrada.</div>

    <div v-else class="space-y-4">
      <div
        v-for="sim in simulations"
        :key="sim.id"
        class="border rounded-xl p-4 shadow-md"
      >
        <p><strong>Nome:</strong> {{ sim.nome }}</p>
        <p><strong>Valor Total:</strong> R$ {{ sim.valor_total.toLocaleString("pt-BR") }}</p>
        <p><strong>Entrada:</strong> R$ {{ sim.entrada.toLocaleString("pt-BR") }}</p>
        <p><strong>Juros (%):</strong> {{ sim.juros }}</p>
        <p><strong>Inflação (%):</strong> {{ sim.inflacao }}</p>
        <p><strong>Parcelas:</strong> {{ sim.qtd_parcelas }}</p>
        <p><strong>Tabela:</strong> {{ sim.tabela }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { SimulationService, SavedSimulation } from '@/services/SimulationService'

const simulations = ref<SavedSimulation[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchSimulations = async () => {
  try {
    simulations.value = await SimulationService.listSimulations()
  } catch (err) {
    error.value = 'Erro ao carregar simulações salvas.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchSimulations)
</script>
