import api from "./api";

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
    const response = await api.post("/simulacao", data);

    if (response.status != 201) {
      throw new Error("Erro ao salvar simulação");
    }

    return await response.data;
  }

  static async getSimulation(id: number): Promise<SavedSimulation> {
    const response = await api.get(`/simulacao/${id}`);

    if (response.status != 200) {
      throw new Error("Erro ao buscar simulação");
    }

    return await response.data;
  }

  static async getAllSimulations(): Promise<SavedSimulation[]> {
    const response = await api.get("/simulacao/getAll");

    if (response.status != 200) {
      throw new Error("Erro ao buscar simulações");
    }

    return await response.data;
  }

  static async updateSimulation(
    id: number,
    data: NewSimulation,
  ): Promise<SavedSimulation> {
    const response = await api.put(`/simulacao/${id}`, data);

    if (response.status != 200) {
      throw new Error("Erro ao atualizar simulação");
    }

    return await response.data;
  }

  static async deleteSimulation(id: number): Promise<void> {
    const response = await api.delete(`/simulacao/${id}`);

    if (response.status != 204) {
      throw new Error("Erro ao excluir simulação");
    }
  }
}
