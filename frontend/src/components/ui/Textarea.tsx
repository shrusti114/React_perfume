import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border border-[var(--admin-panel-border)] bg-[var(--admin-text-primary)]/[0.03] px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-secondary)]/50 focus:border-[var(--admin-accent)] focus:ring-1 focus:ring-[var(--admin-accent)]/30 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
