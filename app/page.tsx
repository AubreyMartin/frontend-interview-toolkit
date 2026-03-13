import Link from "next/link";
import { TOPICS, LEVELS, getQuestions } from "@/data/questions";
import { getCodingExercises } from "@/data/codingExercises";

export default function HomePage() {
  const questions = getQuestions();
  const exercises = getCodingExercises();
  const total = questions.length;
  const exerciseCount = exercises.length;

  return (
    <div className="space-y-10">
      <section className="rounded-xl border-2 border-gym-accent/50 bg-gym-card p-4 text-base">
        <h2 className="mb-1 font-semibold text-white">Data loaded</h2>
        <p className="text-zinc-300">
          {total} questions · {exerciseCount} coding exercises
        </p>
        {total === 0 && exerciseCount === 0 && (
          <p className="mt-2 text-sm text-amber-400">No data found. Check that data/questions.ts and data/codingExercises.ts exist and export correctly.</p>
        )}
      </section>
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Frontend Interview Gym
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Practice JavaScript, React, HTML & CSS by topic and difficulty. Reveal answers, code in-browser, and track your progress.
        </p>
      </section>

      {/* Exercises – first CTA so it's always visible */}
      <section className="rounded-xl border-2 border-cyan-400/60 bg-cyan-500/10 p-6 text-center">
        <h2 className="mb-1 text-xl font-bold text-white sm:text-2xl">Coding exercises</h2>
        <p className="mb-4 text-sm text-zinc-300 sm:text-base">
          Variables, arrays, objects. Write code and run it.
        </p>
        <Link
          href="/exercises"
          className="inline-block rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-gray-900 hover:bg-cyan-300"
        >
          Open exercises ({exerciseCount}) →
        </Link>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.map(({ value, label }) => {
          const count = getQuestions({ topic: value }).length;
          return (
            <Link
              key={value}
              href={`/topics?topic=${value}`}
              className="rounded-xl border border-gym-border bg-gym-card p-6 transition-smooth hover:border-gym-accent/50 hover:bg-gym-card/90"
            >
              <h2 className="text-xl font-semibold text-white">{label}</h2>
              <p className="mt-1 text-sm text-zinc-500">{count} questions</p>
            </Link>
          );
        })}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-white">By difficulty</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {LEVELS.map(({ value, label }) => {
            const count = getQuestions({ level: value }).length;
            return (
              <Link
                key={value}
                href={`/topics?level=${value}`}
                className="rounded-xl border border-gym-border bg-gym-card p-5 transition-smooth hover:border-gym-accent/50"
              >
                <span className="font-medium capitalize text-white">{label}</span>
                <p className="mt-1 text-sm text-zinc-500">{count} questions</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/topics"
          className="rounded-lg bg-gym-accent px-5 py-2.5 font-medium text-gym-dark hover:bg-gym-accent/90"
        >
          Browse all {total} questions
        </Link>
        <Link
          href="/interview"
          className="rounded-lg border border-gym-border bg-gym-card px-5 py-2.5 font-medium text-white hover:bg-gym-border"
        >
          Simulate interview
        </Link>
        <Link
          href="/exercises"
          className="rounded-lg border border-gym-border bg-gym-card px-5 py-2.5 font-medium text-white hover:bg-gym-border"
        >
          Coding exercises
        </Link>
        <Link
          href="/progress"
          className="rounded-lg border border-gym-border px-5 py-2.5 font-medium text-zinc-400 hover:bg-gym-card hover:text-white"
        >
          Your progress
        </Link>
      </section>
    </div>
  );
}
