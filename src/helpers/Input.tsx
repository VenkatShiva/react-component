import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`w-full border p-2 rounded-md ${className || ""}`}
      {...rest}
    />
  );
}

export default Input;
