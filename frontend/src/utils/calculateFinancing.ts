import type { FinancingData } from "@/types/FinancingData";

export interface FinancingResult {
  valorNominalTotal: number;
  valorRealTotal: number;
}

export function calculateFinancing(
  data: FinancingData,
): FinancingResult | null {
  const { valorTotal, entrada, juros, inflacao, qtdParcelas, tabela } = data;

  if (
    valorTotal == null ||
    entrada == null ||
    juros == null ||
    inflacao == null ||
    qtdParcelas == null ||
    tabela == null
  ) {
    return null;
  }

  const jurosMensal = juros / 12 / 100;
  const inflacaoMensal = inflacao / 12 / 100;
  const valorFinanciado = valorTotal - entrada;

  let valorNominalTotal = 0;

  if (tabela === "PRICE") {
    const parcela =
      (valorFinanciado * jurosMensal) /
      (1 - Math.pow(1 + jurosMensal, -qtdParcelas));
    valorNominalTotal = parcela * qtdParcelas;
  } else {
    const amortizacao = valorFinanciado / qtdParcelas;
    for (let i = 0; i < qtdParcelas; i++) {
      const saldoDevedor = valorFinanciado - amortizacao * i;
      const jurosParcela = saldoDevedor * jurosMensal;
      valorNominalTotal += amortizacao + jurosParcela;
    }
  }

  const fatorInflacao = Math.pow(1 + inflacaoMensal, qtdParcelas);
  const valorRealTotal = valorNominalTotal / fatorInflacao;

  return {
    valorNominalTotal,
    valorRealTotal,
  };
}
