"use client";

import { useParams, useRouter } from "next/navigation";
import CodeRunner from "@/components/CodeRunner";
import { getCodingExerciseById } from "@/data/codingExercises";
import { getTopicColor } from "@/lib/utils";

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const exercise = id ? getCodingExerciseById(id) : undefined;

  if (!exercise) {
    return (
      <div className="rounded-lg border border-gym-border bg-gym-card p-8 text-center">
        <p className="text-zinc-400">Exercise not found.</p>
        <button
          type="button"
          onClick={() => router.push("/exercises")}
          className="mt-4 text-gym-accent hover:underline"
        >
          Back to exercises
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <span
          className={`inline-flex rounded-md border px-2 py-0.5 text-sm font-medium ${getTopicColor(exercise.topic)}`}
        >
          {exercise.topic}
        </span>
        <h1 className="mt-2 text-2xl font-bold text-white">{exercise.title}</h1>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Steps
        </h2>
        <ol className="list-inside list-decimal space-y-2 rounded-lg border border-gym-border bg-gym-card p-4 text-zinc-300">
          {exercise.steps.map((step) => (
            <li key={step.number}>{step.instruction}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Your code
        </h2>
        <CodeRunner
          exerciseId={exercise.id}
          defaultValue={exercise.starterCode}
          language={exercise.language ?? "javascript"}
          height={340}
        />
      </section>
    </div>
  );
}
