"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { getQuestions, getQuestionById } from "@/data/questions";
import { getProgress } from "@/lib/utils";

export default function ProgressPage() {
  const [progress, setProgress] = useState(getProgress());
  const allQuestions = getQuestions();
  const total = allQuestions.length;

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const viewed = progress.viewed.length;
  const revealed = progress.revealed.length;
  const completed = progress.completed.length;

  const viewedQuestions = progress.viewed
    .map((id) => getQuestionById(id))
    .filter(Boolean);
  const completedQuestions = progress.completed
    .map((id) => getQuestionById(id))
    .filter(Boolean);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Your progress</h1>
        <p className="mt-2 text-zinc-400">
          Track which questions you’ve viewed, revealed answers for, and marked complete.
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gym-border bg-gym-card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Viewed
          </h2>
          <ProgressBar value={viewed} max={total} showCount className="mt-2" />
        </div>
        <div className="rounded-xl border border-gym-border bg-gym-card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Answers revealed
          </h2>
          <ProgressBar value={revealed} max={total} showCount className="mt-2" />
        </div>
        <div className="rounded-xl border border-gym-border bg-gym-card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Completed
          </h2>
          <ProgressBar value={completed} max={total} showCount className="mt-2" />
        </div>
      </section>

      {progress.lastUpdated && (
        <p className="text-sm text-zinc-500">
          Last updated: {new Date(progress.lastUpdated).toLocaleString()}
        </p>
      )}

      {completedQuestions.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Completed</h2>
          <ul className="space-y-2">
            {completedQuestions.map((q) =>
              q ? (
                <li key={q.id}>
                  <Link
                    href={`/question/${q.id}`}
                    className="block rounded-lg border border-gym-border bg-gym-card p-4 text-white transition-smooth hover:border-gym-accent/50"
                  >
                    {q.title}
                    <span className="ml-2 text-sm text-zinc-500">
                      {q.topic} · {q.level}
                    </span>
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}

      {viewedQuestions.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Recently viewed</h2>
          <ul className="space-y-2">
            {viewedQuestions.slice(0, 10).map((q) =>
              q ? (
                <li key={q.id}>
                  <Link
                    href={`/question/${q.id}`}
                    className="block rounded-lg border border-gym-border bg-gym-card/50 p-3 text-sm text-zinc-300 transition-smooth hover:border-gym-border hover:text-white"
                  >
                    {q.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
