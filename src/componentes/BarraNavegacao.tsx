"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { itensNavegacao } from "@/dados/navegacao";
import { perfil } from "@/dados/perfil";
import estilos from "./BarraNavegacao.module.css";

export default function BarraNavegacao() {
  const caminhoAtual = usePathname();
  const [menuAberto, definirMenuAberto] = useState(false);
  const [rolagem, definirRolagem] = useState(false);

  useEffect(() => {
    const aoRolar = () => definirRolagem(window.scrollY > 24);

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    definirMenuAberto(false);
  }, [caminhoAtual]);

  const classesBarra = [estilos.barra, rolagem ? estilos.barraCompacta : "", menuAberto ? estilos.barraExpandida : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={estilos.cabecalho}>
      <nav className={classesBarra} aria-label="Navegação principal">
        <Link href="/" className={estilos.marca}>
          <span>{perfil.primeiroNome}</span>
          <span className={estilos.marcaDestaque}>{perfil.sobrenome}</span>
        </Link>

        <button
          type="button"
          className={estilos.gatilhoMenu}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => definirMenuAberto((anterior) => !anterior)}
        >
          <span className={menuAberto ? estilos.tracoAtivo : estilos.traco} />
          <span className={menuAberto ? estilos.tracoAtivo : estilos.traco} />
        </button>

        <ul className={`${estilos.lista} ${menuAberto ? estilos.listaAberta : ""}`}>
          {itensNavegacao.map((item) => {
            const ativo = caminhoAtual === item.caminho;

            return (
              <li key={item.caminho}>
                <Link
                  href={item.caminho}
                  className={`${estilos.elo} ${ativo ? estilos.eloAtivo : ""}`}
                  aria-current={ativo ? "page" : undefined}
                >
                  {item.rotulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
