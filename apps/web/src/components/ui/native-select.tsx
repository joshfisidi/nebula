import * as React from "react";
import { cn } from "@/lib/utils";

const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 8l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

export function NativeSelect({ className, style, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-11 w-full appearance-none rounded-[var(--radius-control)] border border-[var(--control-border)] bg-[var(--control-bg)] bg-no-repeat px-4 py-2 pr-10 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-[var(--control-border-strong)] hover:bg-[var(--control-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(4,8,20,0.92)]",
        className
      )}
      style={{
        backgroundImage: selectChevron,
        backgroundPosition: "right 0.9rem center",
        backgroundSize: "0.9rem",
        ...style
      }}
      {...props}
    />
  );
}

export function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option {...props} />;
}
