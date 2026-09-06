import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import BarraNavegacao from "@/componentes/BarraNavegacao";
import BotaoCurriculo from "@/componentes/BotaoCurriculo";
import { perfil } from "@/dados/perfil";
import "./globais.css";

const fonteTexto = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--fonte-texto",
});

const fonteTitulo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--fonte-titulo",
});

const nomeCompleto = `${perfil.primeiroNome} ${perfil.sobrenome}`;

export const metadata: Metadata = {
  title: {
    default: `${nomeCompleto} — ${perfil.cargo}`,
    template: `%s | ${nomeCompleto}`,
  },
  description: perfil.resumo,
  keywords: ["desenvolvedora de software", "Next.js", "Laravel", "portfólio", nomeCompleto],
  authors: [{ name: nomeCompleto }],
  openGraph: {
    title: `${nomeCompleto} — ${perfil.cargo}`,
    description: perfil.resumo,
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
};

export default function LayoutRaiz({ children: filhos }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fonteTexto.variable} ${fonteTitulo.variable}`}>
      <body>
        <BarraNavegacao />
        {filhos}
        <BotaoCurriculo />
      </body>
    </html>
  );
}
