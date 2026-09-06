import Link from "next/link";
import CuboMagico from "@/componentes/CuboMagico";
import { perfil } from "@/dados/perfil";
import estilos from "./inicio.module.css";

export default function PaginaInicial() {
  return (
    <main className={estilos.inicio}>
      <section className={estilos.apresentacao}>
        <span className={estilos.localidade}>
          <span className={estilos.pontoVivo} />
          {perfil.localidade}
        </span>

        <h1 className={estilos.nome}>
          <span className={estilos.linhaNome}>{perfil.primeiroNome}</span>
          <span className={estilos.linhaNome}>{perfil.sobrenome}</span>
        </h1>

        <p className={estilos.cargo}>{perfil.cargo}</p>

        <div className={estilos.acoes}>
          <Link href="/projetos" className={estilos.acaoPrincipal}>
            Ver projetos
          </Link>
          <Link href="/sobre-mim" className={estilos.acaoSecundaria}>
            Sobre mim
          </Link>
        </div>

        <ul className={estilos.contatos}>
          {perfil.contatos.map((contato) => (
            <li key={contato.rotulo}>
              <a href={contato.endereco} target="_blank" rel="noreferrer noopener">
                {contato.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={estilos.cena}>
        <CuboMagico />
      </section>
    </main>
  );
}
