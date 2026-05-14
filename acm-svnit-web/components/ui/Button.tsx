import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-black uppercase tracking-[0.15em] rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";

  const variants = {
    primary:
      "bg-[#111111] text-white hover:bg-[#A3E635] hover:text-[#111111] shadow-lg hover:shadow-[#A3E635]/20",
    secondary:
      "bg-[#A3E635] text-[#111111] hover:bg-[#111111] hover:text-white shadow-lg hover:shadow-[#111111]/10",
    outline:
      "bg-transparent text-[#111111] border border-[#111111]/10 hover:bg-[#111111]/5",
    ghost:
      "bg-transparent text-[#111111] hover:bg-[#111111]/5",
  };

  const sizes = {
    sm: "px-5 py-2 text-[10px] gap-2",
    md: "px-8 py-3 text-[11px] gap-2.5",
    lg: "px-10 py-4 text-[12px] gap-3",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
