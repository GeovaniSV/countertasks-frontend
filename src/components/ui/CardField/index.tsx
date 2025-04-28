import "./Card.css";

function CardField() {
  return (
    <div className="border w-80 shadow-lg rounded-lg p-2">
      <div className="border grid grid-cols-2">
        <div>
          <p>Titulo</p>
          <p>Subtitulo</p>
          <p>Em progresso</p>
        </div>
        <div className="max-h-24 overflow-y-auto">
          Resumopra cararlho muito resumo mesmo, tipo resumo demais até muita
          coisa se não a gente vai se foder filho da puta do caralho arrombado
          de merda
        </div>
      </div>

      <div className="">ProgressBar</div>
      <div>Taks:</div>
    </div>
  );
}

export default CardField;
