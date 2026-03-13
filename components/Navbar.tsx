"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/exercises", label: "Exercises" },
  { href: "/topics", label: "Topics" },
  { href: "/interview", label: "Simulate Interview" },
  { href: "/progress", label: "Progress" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gym-border bg-gym-dark/95 backdrop-blur supports-[backdrop-filter]:bg-gym-dark/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition-smooth hover:text-gym-accent"
        >
          Frontend Interview Gym
        </Link>
        <ul className="flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-smooth hover:bg-gym-border hover:text-white",
                  href === "/exercises" ? "text-cyan-400 hover:text-cyan-300" : "text-zinc-400"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
