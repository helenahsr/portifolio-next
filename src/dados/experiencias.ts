export type Experiencia = {
  identificador: string;
  cargo: string;
  vinculo: string;
  empresa: string;
  local: string;
  inicio: string;
  fim: string;
  atual: boolean;
  atividades: string[];
};

export const experiencias: Experiencia[] = [
  {
    identificador: "desenvolvedora-jr-ii",
    cargo: "Desenvolvedora de Software JR II",
    vinculo: "Tempo integral",
    empresa: "UP Estate",
    local: "Belo Horizonte",
    inicio: "2025 Agosto",
    fim: "Atual",
    atual: true,
    atividades: [
      "Atuação direta no fluxo de pré-locação, desenvolvendo e mantendo funcionalidades que abrangem desde o cadastro de imobiliárias e análise de crédito até a confecção de contratos em sistemas legados (PHP e MySQL).",
      "Criação de novos sistemas e soluções escaláveis voltadas para imobiliárias parceiras, utilizando uma stack moderna composta por Laravel, Next.js e MySQL.",
      "Desenvolvimento e manutenção de APIs para integrações de terceiros e consumo interno/externo, empregando arquitetura Serverless com AWS Lambda, API Gateway e DynamoDB.",
      "Trabalho sob a metodologia ágil Scrum, com participação ativa em code reviews, resolução de bugs e apoio ao suporte interno.",
      "Levantamento de requisitos e atendimento direto a solicitações, garantindo que as novas funcionalidades entregues atendam exatamente às necessidades do parceiro imobiliário.",
    ],
  },
  {
    identificador: "analista-suporte-desenvolvimento",
    cargo: "Analista de Suporte e Desenvolvimento",
    vinculo: "Estágio",
    empresa: "UP Estate",
    local: "Belo Horizonte",
    inicio: "2024 Dezembro",
    fim: "2025 Agosto",
    atual: false,
    atividades: [
      "Atendimento e suporte direto aos colaboradores internos, realizando desde análises de casos e problemas financeiros até alterações massificadas em banco de dados e execução de rotinas que não possuíam interface no sistema.",
      "Desenvolvimento de correções e novas funcionalidades para os sistemas da empresa (PHP e MySQL), com destaque para a criação e estruturação do sistema de crédito interno.",
      "Criação de scripts em Python e utilização de Postman e AWS para integrações e alterações pontuais e complexas na estrutura financeira do sistema.",
      "Desenvolvimento e implementação de um sistema interno de Kanban para gestão de chamados e emissão de relatórios mensais, otimizando o fluxo de trabalho e melhorando o SLA de atendimento e os logs de alterações em 90%.",
      "Trabalho colaborativo com desenvolvedores Plenos, Seniores e com o Diretor de TI, auxiliando na triagem e distribuição de solicitações de correções para a equipe, além de atuar ativamente na documentação de processos, tarefas e novas funcionalidades.",
    ],
  },
  {
    identificador: "monitora-tecnica-laboratorio",
    cargo: "Monitora Técnica de Laboratório",
    vinculo: "Estágio",
    empresa: "Colégio COTEMIG",
    local: "Belo Horizonte",
    inicio: "2023 Janeiro",
    fim: "2024 Dezembro",
    atual: false,
    atividades: [
      "Responsável pela organização e cuidado dos laboratórios do colégio, resolvendo problemas de manutenção e configuração se necessário.",
      "Orientar os alunos nas aulas de laboratório e nos horários de monitoria, ajudando-os com o que fosse necessário para estudar ou fazer alguma atividade.",
      "Substituição de professores de Programação Orientada a Objetos, Manutenção e Configuração de Computadores, Informática e Técnicas de Programação Avançada.",
      "Instrutora do COTEMIG Code Club, um projeto social para crianças e adolescentes no incentivo à programação.",
    ],
  },
];
