export type FinancingInput = {
  valorTotal: number;
  entrada: number;
  juros: number; // anual (%)
  inflacao: number; // anual (%)
  qtdParcelas: number;
  tabela: "SAC" | "PRICE";
};

export type Parcela = {
  numero: number;
  valorNominal: number;
  valorReal: number;
};

export type FinancingCalculation = {
  valorNominalTotal: number;
  valorRealTotal: number;
  parcelas: Parcela[];
};

export function calculateFinancing(
  input: FinancingInput,
): FinancingCalculation {
  const { valorTotal, entrada, juros, inflacao, qtdParcelas, tabela } = input;

  const valorFinanciado = valorTotal - entrada;
  if (valorFinanciado <= 0 || qtdParcelas <= 0)
    return {
      valorNominalTotal: 0,
      valorRealTotal: 0,
      parcelas: [],
    };

  const jurosMensal = Math.pow(1 + juros / 100, 1 / 12) - 1;
  const inflacaoMensal = Math.pow(1 + inflacao / 100, 1 / 12) - 1;

  const parcelas: Parcela[] = [];

  if (tabela === "PRICE") {
    const i = jurosMensal;
    const n = qtdParcelas;
    const PV = valorFinanciado;
    const parcelaFixa = (PV * i) / (1 - Math.pow(1 + i, -n));

    for (let k = 1; k <= n; k++) {
      const inflacaoAcumulada = Math.pow(1 + inflacaoMensal, k);
      const valorReal = parcelaFixa / inflacaoAcumulada;

      parcelas.push({
        numero: k,
        valorNominal: parseFloat(parcelaFixa.toFixed(2)),
        valorReal: parseFloat(valorReal.toFixed(2)),
      });
    }
  } else if (tabela === "SAC") {
    const amortizacao = valorFinanciado / qtdParcelas;

    for (let k = 1; k <= qtdParcelas; k++) {
      const saldoDevedor = valorFinanciado - amortizacao * (k - 1);
      const jurosParcela = saldoDevedor * jurosMensal;
      const valorNominal = amortizacao + jurosParcela;
      const inflacaoAcumulada = Math.pow(1 + inflacaoMensal, k);
      const valorReal = valorNominal / inflacaoAcumulada;

      parcelas.push({
        numero: k,
        valorNominal: parseFloat(valorNominal.toFixed(2)),
        valorReal: parseFloat(valorReal.toFixed(2)),
      });
    }
  }

  return {
    valorNominalTotal: parcelas.reduce(
      (accumulator, curr) => (accumulator += curr.valorNominal),
      0,
    ),
    valorRealTotal: parcelas.reduce(
      (accumulator, curr) => (accumulator += curr.valorReal),
      0,
    ),
    parcelas: parcelas,
  };
}
