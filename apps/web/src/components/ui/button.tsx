import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[calc(var(--radius-control)-0.05rem)] border text-sm font-medium tracking-[0.01em] transition-[transform,background-color,border-color,box-shadow,color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(4,8,20,0.92)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "border-cyan-300/35 bg-[linear-gradient(135deg,var(--accent),#38bdf8_52%,#0ea5e9)] text-[var(--accent-contrast)] shadow-[var(--shadow-control)] hover:brightness-[1.04]",
        outline:
          "border-[var(--control-border)] bg-[var(--control-bg)] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[var(--control-border-strong)] hover:bg-[var(--control-bg-hover)]",
        ghost: "border-transparent bg-transparent text-slate-300 shadow-none hover:border-[var(--control-border)] hover:bg-white/[0.05] hover:text-white",
        secondary:
          "border-[var(--line)] bg-[rgba(8,15,29,0.92)] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-[var(--line-strong)] hover:bg-[rgba(15,23,42,0.92)]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3.5 text-[0.82rem]",
        lg: "h-11 px-5 text-[0.95rem]",
        icon: "h-10 w-10 rounded-full p-0"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));
Button.displayName = "Button";

export { Button, buttonVariants };
