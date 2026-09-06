import type { Metadata } from "next";
import TituloSecao from "@/componentes/TituloSecao";
import { projetos } from "@/dados/projetos";
import estilosPagina from "@/estilos/pagina.module.css";
import estilos from "./projetos.module.css";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Sistemas, APIs e interfaces que desenvolvi ao longo da carreira.",
};

export default function PaginaProjetos() {
  return (
    <main className={estilosPagina.pagina}>
      <TituloSecao
        texto="Meus"
        destaque="Projetos"
        descricao="Uma seleção de sistemas, APIs e interfaces que construí — do fluxo completo de pré-locação a integrações serverless."
      />

      <ul className={estilosPagina.grade}>
        {projetos.map((projeto, indice) => (
          <li
            key={projeto.identificador}
            className={`${estilosPagina.cartao} ${estilos.projeto} ${projeto.destaque ? estilos.projetoDestaque : ""}`}
            style={{ animationDelay: `${indice * 90}ms` }}
          >
            <div className={estilos.topo}>
              <span className={estilos.categoria}>{projeto.categoria}</span>
              {projeto.destaque ? <span className={estilosPagina.etiqueta}>Destaque</span> : null}
            </div>

            <h2 className={estilos.nome}>{projeto.nome}</h2>
            <p className={estilos.descricao}>{projeto.descricao}</p>

            <ul className={estilosPagina.marcadores}>
              {projeto.tecnologias.map((tecnologia) => (
                <li key={tecnologia} className={estilosPagina.marcador}>
                  {tecnologia}
                </li>
              ))}
            </ul>

            {projeto.repositorio || projeto.demonstracao ? (
              <div className={estilos.elos}>
                {projeto.repositorio ? (
                  <a href={projeto.repositorio} target="_blank" rel="noreferrer noopener">
                    Repositório
                  </a>
                ) : null}
                {projeto.demonstracao ? (
                  <a href={projeto.demonstracao} target="_blank" rel="noreferrer noopener">
                    Ver online
                  </a>
                ) : null}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
