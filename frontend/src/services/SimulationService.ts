export interface NewSimulation {
  nome: string;
  id_autor: number;
  valor_total: number;
  entrada: number;
  juros: number;
  inflacao: number;
  qtd_parcelas: number;
  tabela: "SAC" | "PRICE";
}

export interface SavedSimulation {
  id: number;
  nome: string;
  id_autor: number;
  valor_total: number;
  entrada: number;
  juros: number;
  inflacao: number;
  qtd_parcelas: number;
  tabela: "SAC" | "PRICE";
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

  static async getSimulation(id: number): Promise<SavedSimulation> {
    const response = await fetch(`/backend/simulacao/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar simulação");
    }

    return await response.json();
  }

  static async updateSimulation(
    id: number,
    data: NewSimulation,
  ): Promise<SavedSimulation> {
    const response = await fetch(`/backend/simulacao/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar simulação");
    }

    return await response.json();
  }

  static async deleteSimulation(id: number): Promise<void> {
    const response = await fetch(`/backend/simulacao/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir simulação");
    }
  }
}
