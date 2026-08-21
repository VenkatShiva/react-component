import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-blue-600 p-2 px-3 text-white font-bold cursor-pointer rounded-md ${className || ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
