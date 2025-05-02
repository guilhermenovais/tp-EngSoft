<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-6">Simulações Salvas</h1>

    <div v-if="loading">Carregando simulações...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="simulations.length === 0">Nenhuma simulação salva encontrada.</div>

    <div v-else class="space-y-6">
      <div
        v-for="sim in simulations"
        :key="sim.id"
        class="border border-gray-600 rounded-lg p-6 bg-[#121212]"
      >
        <h2 class="text-lg font-semibold mb-4">Parâmetros da Simulação</h2>

        <p><strong>Nome:</strong> {{ sim.nome }}</p>
        <p><strong>Valor Total:</strong> R$ {{ sim.valor_total.toLocaleString('pt-BR') }}</p>
        <p><strong>Entrada:</strong> R$ {{ sim.entrada.toLocaleString('pt-BR') }}</p>
        <p><strong>Juros (%):</strong> {{ sim.juros }}</p>
        <p><strong>Inflação (%):</strong> {{ sim.inflacao }}</p>
        <p><strong>Parcelas:</strong> {{ sim.qtd_parcelas }}</p>
        <p><strong>Tabela:</strong> {{ sim.tabela }}</p>

        <div class="flex space-x-4 mt-4">
          <v-btn color="primary" @click="confirmEdit(sim.id)">Editar</v-btn>
          <v-btn color="error" @click="deleteSimulation(sim.id)">Excluir</v-btn>
        </div>
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

const deleteSimulation = async (id: number) => {
  try {
    await SimulationService.deleteSimulation(id)
    simulations.value = simulations.value.filter((s) => s.id !== id)
  } catch (err) {
    alert('Erro ao excluir simulação.')
  }
}

const confirmEdit = async (id: number) => {
  const confirm = window.confirm("Você deseja editar esta simulação? Ela será removida e substituída.")
  if (!confirm) return

  try {
    await deleteSimulation(id)
    router.push('/')
  } catch (err) {
    alert('Erro ao excluir a simulação para edição.')
  }
}

onMounted(fetchSimulations)
</script>
