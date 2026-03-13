"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import QuestionCard from "@/components/QuestionCard";
import { getQuestions, TOPICS, LEVELS, type Topic, type Level } from "@/data/questions";

export default function TopicsContent() {
  const searchParams = useSearchParams();
  const topic = (searchParams.get("topic") ?? undefined) as Topic | undefined;
  const level = (searchParams.get("level") ?? undefined) as Level | undefined;

  const questions = useMemo(
    () => getQuestions({ topic, level }),
    [topic, level]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Browse by topic & difficulty</h1>
        <p className="mt-2 text-zinc-400">
          Filter by topic or level, or browse all questions.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href="/topics"
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-smooth ${
            !topic && !level
              ? "border-gym-accent bg-gym-accent/20 text-gym-accent"
              : "border-gym-border text-zinc-400 hover:bg-gym-card hover:text-white"
          }`}
        >
          All
        </a>
        {TOPICS.map(({ value, label }) => (
          <a
            key={value}
            href={topic === value ? "/topics" : `/topics?topic=${value}`}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-smooth ${
              topic === value
                ? "border-gym-accent bg-gym-accent/20 text-gym-accent"
                : "border-gym-border text-zinc-400 hover:bg-gym-card hover:text-white"
            }`}
          >
            {label}
          </a>
        ))}
        <span className="mx-1 self-center text-zinc-600">|</span>
        {LEVELS.map(({ value, label }) => (
          <a
            key={value}
            href={level === value ? (topic ? `/topics?topic=${topic}` : "/topics") : `/topics?level=${value}${topic ? `&topic=${topic}` : ""}`}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium capitalize transition-smooth ${
              level === value
                ? "border-gym-accent bg-gym-accent/20 text-gym-accent"
                : "border-gym-border text-zinc-400 hover:bg-gym-card hover:text-white"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((q) => (
          <li key={q.id}>
            <QuestionCard question={q} />
          </li>
        ))}
      </ul>
      {questions.length === 0 && (
        <p className="text-center text-zinc-500">No questions match the current filters.</p>
      )}
    </div>
  );
}
