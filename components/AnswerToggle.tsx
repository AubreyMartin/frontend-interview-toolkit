"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnswerToggleProps {
  answer: string;
  questionId: string;
  onReveal?: () => void;
  className?: string;
}

export default function AnswerToggle({
  answer,
  questionId,
  onReveal,
  className,
}: AnswerToggleProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (!revealed) onReveal?.();
    setRevealed(true);
  };

  return (
    <div className={cn("rounded-lg border border-gym-border bg-gym-card p-4", className)}>
      <button
        type="button"
        onClick={handleReveal}
        className="mb-2 inline-flex items-center gap-2 rounded-md bg-gym-accentDim/20 px-3 py-1.5 text-sm font-medium text-gym-accent transition-smooth hover:bg-gym-accentDim/30"
      >
        {revealed ? "✓ Answer revealed" : "Reveal answer"}
      </button>
      {revealed && (
        <pre
          className="mt-2 whitespace-pre-wrap rounded bg-gym-dark p-3 font-mono text-sm text-zinc-300"
          data-question-id={questionId}
        >
          {answer}
        </pre>
      )}
    </div>
  );
}
