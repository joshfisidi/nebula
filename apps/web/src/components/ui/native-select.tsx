import * as React from "react";
import { cn } from "@/lib/utils";

export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-9 w-full rounded-md border border-slate-600 bg-slate-900/70 px-3 py-1 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        className
      )}
      {...props}
    />
  );
}

export function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option {...props} />;
}
