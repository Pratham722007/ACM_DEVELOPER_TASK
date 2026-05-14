import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "outline" | "secondary";
  className?: string;
}

const variants = {
  default: "bg-white/10 text-[#111111] border-[#111111]/10",
  primary: "bg-[#A3E635] text-[#111111] border-transparent",
  success: "bg-[#A3E635] text-[#111111] border-transparent",
  warning: "bg-amber-400 text-[#111111] border-transparent",
  danger: "bg-red-500 text-white border-transparent",
  outline: "bg-transparent text-[#111111]/60 border-[#111111]/10",
  secondary: "bg-[#8B5CF6] text-white border-transparent",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
