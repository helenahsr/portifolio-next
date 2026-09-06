import type { Metadata } from "next";
import TituloSecao from "@/componentes/TituloSecao";
import { certificacoes, formacoes } from "@/dados/formacoes";
import estilosPagina from "@/estilos/pagina.module.css";
import estilos from "./graduacao.module.css";

export const metadata: Metadata = {
  title: "Graduação",
  description: "Formação acadêmica em Ciência da Computação e ensino técnico em Informática.",
};

export default function PaginaGraduacao() {
  return (
    <main className={estilosPagina.pagina}>
      <TituloSecao
        texto="Minha"
        destaque="Graduação"
        descricao="Formação acadêmica que sustenta a prática: da base técnica em Informática ao bacharelado em Ciência da Computação."
      />

      <ul className={estilos.formacoes}>
        {formacoes.map((formacao, indice) => (
          <li
            key={formacao.identificador}
            className={`${estilosPagina.cartao} ${estilos.formacao}`}
            style={{ animationDelay: `${indice * 110}ms` }}
          >
            <div className={estilos.cabecalho}>
              <div className={estilos.identidade}>
                <span className={estilos.nivel}>{formacao.nivel}</span>
                <h2 className={estilos.curso}>{formacao.curso}</h2>
                <p className={estilos.instituicao}>{formacao.instituicao}</p>
              </div>

              <div className={estilos.periodo}>
                <span className={estilosPagina.etiqueta}>{formacao.periodo}</span>
                <span className={formacao.progresso === 100 ? estilos.situacaoConcluida : estilos.situacao}>
                  {formacao.situacao}
                </span>
              </div>
            </div>

            <div className={estilos.barra} role="presentation">
              <span className={estilos.preenchimento} style={{ width: `${formacao.progresso}%` }} />
            </div>

            <ul className={estilos.destaques}>
              {formacao.destaques.map((destaque) => (
                <li key={destaque}>{destaque}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <section className={estilos.complementos}>
        <h2 className={estilos.tituloComplementos}>Atuações complementares</h2>
        <ul className={estilos.listaComplementos}>
          {certificacoes.map((certificacao) => (
            <li key={certificacao.nome} className={estilos.complemento}>
              <span className={estilos.anoComplemento}>{certificacao.ano}</span>
              <div>
                <p className={estilos.nomeComplemento}>{certificacao.nome}</p>
                <p className={estilos.instituicaoComplemento}>{certificacao.instituicao}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
