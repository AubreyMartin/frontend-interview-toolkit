import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold text-white">404</h1>
      <p className="text-zinc-400">This page could not be found.</p>
      <nav className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-gym-accent px-4 py-2 font-medium text-gym-dark hover:bg-gym-accent/90"
        >
          Home
        </Link>
        <Link
          href="/exercises"
          className="rounded-lg border border-gym-border bg-gym-card px-4 py-2 font-medium text-white hover:bg-gym-card/90"
        >
          Exercises
        </Link>
        <Link
          href="/topics"
          className="rounded-lg border border-gym-border bg-gym-card px-4 py-2 font-medium text-white hover:bg-gym-card/90"
        >
          Topics
        </Link>
        <Link
          href="/interview"
          className="rounded-lg border border-gym-border bg-gym-card px-4 py-2 font-medium text-white hover:bg-gym-card/90"
        >
          Interview
        </Link>
        <Link
          href="/progress"
          className="rounded-lg border border-gym-border bg-gym-card px-4 py-2 font-medium text-white hover:bg-gym-card/90"
        >
          Progress
        </Link>
      </nav>
    </div>
  );
}
