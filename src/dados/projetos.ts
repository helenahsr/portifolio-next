export type Projeto = {
  identificador: string;
  nome: string;
  categoria: string;
  descricao: string;
  tecnologias: string[];
  destaque: boolean;
  repositorio?: string;
  demonstracao?: string;
};

export const projetos: Projeto[] = [
  {
    identificador: "plataforma-pre-locacao",
    nome: "Plataforma de Pré-Locação",
    categoria: "Sistema web",
    descricao:
      "Fluxo completo de pré-locação para imobiliárias parceiras, cobrindo cadastro, análise de crédito e confecção de contratos, com integrações externas e painéis de acompanhamento.",
    tecnologias: ["Laravel", "Next.js", "MySQL", "PHP"],
    destaque: true,
  },
  {
    identificador: "api-serverless-integracoes",
    nome: "API Serverless de Integrações",
    categoria: "Back-end",
    descricao:
      "Conjunto de APIs para consumo interno e de terceiros construído em arquitetura Serverless, com foco em escalabilidade, baixo custo e observabilidade.",
    tecnologias: ["AWS Lambda", "API Gateway", "DynamoDB", "Node.js"],
    destaque: true,
  },
  {
    identificador: "portifolio-tridimensional",
    nome: "Portfólio Tridimensional",
    categoria: "Front-end",
    descricao:
      "Este portfólio: interface construída em Next.js com uma cena tridimensional interativa renderizada em tempo real com Three.js.",
    tecnologias: ["Next.js", "TypeScript", "Three.js", "React Three Fiber"],
    destaque: false,
    repositorio: "https://github.com/helenahsr/portifolio-next",
  },
  {
    identificador: "cotemig-code-club",
    nome: "COTEMIG Code Club",
    categoria: "Projeto social",
    descricao:
      "Material e atividades de introdução à programação para crianças e adolescentes, aplicados como instrutora do clube de programação do colégio.",
    tecnologias: ["Python", "Scratch", "Lógica de programação"],
    destaque: false,
  },
];
