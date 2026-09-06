import type { Metadata } from "next";
import Image from "next/image";
import TituloSecao from "@/componentes/TituloSecao";
import { perfil, tecnologias } from "@/dados/perfil";
import estilosPagina from "@/estilos/pagina.module.css";
import estilos from "./sobre.module.css";

export const metadata: Metadata = {
  title: "Sobre Mim",
  description: perfil.resumo,
};

export default function PaginaSobreMim() {
  return (
    <main className={estilosPagina.pagina}>
      <TituloSecao texto="Sobre" destaque="Mim" />

      <div className={estilosPagina.duasColunas}>
        <div className={estilos.conteudo}>
          <div className={estilosPagina.textoCorrido}>
            <p>
              <strong>Desenvolvedora de software</strong> com um perfil orientado à resolução de problemas e à
              construção de ferramentas que otimizam o dia a dia.
            </p>
            <p>
              Minha jornada na tecnologia começou com o técnico em Informática no <em>Colégio COTEMIG</em> e, hoje,
              curso o 7º período do bacharelado em <em>Ciência da Computação</em>.
            </p>
            <p>
              No meu dia a dia, faço parte de uma equipe de <u>desenvolvimento</u> onde atuo diretamente na criação e
              manutenção de soluções para o mercado imobiliário. Valorizo muito a troca de <u>conhecimentos</u>, o
              trabalho em equipe e a clareza na comunicação, pois sei que o <u>sucesso</u> de um sistema depende tanto
              do código bem escrito quanto do entendimento das necessidades de quem vai utilizá-lo.
            </p>
          </div>

          <div className={estilos.tecnologias}>
            <h2 className={estilos.subtitulo}>Tecnologias do dia a dia</h2>
            <ul className={estilosPagina.marcadores}>
              {tecnologias.map((tecnologia) => (
                <li key={tecnologia} className={estilosPagina.marcador}>
                  {tecnologia}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className={estilos.moldura}>
          <Image
            className={estilos.retrato}
            src={perfil.foto}
            alt={`${perfil.primeiroNome} ${perfil.sobrenome}`}
            width={1012}
            height={1348}
            sizes="(max-width: 980px) 92vw, 480px"
            priority
          />
        </figure>
      </div>
    </main>
  );
}
