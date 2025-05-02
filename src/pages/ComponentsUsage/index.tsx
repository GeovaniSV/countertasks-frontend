import { useRef } from "react";
import InputField from "../../components/ui/InputField";
import CardField from "../../components/ui/CardField";
import ButtonField from "../../components/ui/ButtonField";

const arr = [
  {
    id: 1,
    content: "alguma",
    done: false,
    cardId: 6,
  },
  {
    id: 2,
    content: "coisinha",
    done: false,
    cardId: 6,
  },
  {
    id: 3,
    content: "taskinho",
    done: false,
    cardId: 6,
  },
  {
    id: 4,
    content: "La taska",
    done: false,
    cardId: 6,
  },
];

function ComponentsUsage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="p-16">
      <ButtonField title="Botãozinho" ref={buttonRef} />
      <CardField
        title="Titulinho"
        content="Conteudo pra caralho taligado mermão?"
        subtitle="Subititulinho"
        tasks={arr}
      />
    </div>
  );
}

export default ComponentsUsage;
