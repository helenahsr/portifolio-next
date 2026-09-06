import { Quaternion, Vector3 } from "three";

export const ESPACAMENTO = 1.04;
export const TAMANHO_PECA = 0.94;
export const TAMANHO_ADESIVO = 0.78;
export const ESPESSURA_ADESIVO = 0.06;
export const COR_CORPO = "#0a1120";

export type IndiceEixo = 0 | 1 | 2;
export type Coordenadas = [number, number, number];

export type Adesivo = {
  chave: string;
  eixo: IndiceEixo;
  sentido: 1 | -1;
  cor: string;
  emissao: number;
};

export type Peca = {
  indice: number;
  coordenadas: Coordenadas;
  coordenadasIniciais: Coordenadas;
  adesivos: Adesivo[];
  posicaoBase: Vector3;
  quaternionBase: Quaternion;
};

export type Movimento = {
  eixo: IndiceEixo;
  camada: number;
  sentido: 1 | -1;
  duracao: number;
};

export type AlvoPeca = {
  indice: number;
  normal: Vector3;
  posicaoMundo: Vector3;
};

export type ControleCubo = {
  pecaSobPonteiro: AlvoPeca | null;
  iniciarArraste?: () => void;
  encerrarArraste?: () => void;
  orbitar?: (deslocamentoX: number, deslocamentoY: number) => void;
  girarPorArraste?: (deslocamentoX: number, deslocamentoY: number) => void;
  embaralhar?: () => void;
  restaurar?: () => void;
  registrarInteracao?: () => void;
};

export const eixosUnitarios: Vector3[] = [
  new Vector3(1, 0, 0),
  new Vector3(0, 1, 0),
  new Vector3(0, 0, 1),
];

const faces: Array<{ eixo: IndiceEixo; sentido: 1 | -1; cor: string; emissao: number }> = [
  { eixo: 0, sentido: 1, cor: "#0f6b74", emissao: 0.18 },
  { eixo: 0, sentido: -1, cor: "#2f5480", emissao: 0.06 },
  { eixo: 1, sentido: 1, cor: "#9db4d0", emissao: 0.06 },
  { eixo: 1, sentido: -1, cor: "#33425c", emissao: 0.03 },
  { eixo: 2, sentido: 1, cor: "#22d3ee", emissao: 0.55 },
  { eixo: 2, sentido: -1, cor: "#5b3fa8", emissao: 0.12 },
];

export function montarPecas(): Peca[] {
  const pecas: Peca[] = [];
  const posicoes = [-1, 0, 1];
  let indice = 0;

  for (const x of posicoes) {
    for (const y of posicoes) {
      for (const z of posicoes) {
        if (x === 0 && y === 0 && z === 0) {
          continue;
        }

        const coordenadas: Coordenadas = [x, y, z];
        const adesivos = faces
          .filter((face) => coordenadas[face.eixo] === face.sentido)
          .map((face) => ({ ...face, chave: `${indice}:${face.eixo}:${face.sentido}` }));

        pecas.push({
          indice,
          coordenadas,
          coordenadasIniciais: [x, y, z],
          adesivos,
          posicaoBase: new Vector3(x, y, z).multiplyScalar(ESPACAMENTO),
          quaternionBase: new Quaternion(),
        });

        indice += 1;
      }
    }
  }

  return pecas;
}

export function sortearMovimentos(quantidade: number, duracao: number): Movimento[] {
  const movimentos: Movimento[] = [];
  let anterior: Movimento | null = null;

  while (movimentos.length < quantidade) {
    const eixo = Math.floor(Math.random() * 3) as IndiceEixo;
    const camada = Math.floor(Math.random() * 3) - 1;
    const sentido: 1 | -1 = Math.random() > 0.5 ? 1 : -1;

    const anulaAnterior =
      anterior !== null && anterior.eixo === eixo && anterior.camada === camada && anterior.sentido !== sentido;

    if (anulaAnterior) {
      continue;
    }

    const movimento: Movimento = { eixo, camada, sentido, duracao };
    movimentos.push(movimento);
    anterior = movimento;
  }

  return movimentos;
}

export function indiceMaiorComponente(vetor: Vector3): IndiceEixo {
  const absolutos = [Math.abs(vetor.x), Math.abs(vetor.y), Math.abs(vetor.z)];
  let maior: IndiceEixo = 0;

  for (let posicao: IndiceEixo = 1; posicao < 3; posicao = (posicao + 1) as IndiceEixo) {
    if (absolutos[posicao] > absolutos[maior]) {
      maior = posicao;
    }
  }

  return maior;
}

export function normalCanonica(vetor: Vector3): Vector3 {
  const eixo = indiceMaiorComponente(vetor);
  const canonica = new Vector3();
  canonica.setComponent(eixo, Math.sign(vetor.getComponent(eixo)) || 1);

  return canonica;
}

export function alinharNaGrade(vetor: Vector3): Vector3 {
  for (let eixo = 0; eixo < 3; eixo += 1) {
    vetor.setComponent(eixo, Math.round(vetor.getComponent(eixo) / ESPACAMENTO) * ESPACAMENTO);
  }

  return vetor;
}

export function coordenadasDaPosicao(posicao: Vector3): Coordenadas {
  return [
    Math.round(posicao.x / ESPACAMENTO),
    Math.round(posicao.y / ESPACAMENTO),
    Math.round(posicao.z / ESPACAMENTO),
  ];
}

export function suavizar(progresso: number): number {
  return progresso < 0.5
    ? 4 * progresso * progresso * progresso
    : 1 - Math.pow(-2 * progresso + 2, 3) / 2;
}

export function limitar(valor: number, minimo: number, maximo: number): number {
  return Math.min(maximo, Math.max(minimo, valor));
}

export function dimensoesAdesivo(eixo: IndiceEixo): [number, number, number] {
  const dimensoes: [number, number, number] = [TAMANHO_ADESIVO, TAMANHO_ADESIVO, TAMANHO_ADESIVO];
  dimensoes[eixo] = ESPESSURA_ADESIVO;

  return dimensoes;
}

export function posicaoAdesivo(adesivo: Adesivo): [number, number, number] {
  const posicao: [number, number, number] = [0, 0, 0];
  posicao[adesivo.eixo] = adesivo.sentido * (TAMANHO_PECA / 2 + ESPESSURA_ADESIVO / 2 - 0.02);

  return posicao;
}
