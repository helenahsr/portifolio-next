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
    nome: "Plataforma de Análise de Crédito",
    categoria: "Sistema web",
    descricao:
      "Sistema web para análise de crédito e pré-locação de imóveis, com funcionalidades que abrangem desde o cadastro de imobiliárias e análise de crédito até a confecção de contratos.",
    tecnologias: ["Laravel", "MySQL", "PHP"],
    destaque: true,
  },
  {
    identificador: "api-serverless-integracoes",
    nome: "API Serverless de Integrações",
    categoria: "Back-end",
    descricao:
      "Conjunto de APIs para consumo interno e de terceiros construído em arquitetura Serverless, com foco em escalabilidade, baixo custo e observabilidade.",
    tecnologias: ["AWS Lambda", "API Gateway", "DynamoDB", "Python"],
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
    identificador: "fiction",
    nome: "Fiction Fanfics",
    categoria: "Sistema web",
    descricao:
      "Sistema web para publicação e leitura de fanfics, com funcionalidades de cadastro, login, criação de histórias, comentários e avaliações.",
    tecnologias: ["React", "Node.js", "Express", "MongoDB"],
    destaque: true
  },
  {
    identificador: "corretor-ortografico",
    nome: "Autocomplete Baseado em Trie",
    categoria: "Algoritmo",
    descricao:
      "Este é um projeto simples de autocompletar/corretor ortográfico implementado utilizando a estrutura de dados Trie (também conhecida como árvore de prefixos).",
    tecnologias: ["C#", "Algoritmos", "Estruturas de Dados"],
    destaque: false,
    repositorio: "https://github.com/helenahsr/CorretorOrtograficoBaseadoEmTrie",
  },
  {
    identificador: "cotemig-code-club",
    nome: "COTEMIG Code Club",
    categoria: "Projeto social",
    descricao:
      "Material e atividades de introdução à programação para crianças e adolescentes, aplicados como instrutora do clube de programação do colégio.",
    tecnologias: ["Python", "Scratch", "HTML/CSS", "Portugol"],
    destaque: false,
  },
];
