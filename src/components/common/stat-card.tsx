import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "accent" | "success";
}) {
  return (
    <div className="surface-panel flex items-start justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="truncate text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{value}</p>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-lg",
          tone === "accent" && "bg-accent/20 text-accent-foreground",
          tone === "success" && "bg-success/15 text-success",
          tone === "default" && "bg-primary/10 text-primary",
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
    </div>
  );
}
