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

function converterAnualParaMensal(taxaAnual: number): number {
  return Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
}

function calcularInflacaoAcumulada(
  inflacaoMensal: number,
  parcela: number,
): number {
  return Math.pow(1 + inflacaoMensal, parcela);
}

function calcularParcelasPrice(
  valorFinanciado: number,
  jurosMensal: number,
  inflacaoMensal: number,
  qtdParcelas: number,
): Parcela[] {
  const i = jurosMensal;
  const n = qtdParcelas;
  const PV = valorFinanciado;
  const parcelaFixa = (PV * i) / (1 - Math.pow(1 + i, -n));

  const parcelas: Parcela[] = [];
  for (let k = 1; k <= n; k++) {
    const inflacaoAcumulada = calcularInflacaoAcumulada(inflacaoMensal, k);
    const valorReal = parcelaFixa / inflacaoAcumulada;

    parcelas.push({
      numero: k,
      valorNominal: parseFloat(parcelaFixa.toFixed(2)),
      valorReal: parseFloat(valorReal.toFixed(2)),
    });
  }

  return parcelas;
}

function calcularParcelasSac(
  valorFinanciado: number,
  jurosMensal: number,
  inflacaoMensal: number,
  qtdParcelas: number,
): Parcela[] {
  const amortizacao = valorFinanciado / qtdParcelas;
  const parcelas: Parcela[] = [];

  for (let k = 1; k <= qtdParcelas; k++) {
    const saldoDevedor = valorFinanciado - amortizacao * (k - 1);
    const jurosParcela = saldoDevedor * jurosMensal;
    const valorNominal = amortizacao + jurosParcela;
    const inflacaoAcumulada = calcularInflacaoAcumulada(inflacaoMensal, k);
    const valorReal = valorNominal / inflacaoAcumulada;

    parcelas.push({
      numero: k,
      valorNominal: parseFloat(valorNominal.toFixed(2)),
      valorReal: parseFloat(valorReal.toFixed(2)),
    });
  }

  return parcelas;
}

export function calculateFinancing(
  input: FinancingInput,
): FinancingCalculation {
  const { valorTotal, entrada, juros, inflacao, qtdParcelas, tabela } = input;

  const valorFinanciado = valorTotal - entrada;
  if (valorFinanciado <= 0 || qtdParcelas <= 0) {
    return {
      valorNominalTotal: 0,
      valorRealTotal: 0,
      parcelas: [],
    };
  }

  const jurosMensal = converterAnualParaMensal(juros);
  const inflacaoMensal = converterAnualParaMensal(inflacao);

  const parcelas =
    tabela === "PRICE"
      ? calcularParcelasPrice(
          valorFinanciado,
          jurosMensal,
          inflacaoMensal,
          qtdParcelas,
        )
      : calcularParcelasSac(
          valorFinanciado,
          jurosMensal,
          inflacaoMensal,
          qtdParcelas,
        );

  return {
    valorNominalTotal: parseFloat(
      parcelas.reduce((sum, p) => sum + p.valorNominal, 0).toFixed(2),
    ),
    valorRealTotal: parseFloat(
      parcelas.reduce((sum, p) => sum + p.valorReal, 0).toFixed(2),
    ),
    parcelas,
  };
}
