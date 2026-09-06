export type Formacao = {
  identificador: string;
  curso: string;
  nivel: string;
  instituicao: string;
  periodo: string;
  situacao: string;
  progresso: number;
  destaques: string[];
};

export const formacoes: Formacao[] = [
  {
    identificador: "ciencia-da-computacao",
    curso: "Ciência da Computação",
    nivel: "Bacharelado",
    instituicao: "Faculdade COTEMIG",
    periodo: "2024 — 2027",
    situacao: "7º período em andamento",
    progresso: 87,
    destaques: [
      "Estrutura de dados, algoritmos e complexidade computacional.",
      "Engenharia de software, arquitetura de sistemas e banco de dados.",
      "Projetos práticos com desenvolvimento web e integração de APIs.",
    ],
  },
  {
    identificador: "tecnico-informatica",
    curso: "Técnico em Informática",
    nivel: "Ensino Médio Técnico",
    instituicao: "Colégio COTEMIG",
    periodo: "2020 — 2022",
    situacao: "Concluído",
    progresso: 100,
    destaques: [
      "Programação Orientada a Objetos e Técnicas de Programação Avançada.",
      "Manutenção e configuração de computadores e redes.",
      "Base sólida em lógica de programação e desenvolvimento de sistemas.",
    ],
  },
];

export const certificacoes = [
  { nome: "Monitoria Técnica de Laboratório", instituicao: "Colégio COTEMIG", ano: "2023" },
  { nome: "Instrutora do COTEMIG Code Club", instituicao: "Colégio COTEMIG", ano: "2024" },
  { nome: "Monitoria na WCD COTEMIG", instituicao: "Faculdade COTEMIG", ano: "2026" },
];
