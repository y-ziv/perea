import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block border border-copper px-8 py-3 text-caption font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-copper hover:text-primary ${className}`}
    >
      {children}
    </Link>
  );
}
