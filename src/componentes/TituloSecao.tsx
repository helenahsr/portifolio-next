import estilos from "./TituloSecao.module.css";

type PropriedadesTituloSecao = {
  texto: string;
  destaque: string;
  descricao?: string;
};

export default function TituloSecao({ texto, destaque, descricao }: PropriedadesTituloSecao) {
  return (
    <div className={estilos.bloco}>
      <h1 className={estilos.titulo}>
        {texto} <span className={estilos.destaque}>{destaque}</span>
      </h1>
      <span className={estilos.risco} />
      {descricao ? <p className={estilos.descricao}>{descricao}</p> : null}
    </div>
  );
}
