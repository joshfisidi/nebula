import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[linear-gradient(135deg,#38bdf8,#2563eb)] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] hover:brightness-110",
        outline: "border border-[var(--line)] bg-white/[0.03] text-slate-100 hover:bg-white/[0.07]",
        ghost: "text-slate-200 hover:bg-white/[0.05]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-full px-3",
        icon: "h-10 w-10 rounded-full"
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
