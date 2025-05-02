import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  title: string;
  className?: string;
  ref: React.Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonField({ title, className, ref, ...rest }: ButtonProps) {
  return (
    <div className={`${className}`}>
      <button {...rest} className="p-2 w-full bg-yellowCS rounded-md">
        {title}
      </button>
    </div>
  );
}

export default ButtonField;
