"use client";

import { useEffect, useRef, useState, type PointerEvent as EventoPonteiro } from "react";
import { Canvas } from "@react-three/fiber";
import CenaCubo from "./CenaCubo";
import type { ControleCubo } from "@/logica/cuboMagico";
import estilos from "./CuboMagico.module.css";

const DISTANCIA_MINIMA_ARRASTE = 14;

export default function CuboMagico() {
  const [animar, definirAnimar] = useState(true);
  const [arrastando, definirArrastando] = useState(false);
  const controle = useRef<ControleCubo>({ pecaSobPonteiro: null });
  const arraste = useRef({
    ativo: false,
    sobrePeca: false,
    consumido: false,
    inicialX: 0,
    inicialY: 0,
    ultimoX: 0,
    ultimoY: 0,
  });

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sincronizar = () => definirAnimar(!consulta.matches);

    sincronizar();
    consulta.addEventListener("change", sincronizar);

    return () => consulta.removeEventListener("change", sincronizar);
  }, []);

  const aoPressionar = (evento: EventoPonteiro<HTMLDivElement>) => {
    if (evento.pointerType === "mouse" && evento.button !== 0) {
      return;
    }

    const alvo = controle.current.pecaSobPonteiro;

    arraste.current = {
      ativo: true,
      sobrePeca: alvo !== null,
      consumido: false,
      inicialX: evento.clientX,
      inicialY: evento.clientY,
      ultimoX: evento.clientX,
      ultimoY: evento.clientY,
    };

    evento.currentTarget.setPointerCapture(evento.pointerId);
    controle.current.registrarInteracao?.();

    if (alvo === null) {
      controle.current.iniciarArraste?.();
      definirArrastando(true);
    }
  };

  const aoMover = (evento: EventoPonteiro<HTMLDivElement>) => {
    const atual = arraste.current;

    if (!atual.ativo) {
      return;
    }

    const passoX = evento.clientX - atual.ultimoX;
    const passoY = evento.clientY - atual.ultimoY;

    atual.ultimoX = evento.clientX;
    atual.ultimoY = evento.clientY;

    if (!atual.sobrePeca) {
      controle.current.orbitar?.(passoX, passoY);
      return;
    }

    if (atual.consumido) {
      return;
    }

    const totalX = evento.clientX - atual.inicialX;
    const totalY = evento.clientY - atual.inicialY;

    if (Math.hypot(totalX, totalY) < DISTANCIA_MINIMA_ARRASTE) {
      return;
    }

    atual.consumido = true;
    controle.current.girarPorArraste?.(totalX, totalY);
  };

  const aoSoltar = (evento: EventoPonteiro<HTMLDivElement>) => {
    if (!arraste.current.ativo) {
      return;
    }

    arraste.current.ativo = false;
    controle.current.pecaSobPonteiro = null;
    controle.current.encerrarArraste?.();
    definirArrastando(false);

    if (evento.currentTarget.hasPointerCapture(evento.pointerId)) {
      evento.currentTarget.releasePointerCapture(evento.pointerId);
    }
  };

  return (
    <div className={estilos.envoltorio}>
      <div
        className={`${estilos.palco} ${arrastando ? estilos.palcoArrastando : ""}`}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
      >
        <div className={estilos.brilho} aria-hidden="true" />
        <Canvas
          className={estilos.tela}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0.5, 0.7, 9.6], fov: 36 }}
        >
          <CenaCubo animar={animar} controle={controle} />
        </Canvas>
      </div>

      <div className={estilos.controles}>
        <button type="button" className={estilos.botaoControle} onClick={() => controle.current.embaralhar?.()}>
          Embaralhar
        </button>
        <button type="button" className={estilos.botaoControle} onClick={() => controle.current.restaurar?.()}>
          Resetar
        </button>
      </div>

      <p className={estilos.dica}>Arraste para girar o cubo · arraste sobre uma peça para virar a camada</p>
    </div>
  );
}
