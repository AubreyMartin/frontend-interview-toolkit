import { type ClassValue, clsx } from "clsx";

export type Topic = "javascript" | "react" | "html" | "css";
export type Level = "rookie" | "mid" | "pro";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const PROGRESS_KEY = "frontend-interview-gym-progress";

export interface ProgressState {
  viewed: string[];
  revealed: string[];
  completed: string[];
  lastUpdated: string;
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") {
    return { viewed: [], revealed: [], completed: [], lastUpdated: "" };
  }
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { viewed: [], revealed: [], completed: [], lastUpdated: "" };
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      viewed: parsed.viewed ?? [],
      revealed: parsed.revealed ?? [],
      completed: parsed.completed ?? [],
      lastUpdated: parsed.lastUpdated ?? "",
    };
  } catch {
    return { viewed: [], revealed: [], completed: [], lastUpdated: "" };
  }
}

export function saveProgress(state: ProgressState): void {
  state.lastUpdated = new Date().toISOString();
  if (typeof window !== "undefined") {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
  }
}

export function markViewed(questionId: string): void {
  const p = getProgress();
  if (!p.viewed.includes(questionId)) p.viewed.push(questionId);
  saveProgress(p);
}

export function markRevealed(questionId: string): void {
  const p = getProgress();
  if (!p.revealed.includes(questionId)) p.revealed.push(questionId);
  saveProgress(p);
}

export function markCompleted(questionId: string): void {
  const p = getProgress();
  if (!p.completed.includes(questionId)) p.completed.push(questionId);
  saveProgress(p);
}

export function getLevelColor(level: Level): string {
  switch (level) {
    case "rookie":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    case "mid":
      return "bg-amber-500/20 text-amber-400 border-amber-500/40";
    case "pro":
      return "bg-rose-500/20 text-rose-400 border-rose-500/40";
    default:
      return "bg-zinc-500/20 text-zinc-400";
  }
}

export function getTopicColor(topic: Topic): string {
  switch (topic) {
    case "javascript":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
    case "react":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40";
    case "html":
      return "bg-orange-500/20 text-orange-400 border-orange-500/40";
    case "css":
      return "bg-pink-500/20 text-pink-400 border-pink-500/40";
    default:
      return "bg-zinc-500/20 text-zinc-400";
  }
}
