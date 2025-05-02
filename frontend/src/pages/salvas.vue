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

        <button @click="editSimulation(sim)" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Editar
        </button>
        <button @click="deleteSimulation(sim.id)" class="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SimulationService, SavedSimulation } from '@/services/SimulationService'

const simulations = ref<SavedSimulation[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const router = useRouter()

const fetchSimulations = async () => {
  try {
    simulations.value = await SimulationService.listSimulations()
  } catch (err) {
    error.value = 'Erro ao carregar simulações salvas.'
  } finally {
    loading.value = false
  }
}

const editSimulation = (simulation: SavedSimulation) => {
  router.push({ name: 'Calculadora', state: { simulation } })
}

const deleteSimulation = async (id: number) => {
  try {
    await SimulationService.deleteSimulation(id)
    simulations.value = simulations.value.filter((s) => s.id !== id)
  } catch (err) {
    alert('Erro ao excluir simulação.')
  }
}

onMounted(fetchSimulations)
</script>
