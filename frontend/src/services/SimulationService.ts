export interface NovaSimulacao {
  nome: string;
  id_autor: number;
  valor_total: number;
  entrada: number;
  juros: number;
  inflacao: number;
  qtd_parcelas: number;
  tabela: string;
}

export interface SimulacaoSalva {
  id: number;
}

export class SimulacaoService {
  static async salvarSimulacao(data: NovaSimulacao): Promise<SimulacaoSalva> {
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
