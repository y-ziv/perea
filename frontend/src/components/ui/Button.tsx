import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & (
  | { href: string; onClick?: never; disabled?: never; type?: never }
  | { href?: never; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }
);

const baseClass =
  "inline-block border border-copper px-8 py-3 text-caption font-medium tracking-wide text-copper transition-colors duration-300 hover:bg-copper hover:text-primary disabled:cursor-not-allowed disabled:opacity-50";

export function Button({ href, onClick, disabled, type = "button", children, className }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(baseClass, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClass, className)}
    >
      {children}
    </button>
  );
}
