import { useRef } from "react";
import InputField from "../../components/ui/InputField";
import CardField from "../../components/ui/CardField";

function ComponentsUsage() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-16">
      <CardField />
    </div>
  );
}

export default ComponentsUsage;
