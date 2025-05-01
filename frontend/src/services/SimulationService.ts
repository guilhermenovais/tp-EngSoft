export interface NewSimulation {
  nome: string;
  id_autor: number;
  valor_total: number;
  entrada: number;
  juros: number;
  inflacao: number;
  qtd_parcelas: number;
  tabela: string;
}

export interface SavedSimulation {
  id: number;
}

export class SimulationService {
  static async saveSimulation(data: NewSimulation): Promise<SavedSimulation> {
    const response = await fetch("/backend/simulacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar simulação");
    }

    return await response.json();
  }
}
