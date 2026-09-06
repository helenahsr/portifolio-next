# Portfólio — Helena Rezende

Portfólio pessoal em **Next.js (App Router)** + **TypeScript** + **Three.js** (via React Three Fiber), com cena 3D de cubo mágico na home. Estilos em CSS Modules, tema escuro, sem bibliotecas de UI.

## Rodando

```bash
npm install
npm run dev
npm run build
npm start
```

## Páginas

| Rota | Arquivo | Conteúdo |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Nome, cargo e o cubo mágico girando em Three.js |
| `/sobre-mim` | `src/app/sobre-mim/page.tsx` | Texto de apresentação, foto e tecnologias |
| `/projetos` | `src/app/projetos/page.tsx` | Cartões de projetos |
| `/experiencia` | `src/app/experiencia/page.tsx` | Linha do tempo profissional |
| `/graduacao` | `src/app/graduacao/page.tsx` | Formação acadêmica e atuações complementares |

## Estrutura

```
src/
  app/            paginas (App Router), estilos globais e icone do site
  componentes/    BarraNavegacao, BotaoCurriculo, CuboMagico, LinhaTempo, TituloSecao
  dados/          conteudo editavel: perfil, navegacao, projetos, experiencias, formacoes
  estilos/        pagina.module.css (grades, cartoes, etiquetas compartilhadas)
public/imagens/   imagens estaticas
```

Todo o conteúdo textual fica em `src/dados/` — para atualizar o portfólio, edite esses arquivos, sem tocar nos componentes.

## Pendências de conteúdo

Alguns dados não vinham nas referências e entraram como espaço reservado:

1. **`public/curriculo.pdf`** — o botão flutuante aponta para esse arquivo; adicione o PDF (ou mude `perfil.arquivoCurriculo`).
2. **Links de contato** — `perfil.contatos` está com GitHub, LinkedIn e e-mail fictícios.
3. **Instituição da graduação** — `formacoes.ts` está com `PUC Minas` como suposição; confirme.
4. **Projetos** — `projetos.ts` foi montado a partir das atividades descritas na experiência; ajuste descrições, repositórios e demonstrações.

`public/imagens/perfil.svg` era o espaço reservado da foto e pode ser apagado — a página usa `perfil.foto`, hoje apontando para `helena.jpg`.

## Cena 3D

O cubo é um cubo mágico funcional, dividido em três arquivos:

- `src/logica/cuboMagico.ts` — peças, adesivos, cores das faces, sorteio de movimentos e utilitários de eixo/grade. Sem React.
- `src/componentes/CenaCubo.tsx` — a cena Three.js: 26 peças arredondadas em volta de um núcleo escuro, órbita com inércia, giro de camadas e `Bloom`.
- `src/componentes/CuboMagico.tsx` — o `Canvas`, o arraste (eventos de ponteiro) e os botões.

Como funciona a interação:

- **Arrastar fora das peças** gira o cubo inteiro, com inércia; após ~2,4s parado ele volta a girar sozinho.
- **Arrastar sobre uma peça** gira a camada dela 90°. A direção do arraste é projetada na tela sobre os dois eixos da face clicada; o de maior projeção define o eixo de rotação e o sentido.
- **Embaralhar / Resetar** enfileiram movimentos e a restauração animada ao estado resolvido.
- Ao carregar, o cubo aplica um embaralhamento curto de 7 movimentos como animação de entrada.

Cada peça guarda `coordenadas` (posição lógica na grade 3×3×3) e `quaternionBase` (orientação acumulada). O giro anima uma rotação em torno do eixo e, ao terminar, comita a nova posição alinhada à grade — por isso o cubo nunca acumula erro de ponto flutuante.

Pontos de ajuste rápido: `faces` em `logica/cuboMagico.ts` (cores e brilho de cada face), `DURACAO_GIRO` e `QUANTIDADE_EMBARALHAMENTO`, o `Bloom` e a `camera` do `Canvas`.

`prefers-reduced-motion` desliga o giro automático, a flutuação e o embaralhamento de entrada; os giros continuam funcionando, mais rápidos.
