import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.14em] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
  {
  variants: {
    variant: {
      default: "border-cyan-300/28 bg-cyan-400/10 text-cyan-100",
      secondary: "border-[var(--control-border)] bg-[var(--control-bg)] text-slate-200"
    }
  },
  defaultVariants: { variant: "default" }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
