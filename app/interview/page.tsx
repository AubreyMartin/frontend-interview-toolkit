"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnswerToggle from "@/components/AnswerToggle";
import CodeEditor from "@/components/CodeEditor";
import DifficultyBadge from "@/components/DifficultyBadge";
import ProgressBar from "@/components/ProgressBar";
import {
  getQuestions,
  type Question,
  type Topic,
  type Level,
} from "@/data/questions";

const TOPICS: Topic[] = ["javascript", "react", "html", "css"];
const LEVELS: Level[] = ["rookie", "mid", "pro"];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function InterviewPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic>("javascript");
  const [level, setLevel] = useState<Level>("mid");
  const [count, setCount] = useState(5);
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentQuestion = pool[currentIndex] ?? null;
  const total = pool.length;
  const progress = total > 0 ? (currentIndex / total) * 100 : 0;

  const startInterview = useCallback(() => {
    const questions = getQuestions({ topic, level });
    const shuffled = shuffle(questions).slice(0, Math.min(count, questions.length));
    setPool(shuffled);
    setCurrentIndex(0);
    setRevealed(false);
    setStarted(true);
  }, [topic, level, count]);

  useEffect(() => {
    if (!started) return;
    setRevealed(false);
  }, [currentIndex, started]);

  const goNext = () => {
    if (currentIndex < pool.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStarted(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  if (started && pool.length === 0) {
    setStarted(false);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Simulate interview</h1>
      <p className="text-zinc-400">
        Pick a topic, difficulty, and number of questions. We’ll show them in random order.
      </p>

      {!started ? (
        <div className="space-y-6 rounded-xl border border-gym-border bg-gym-card p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className="w-full rounded-lg border border-gym-border bg-gym-dark px-4 py-2 text-white focus:border-gym-accent focus:outline-none focus:ring-1 focus:ring-gym-accent"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Difficulty</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="w-full rounded-lg border border-gym-border bg-gym-dark px-4 py-2 text-white focus:border-gym-accent focus:outline-none focus:ring-1 focus:ring-gym-accent"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Number of questions
            </label>
            <input
              type="number"
              min={1}
              max={getQuestions({ topic, level }).length}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
              className="w-full rounded-lg border border-gym-border bg-gym-dark px-4 py-2 text-white focus:border-gym-accent focus:outline-none focus:ring-1 focus:ring-gym-accent"
            />
          </div>
          <button
            type="button"
            onClick={startInterview}
            className="w-full rounded-lg bg-gym-accent py-3 font-medium text-gym-dark hover:bg-gym-accent/90"
          >
            Start interview
          </button>
        </div>
      ) : (
        <>
          <ProgressBar
            value={currentIndex}
            max={total}
            label="Question"
            showCount
            className="max-w-xs"
          />

          {currentQuestion && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <DifficultyBadge
                  level={currentQuestion.level}
                  topic={currentQuestion.topic}
                />
                <span className="text-sm text-zinc-500">
                  {currentIndex + 1} of {total}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white">
                {currentQuestion.title}
              </h2>
              <p className="text-zinc-300">{currentQuestion.prompt}</p>

              {currentQuestion.starterCode != null && (
                <CodeEditor
                  key={currentQuestion.id}
                  questionId={currentQuestion.id}
                  defaultValue={currentQuestion.starterCode}
                  language={currentQuestion.language ?? "javascript"}
                  height={280}
                />
              )}

              <AnswerToggle
                questionId={currentQuestion.id}
                answer={currentQuestion.answer}
              />

              <div className="flex justify-between border-t border-gym-border pt-6">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="rounded-lg border border-gym-border px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-gym-card disabled:opacity-50"
                >
                  Previous
                </button>
                {currentIndex < pool.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-lg bg-gym-accent px-4 py-2 text-sm font-medium text-gym-dark hover:bg-gym-accent/90"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStarted(false)}
                    className="rounded-lg bg-gym-success/20 px-4 py-2 text-sm font-medium text-gym-success hover:bg-gym-success/30"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
