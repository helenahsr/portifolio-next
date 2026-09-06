import type { Metadata } from "next";
import LinhaTempo from "@/componentes/LinhaTempo";
import TituloSecao from "@/componentes/TituloSecao";
import { experiencias } from "@/dados/experiencias";
import estilosPagina from "@/estilos/pagina.module.css";

export const metadata: Metadata = {
  title: "Experiência",
  description: "Trajetória profissional em desenvolvimento de software, suporte técnico e monitoria.",
};

export default function PaginaExperiencia() {
  return (
    <main className={estilosPagina.pagina}>
      <TituloSecao texto="Minha" destaque="Experiência" />
      <LinhaTempo registros={experiencias} />
    </main>
  );
}
