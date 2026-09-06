import type { Experiencia } from "@/dados/experiencias";
import estilosPagina from "@/estilos/pagina.module.css";
import estilos from "./LinhaTempo.module.css";

function IconePasta() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7" strokeLinecap="round" />
    </svg>
  );
}

function IconeLocal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function IconeCalendario() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3.5V6M16 3.5V6" strokeLinecap="round" />
    </svg>
  );
}

export default function LinhaTempo({ registros }: { registros: Experiencia[] }) {
  return (
    <ol className={estilos.linhaTempo}>
      {registros.map((registro, indice) => (
        <li
          key={registro.identificador}
          className={`${estilos.item} ${indice % 2 === 0 ? estilos.itemEsquerda : estilos.itemDireita}`}
          style={{ animationDelay: `${indice * 120}ms` }}
        >
          <article className={`${estilosPagina.cartao} ${estilos.cartaoExperiencia}`}>
            <h2 className={estilos.cargo}>{registro.cargo}</h2>
            <span className={estilosPagina.etiqueta}>{registro.vinculo}</span>

            <div className={estilos.meta}>
              <span className={estilos.metaItem}>
                <IconePasta />
                {registro.empresa}
              </span>
              <span className={estilos.metaItem}>
                <IconeLocal />
                {registro.local}
              </span>
            </div>

            <ul className={estilos.atividades}>
              {registro.atividades.map((atividade) => (
                <li key={atividade}>{atividade}</li>
              ))}
            </ul>
          </article>

          <div className={estilos.marcador}>
            <span className={`${estilos.ponto} ${registro.atual ? estilos.pontoAtual : ""}`} />
            <div className={estilos.caixaPeriodo}>
              <span className={estilos.inicio}>
                <IconeCalendario />
                {registro.inicio}
              </span>
              <strong className={`${estilos.fim} ${registro.atual ? estilos.fimAtual : ""}`}>{registro.fim}</strong>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
