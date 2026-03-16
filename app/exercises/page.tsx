import Link from "next/link";
import { getCodingExercises } from "@/data/codingExercises";
import { getTopicColor } from "@/lib/utils";

export default function ExercisesPage() {
  const exercises = getCodingExercises();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Coding exercises</h1>
        <p className="mt-2 text-zinc-400">
          Step-by-step coding tasks. Write code in the editor and run it to see the output.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Exercise list
          </h2>
          <Link
            href="/exercises/realtime"
            className="text-xs font-medium text-gym-accent hover:underline"
          >
            Go to Real-time coding
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((ex) => (
            <li key={ex.id}>
              <Link
                href={`/exercises/${ex.id}`}
                className="block rounded-xl border border-gym-border bg-gym-card p-5 transition-smooth hover:border-gym-accent/50 hover:bg-gym-card/90"
              >
                <span
                  className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${getTopicColor(ex.topic)}`}
                >
                  {ex.topic}
                </span>
                <h2 className="mt-2 font-semibold text-white">{ex.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {ex.steps.length} steps
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {exercises.length === 0 && (
          <p className="text-center text-zinc-500">No exercises yet.</p>
        )}
      </section>

      <section className="rounded-xl border border-dashed border-gym-border/70 bg-gym-card/50 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Real-time coding</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Open a focused workspace with just steps, your code editor, and live output
              plus options to save and download a README of your session.
            </p>
          </div>
          <Link
            href="/exercises/realtime"
            className="inline-flex items-center justify-center rounded-md bg-gym-accent px-4 py-2 text-sm font-medium text-gym-dark hover:bg-gym-accent/90"
          >
            Open workspace
          </Link>
        </div>
      </section>
    </div>
  );
}
