import * as React from "react";
import { cn } from "@/lib/utils";

export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-1 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
        className
      )}
      {...props}
    />
  );
}

export function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option {...props} />;
}
