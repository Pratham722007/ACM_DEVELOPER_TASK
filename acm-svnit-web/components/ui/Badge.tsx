import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "outline" | "secondary";
  className?: string;
}

const variants = {
  default: "bg-white text-foreground border-foreground",
  primary: "bg-primary text-foreground border-foreground",
  success: "bg-accent text-white border-foreground",
  warning: "bg-amber-400 text-foreground border-foreground",
  danger: "bg-red-500 text-white border-foreground",
  outline: "bg-transparent text-foreground border-foreground",
  secondary: "bg-secondary text-white border-foreground",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border-2",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
