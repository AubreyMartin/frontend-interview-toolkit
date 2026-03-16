"use client";

import { useCallback, useState } from "react";
import { runCode } from "@/lib/runCode";
import CodeEditor from "@/components/CodeEditor";
import { cn } from "@/lib/utils";

interface RealTimeCodingWorkspaceProps {
  className?: string;
}

const REALTIME_STORAGE_KEY = "realtime-coding:readme";

export default function RealTimeCodingWorkspace({ className }: RealTimeCodingWorkspaceProps) {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("// Start typing and use Run to see output\n");
  const [output, setOutput] = useState<{ logs: string[]; error: string | null } | null>(null);
  const [saved, setSaved] = useState<"idle" | "saved">("idle");
  const [questionText, setQuestionText] = useState<string>("");

  const steps: string[] = [
    "Use this space to practice solving problems in real time.",
    "Fill in your name so it appears at the top of the README for future reference.",
    "Add the interview question in the Question area below.",
    "Write your code in the editor.",
    "Click Run to see console output below.",
    "Use Save README to store your current session locally.",
    "Use Download README to export your session as a README.md file.",
  ];

  const handleRun = useCallback((currentCode: string) => {
    const result = runCode(currentCode);
    setOutput(result);
  }, []);

  const buildReadme = useCallback(
    (currentCode: string) => {
      const mdLines: string[] = [];
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      mdLines.push("# Real-time coding session");
      mdLines.push("");
      if (name.trim().length > 0) {
        mdLines.push(`- **Name**: ${name.trim()}`);
      }
      mdLines.push(`- **Date**: ${date}`);
      mdLines.push(`- **Time**: ${time}`);
      mdLines.push("- **Environment**: Browser-based JavaScript playground");
      mdLines.push("");
      if (questionText.trim().length > 0) {
        mdLines.push("## Question");
        mdLines.push("");
        mdLines.push(questionText.trim());
        mdLines.push("");
      }
      mdLines.push("## Steps");
      mdLines.push("");
      steps.forEach((s, idx) => {
        mdLines.push(`${idx + 1}. ${s}`);
      });
      mdLines.push("");
      mdLines.push("## Solution");
      mdLines.push("");
      mdLines.push("```javascript");
      mdLines.push(currentCode.trim().length === 0 ? "// (empty solution)" : currentCode);
      mdLines.push("```");
      mdLines.push("");
      return mdLines.join("\n");
    },
    [name, questionText, steps]
  );

  const handleSaveReadme = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const md = buildReadme(code);
      window.localStorage.setItem(REALTIME_STORAGE_KEY, md);
      setSaved("saved");
      window.setTimeout(() => setSaved("idle"), 2000);
    } catch {
      // ignore storage errors
    }
  }, [buildReadme, code]);

  const handleDownloadReadme = useCallback(() => {
    if (typeof window === "undefined") return;
    const md = buildReadme(code);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "real-time-coding-session.README.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [buildReadme, code]);

  return (
    <div className={cn("space-y-8", className)}>
      <section>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Steps
          </h2>
          <div className="flex flex-col gap-1 text-xs text-zinc-400 sm:text-right">
            <label className="flex flex-col gap-1 text-left sm:text-right">
              <span className="font-medium text-zinc-300">Your name (optional)</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aubrey Martin"
                className="w-full rounded-md border border-gym-border bg-gym-card px-2 py-1 text-xs text-white outline-none ring-0 focus:border-gym-accent focus:ring-1 focus:ring-gym-accent"
              />
            </label>
          </div>
        </div>
        <ol className="list-inside list-decimal space-y-2 rounded-lg border border-gym-border bg-gym-card p-4 text-zinc-300">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Question
          </label>
          <div className="rounded-lg border border-gym-border bg-gym-card p-3 text-sm text-zinc-200">
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="h-32 w-full resize-none bg-transparent font-normal outline-none"
              placeholder={"Add your question here for reference..."}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Your code
          </h2>
          <div className="flex items-center gap-2 text-xs">
            {saved === "saved" && <span className="text-emerald-400">README saved</span>}
            <button
              type="button"
              onClick={handleDownloadReadme}
              className="rounded border border-gym-border px-3 py-1 text-xs font-medium text-zinc-300 hover:border-gym-accent/70 hover:text-gym-accent"
            >
              Download README
            </button>
            <button
              type="button"
              onClick={handleSaveReadme}
              className="rounded border border-gym-accent px-3 py-1 text-xs font-medium text-gym-accent hover:bg-gym-accent/10"
            >
              Save README
            </button>
          </div>
        </div>
        <CodeEditor
          defaultValue={code}
          language="javascript"
          questionId="realtime"
          onCodeChange={setCode}
          onRun={handleRun}
          height={340}
        />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Output
        </h2>
        <div className="rounded-lg border border-gym-border bg-gym-card">
          <div className="border-b border-gym-border px-3 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Console
          </div>
          <div className="min-h-[80px] p-3 font-mono text-sm">
            {output == null ? (
              <span className="text-zinc-600">Click Run to see console output.</span>
            ) : (
              <>
                {output.error && (
                  <p className="mb-2 text-red-400">Error: {output.error}</p>
                )}
                {output.logs.length === 0 && !output.error && (
                  <span className="text-zinc-500">(no output)</span>
                )}
                {output.logs.map((line, i) => (
                  <div key={i} className="text-zinc-300">
                    {line}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

