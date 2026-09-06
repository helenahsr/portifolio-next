"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Group, MeshStandardMaterial, Quaternion, Vector3 } from "three";
import {
  COR_CORPO,
  ESPACAMENTO,
  TAMANHO_PECA,
  alinharNaGrade,
  coordenadasDaPosicao,
  dimensoesAdesivo,
  eixosUnitarios,
  indiceMaiorComponente,
  limitar,
  montarPecas,
  normalCanonica,
  posicaoAdesivo,
  sortearMovimentos,
  suavizar,
  type ControleCubo,
  type IndiceEixo,
  type Movimento,
} from "@/logica/cuboMagico";

const DURACAO_GIRO = 0.28;
const DURACAO_EMBARALHAMENTO = 0.15;
const DURACAO_RESTAURACAO = 0.65;
const QUANTIDADE_EMBARALHAMENTO = 18;
const VELOCIDADE_OCIOSA = 0.34;
const INCLINACAO_OCIOSA = -0.42;
const ESPERA_OCIOSA = 2.4;

type GiroEmCurso = {
  eixoVetor: Vector3;
  sentido: 1 | -1;
  duracao: number;
  progresso: number;
  indices: number[];
};

type Restauracao = {
  progresso: number;
  posicoes: Vector3[];
  quaternions: Quaternion[];
};

function agora(): number {
  return performance.now() / 1000;
}

export default function CenaCubo({
  animar,
  controle,
}: {
  animar: boolean;
  controle: RefObject<ControleCubo>;
}) {
  const { camera, size } = useThree();
  const pecas = useMemo(montarPecas, []);
  const grupoOrbita = useRef<Group>(null);
  const nos = useRef<Array<Group | null>>([]);
  const materiais = useRef<Array<Array<MeshStandardMaterial | null>>>([]);
  const destacada = useRef<number | null>(null);
  const giro = useRef<GiroEmCurso | null>(null);
  const restauracao = useRef<Restauracao | null>(null);
  const fila = useRef<Movimento[]>([]);
  const embaralhamentoInicial = useRef(false);
  const orbita = useRef({
    rotacao: 0.62,
    inclinacao: INCLINACAO_OCIOSA,
    velocidadeRotacao: 0,
    velocidadeInclinacao: 0,
    arrastando: false,
    ultimaInteracao: 0,
  });

  const auxiliarQuaternion = useMemo(() => new Quaternion(), []);
  const auxiliarVetor = useMemo(() => new Vector3(), []);
  const quaternionIdentidade = useMemo(() => new Quaternion(), []);

  useEffect(() => {
    pecas.forEach((peca) => {
      const no = nos.current[peca.indice];

      if (no) {
        no.position.copy(peca.posicaoBase);
        no.quaternion.copy(peca.quaternionBase);
      }
    });
  }, [pecas]);

  useEffect(() => {
    if (!animar || embaralhamentoInicial.current) {
      return;
    }

    embaralhamentoInicial.current = true;

    const espera = window.setTimeout(() => {
      fila.current.push(...sortearMovimentos(7, 0.22));
    }, 900);

    return () => window.clearTimeout(espera);
  }, [animar]);

  useEffect(() => {
    const referencia = controle.current;

    if (!referencia) {
      return;
    }

    const registrarInteracao = () => {
      orbita.current.ultimaInteracao = agora();
    };

    const enfileirar = (movimentos: Movimento[]) => {
      if (restauracao.current) {
        return;
      }

      fila.current.push(...movimentos);
      registrarInteracao();
    };

    referencia.registrarInteracao = registrarInteracao;

    referencia.iniciarArraste = () => {
      orbita.current.arrastando = true;
      registrarInteracao();
    };

    referencia.encerrarArraste = () => {
      orbita.current.arrastando = false;
      registrarInteracao();
    };

    referencia.orbitar = (deslocamentoX, deslocamentoY) => {
      const estado = orbita.current;

      estado.rotacao += deslocamentoX * 0.008;
      estado.inclinacao = limitar(estado.inclinacao + deslocamentoY * 0.008, -1.15, 1.15);
      estado.velocidadeRotacao = deslocamentoX * 0.32;
      estado.velocidadeInclinacao = deslocamentoY * 0.32;
      registrarInteracao();
    };

    referencia.girarPorArraste = (deslocamentoX, deslocamentoY) => {
      const alvo = referencia.pecaSobPonteiro;
      const grupo = grupoOrbita.current;

      if (!alvo || !grupo || giro.current || restauracao.current || fila.current.length > 0) {
        return;
      }

      const rotacaoDoCubo = grupo.getWorldQuaternion(new Quaternion());
      const eixoNormal = indiceMaiorComponente(alvo.normal);
      const centroNaTela = alvo.posicaoMundo.clone().project(camera);
      let indiceTangente = -1;
      let melhorProduto = 0;

      for (let eixo = 0; eixo < 3; eixo += 1) {
        if (eixo === eixoNormal) {
          continue;
        }

        const extremidade = alvo.posicaoMundo
          .clone()
          .add(eixosUnitarios[eixo].clone().applyQuaternion(rotacaoDoCubo).multiplyScalar(0.6))
          .project(camera);

        const direcaoTelaX = ((extremidade.x - centroNaTela.x) * size.width) / 2;
        const direcaoTelaY = (-(extremidade.y - centroNaTela.y) * size.height) / 2;
        const produto = direcaoTelaX * deslocamentoX + direcaoTelaY * deslocamentoY;

        if (indiceTangente === -1 || Math.abs(produto) > Math.abs(melhorProduto)) {
          indiceTangente = eixo;
          melhorProduto = produto;
        }
      }

      if (indiceTangente === -1 || melhorProduto === 0) {
        return;
      }

      const tangente = eixosUnitarios[indiceTangente].clone().multiplyScalar(Math.sign(melhorProduto));
      const eixoBruto = new Vector3().crossVectors(alvo.normal, tangente);
      const eixo = indiceMaiorComponente(eixoBruto);
      const sentido: 1 | -1 = Math.sign(eixoBruto.getComponent(eixo)) < 0 ? -1 : 1;

      enfileirar([
        {
          eixo,
          camada: pecas[alvo.indice].coordenadas[eixo],
          sentido,
          duracao: animar ? DURACAO_GIRO : 0.16,
        },
      ]);
    };

    referencia.embaralhar = () => {
      enfileirar(sortearMovimentos(QUANTIDADE_EMBARALHAMENTO, DURACAO_EMBARALHAMENTO));
    };

    referencia.restaurar = () => {
      fila.current = [];
      giro.current = null;

      restauracao.current = {
        progresso: 0,
        posicoes: pecas.map((peca) => nos.current[peca.indice]?.position.clone() ?? peca.posicaoBase.clone()),
        quaternions: pecas.map(
          (peca) => nos.current[peca.indice]?.quaternion.clone() ?? peca.quaternionBase.clone(),
        ),
      };

      registrarInteracao();
    };

    return () => {
      referencia.registrarInteracao = undefined;
      referencia.iniciarArraste = undefined;
      referencia.encerrarArraste = undefined;
      referencia.orbitar = undefined;
      referencia.girarPorArraste = undefined;
      referencia.embaralhar = undefined;
      referencia.restaurar = undefined;
    };
  }, [animar, camera, controle, pecas, size.height, size.width]);

  const aoPressionarPeca = (evento: ThreeEvent<PointerEvent>, indice: number) => {
    const grupo = grupoOrbita.current;

    if (!evento.face || !grupo || !controle.current) {
      return;
    }

    const rotacaoDoCubo = grupo.getWorldQuaternion(new Quaternion());
    const normalMundo = evento.face.normal.clone().transformDirection(evento.object.matrixWorld);
    const normalLocal = normalMundo.applyQuaternion(rotacaoDoCubo.clone().invert());

    controle.current.pecaSobPonteiro = {
      indice,
      normal: normalCanonica(normalLocal),
      posicaoMundo: evento.object.getWorldPosition(new Vector3()),
    };
  };

  const iniciarProximoGiro = () => {
    const movimento = fila.current.shift();

    if (!movimento) {
      return;
    }

    giro.current = {
      eixoVetor: eixosUnitarios[movimento.eixo],
      sentido: movimento.sentido,
      duracao: movimento.duracao,
      progresso: 0,
      indices: pecas
        .filter((peca) => peca.coordenadas[movimento.eixo] === movimento.camada)
        .map((peca) => peca.indice),
    };
  };

  const concluirGiro = (emCurso: GiroEmCurso) => {
    auxiliarQuaternion.setFromAxisAngle(emCurso.eixoVetor, (emCurso.sentido * Math.PI) / 2);

    emCurso.indices.forEach((indice) => {
      const peca = pecas[indice];
      const no = nos.current[indice];

      peca.posicaoBase.applyQuaternion(auxiliarQuaternion);
      alinharNaGrade(peca.posicaoBase);
      peca.coordenadas = coordenadasDaPosicao(peca.posicaoBase);
      peca.quaternionBase.premultiply(auxiliarQuaternion);

      if (no) {
        no.position.copy(peca.posicaoBase);
        no.quaternion.copy(peca.quaternionBase);
      }
    });

    giro.current = null;
  };

  useFrame((estado, delta) => {
    const grupo = grupoOrbita.current;

    if (!grupo) {
      return;
    }

    const passo = Math.min(delta, 0.05);
    const movimentoOrbita = orbita.current;
    const decaimento = Math.pow(0.88, passo * 60);

    if (movimentoOrbita.arrastando) {
      movimentoOrbita.velocidadeRotacao *= decaimento;
      movimentoOrbita.velocidadeInclinacao *= decaimento;
    } else {
      movimentoOrbita.rotacao += movimentoOrbita.velocidadeRotacao * passo;
      movimentoOrbita.inclinacao = limitar(
        movimentoOrbita.inclinacao + movimentoOrbita.velocidadeInclinacao * passo,
        -1.15,
        1.15,
      );
      movimentoOrbita.velocidadeRotacao *= decaimento;
      movimentoOrbita.velocidadeInclinacao *= decaimento;

      if (animar && agora() - movimentoOrbita.ultimaInteracao > ESPERA_OCIOSA) {
        movimentoOrbita.velocidadeRotacao +=
          (VELOCIDADE_OCIOSA - movimentoOrbita.velocidadeRotacao) * Math.min(1, passo * 0.8);
        movimentoOrbita.inclinacao +=
          (INCLINACAO_OCIOSA - movimentoOrbita.inclinacao) * Math.min(1, passo * 0.7);
      }
    }

    grupo.rotation.set(movimentoOrbita.inclinacao, movimentoOrbita.rotacao, 0);
    grupo.position.y = animar ? Math.sin(estado.clock.elapsedTime * 0.7) * 0.06 : 0;

    pecas.forEach((peca) => {
      const listaMateriais = materiais.current[peca.indice];

      if (!listaMateriais) {
        return;
      }

      listaMateriais.forEach((material, ordem) => {
        if (!material) {
          return;
        }

        const base = peca.adesivos[ordem].emissao;
        const alvo = destacada.current === peca.indice ? base * 2.2 + 0.3 : base;

        material.emissiveIntensity += (alvo - material.emissiveIntensity) * Math.min(1, passo * 9);
      });
    });

    const recuperacao = restauracao.current;

    if (recuperacao) {
      recuperacao.progresso = Math.min(1, recuperacao.progresso + passo / DURACAO_RESTAURACAO);
      const avanco = suavizar(recuperacao.progresso);

      pecas.forEach((peca) => {
        const no = nos.current[peca.indice];

        if (!no) {
          return;
        }

        auxiliarVetor
          .set(peca.coordenadasIniciais[0], peca.coordenadasIniciais[1], peca.coordenadasIniciais[2])
          .multiplyScalar(ESPACAMENTO);

        no.position.lerpVectors(recuperacao.posicoes[peca.indice], auxiliarVetor, avanco);
        no.quaternion.slerpQuaternions(recuperacao.quaternions[peca.indice], quaternionIdentidade, avanco);
      });

      if (recuperacao.progresso >= 1) {
        pecas.forEach((peca) => {
          peca.coordenadas = [...peca.coordenadasIniciais];
          peca.posicaoBase
            .set(peca.coordenadasIniciais[0], peca.coordenadasIniciais[1], peca.coordenadasIniciais[2])
            .multiplyScalar(ESPACAMENTO);
          peca.quaternionBase.identity();

          const no = nos.current[peca.indice];

          if (no) {
            no.position.copy(peca.posicaoBase);
            no.quaternion.copy(peca.quaternionBase);
          }
        });

        restauracao.current = null;
      }

      return;
    }

    const emCurso = giro.current;

    if (!emCurso) {
      iniciarProximoGiro();
      return;
    }

    emCurso.progresso = Math.min(1, emCurso.progresso + passo / emCurso.duracao);
    const angulo = ((emCurso.sentido * Math.PI) / 2) * suavizar(emCurso.progresso);
    auxiliarQuaternion.setFromAxisAngle(emCurso.eixoVetor, angulo);

    emCurso.indices.forEach((indice) => {
      const peca = pecas[indice];
      const no = nos.current[indice];

      if (!no) {
        return;
      }

      no.position.copy(peca.posicaoBase).applyQuaternion(auxiliarQuaternion);
      no.quaternion.copy(auxiliarQuaternion).multiply(peca.quaternionBase);
    });

    if (emCurso.progresso >= 1) {
      concluirGiro(emCurso);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={["#6d8bb5", "#040810", 0.75]} />
      <directionalLight position={[6, 8, 7]} intensity={1.5} color="#e8f2ff" />
      <directionalLight position={[-7, 2, 5]} intensity={0.6} color="#93c5fd" />
      <pointLight position={[-5, -3, 5]} intensity={22} distance={18} color="#0891b2" />

      <group ref={grupoOrbita}>
        <mesh>
          <boxGeometry args={[2.9, 2.9, 2.9]} />
          <meshStandardMaterial color="#03060c" roughness={0.9} metalness={0.1} />
        </mesh>

        {pecas.map((peca) => (
          <group
            key={peca.indice}
            ref={(no) => {
              nos.current[peca.indice] = no;
            }}
            onPointerDown={(evento) => aoPressionarPeca(evento, peca.indice)}
            onPointerOver={() => {
              destacada.current = peca.indice;
            }}
            onPointerOut={() => {
              if (destacada.current === peca.indice) {
                destacada.current = null;
              }
            }}
          >
            <RoundedBox args={[TAMANHO_PECA, TAMANHO_PECA, TAMANHO_PECA]} radius={0.1} smoothness={3}>
              <meshStandardMaterial color={COR_CORPO} metalness={0.48} roughness={0.44} />
            </RoundedBox>

            {peca.adesivos.map((adesivo, ordem) => (
              <RoundedBox
                key={adesivo.chave}
                args={dimensoesAdesivo(adesivo.eixo)}
                radius={0.02}
                smoothness={2}
                position={posicaoAdesivo(adesivo)}
              >
                <meshStandardMaterial
                  ref={(material) => {
                    if (!materiais.current[peca.indice]) {
                      materiais.current[peca.indice] = [];
                    }

                    materiais.current[peca.indice][ordem] = material;
                  }}
                  color={adesivo.cor}
                  emissive={adesivo.cor}
                  emissiveIntensity={adesivo.emissao}
                  metalness={0.26}
                  roughness={0.32}
                />
              </RoundedBox>
            ))}
          </group>
        ))}
      </group>

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.42} luminanceSmoothing={0.26} radius={0.62} mipmapBlur />
      </EffectComposer>
    </>
  );
}
