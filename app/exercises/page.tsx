import Link from "next/link";
import { getCodingExercises } from "@/data/codingExercises";
import { getTopicColor } from "@/lib/utils";

export default function ExercisesPage() {
  const exercises = getCodingExercises();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Coding exercises</h1>
        <p className="mt-2 text-zinc-400">
          Step-by-step coding tasks. Write code in the editor and run it to see the output.
        </p>
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
    </div>
  );
}
