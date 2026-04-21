import * as React from "react";

import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full border border-[var(--admin-panel-border)] rounded-xl text-[11px] font-bold uppercase tracking-wider focus-visible:border-[var(--admin-accent)] focus-visible:ring-0 bg-[var(--admin-text-primary)]/[0.03] text-[var(--admin-text-primary)] min-w-0 px-4 py-2 transition-all outline-none placeholder:text-[var(--admin-text-secondary)]/50 focus-visible:ring-[var(--admin-accent)]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[11px]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
