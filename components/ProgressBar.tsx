"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showCount?: boolean;
  className?: string;
  barClassName?: string;
}

export default function ProgressBar({
  value,
  max,
  label,
  showCount = true,
  className,
  barClassName,
}: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className={cn("space-y-1", className)}>
      {(label != null || showCount) && (
        <div className="flex items-center justify-between text-sm">
          {label != null && <span className="text-zinc-400">{label}</span>}
          {showCount && (
            <span className="text-zinc-500">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "h-2 w-full overflow-hidden rounded-full bg-gym-border",
          barClassName
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full rounded-full bg-gym-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
