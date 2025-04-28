import { useRef } from "react";
import InputField from "../../components/ui/InputField";
import CardField from "../../components/ui/CardField";

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

  return (
    <div className="p-16">
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
