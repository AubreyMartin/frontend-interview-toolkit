"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnswerToggle from "@/components/AnswerToggle";
import CodeEditor from "@/components/CodeEditor";
import DifficultyBadge from "@/components/DifficultyBadge";
import { getQuestionById } from "@/data/questions";
import { markViewed, markRevealed, markCompleted } from "@/lib/utils";

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [mounted, setMounted] = useState(false);

  const question = id ? getQuestionById(id) : undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && question) markViewed(question.id);
  }, [mounted, question?.id]);

  if (!mounted || !id) {
    return (
      <div className="animate-pulse rounded-lg bg-gym-card p-8">
        <div className="h-8 w-3/4 rounded bg-gym-border" />
        <div className="mt-4 h-4 w-full rounded bg-gym-border" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="rounded-lg border border-gym-border bg-gym-card p-8 text-center">
        <p className="text-zinc-400">Question not found.</p>
        <button
          type="button"
          onClick={() => router.push("/topics")}
          className="mt-4 text-gym-accent hover:underline"
        >
          Back to topics
        </button>
      </div>
    );
  }

  const lang = question.language ?? "javascript";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <DifficultyBadge level={question.level} topic={question.topic} className="mb-2" />
          <h1 className="text-2xl font-bold text-white">{question.title}</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            markCompleted(question.id);
            router.push("/progress");
          }}
          className="rounded-lg border border-gym-accent/50 bg-gym-accent/10 px-4 py-2 text-sm font-medium text-gym-accent hover:bg-gym-accent/20"
        >
          Mark complete
        </button>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Prompt
        </h2>
        <p className="rounded-lg border border-gym-border bg-gym-card p-4 text-zinc-300">
          {question.prompt}
        </p>
      </section>

      {question.hints && question.hints.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-zinc-500">
            Hints
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-400">
            {question.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Practice
        </h2>
        <CodeEditor
          key={question.id}
          questionId={question.id}
          defaultValue={question.starterCode ?? `// ${question.title}\n`}
          language={lang}
          height={320}
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Answer
        </h2>
        <AnswerToggle
          questionId={question.id}
          answer={question.answer}
          onReveal={() => markRevealed(question.id)}
        />
      </section>
    </div>
  );
}
