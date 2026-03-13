"use client";

import Link from "next/link";
import type { Question } from "@/data/questions";
import DifficultyBadge from "./DifficultyBadge";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  showAnswerPreview?: boolean;
  className?: string;
}

export default function QuestionCard({
  question,
  showAnswerPreview = false,
  className,
}: QuestionCardProps) {
  return (
    <Link
      href={`/question/${question.id}`}
      className={cn(
        "block rounded-xl border border-gym-border bg-gym-card p-5 transition-smooth hover:border-gym-accent/50 hover:bg-gym-card/90",
        className
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{question.title}</h3>
        <DifficultyBadge level={question.level} topic={question.topic} size="sm" />
      </div>
      <p className="text-sm text-zinc-400 line-clamp-2">{question.prompt}</p>
      {showAnswerPreview && question.answer && (
        <p className="mt-2 text-xs text-zinc-500 line-clamp-1">Answer: {question.answer.slice(0, 80)}…</p>
      )}
    </Link>
  );
}
