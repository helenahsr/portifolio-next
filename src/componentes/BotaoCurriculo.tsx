import { perfil } from "@/dados/perfil";
import estilos from "./BotaoCurriculo.module.css";

export default function BotaoCurriculo() {
  return (
    <a
      className={estilos.botao}
      href={perfil.arquivoCurriculo}
      download
      title="Baixar currículo"
      aria-label="Baixar currículo"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M12 3v12" strokeLinecap="round" />
        <path d="m7 11 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" strokeLinecap="round" />
      </svg>
      <span className={estilos.rotulo}>Currículo</span>
    </a>
  );
}
