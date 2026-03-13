"use client";

import { getLevelColor, getTopicColor, type Level, type Topic } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  level: Level;
  topic?: Topic;
  className?: string;
  size?: "sm" | "md";
}

export default function DifficultyBadge({
  level,
  topic,
  className,
  size = "md",
}: DifficultyBadgeProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {topic != null && (
        <span
          className={cn(
            "inline-flex items-center rounded-md border font-medium",
            getTopicColor(topic),
            size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-0.5 text-sm"
          )}
        >
          {topic}
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center rounded-md border font-medium capitalize",
          getLevelColor(level),
          size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-0.5 text-sm"
        )}
      >
        {level}
      </span>
    </div>
  );
}
