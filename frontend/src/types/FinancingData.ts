export interface FinancingData {
  valorTotal: number | null;
  entrada: number | null;
  juros: number | null;
  inflacao: number | null;
  qtdParcelas: number | null;
  tabela: "SAC" | "PRICE" | null;
}
