import type { ComponentProps } from "react";
import { Link } from "react-router";

type LinkProps = ComponentProps<"a">;

type MyLinkProps = LinkProps & {
  to: string;
};

function MyLink({ to, children, className }: MyLinkProps) {
  return (
    <Link
      className={`underline font-semibold text-blue-500 ${className || ""}`}
      to={to}
    >
      {children}
    </Link>
  );
}

export default MyLink;
