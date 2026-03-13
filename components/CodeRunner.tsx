"use client";

import { useState, useCallback } from "react";
import CodeEditor from "./CodeEditor";
import { runCode } from "@/lib/runCode";
import { cn } from "@/lib/utils";

interface CodeRunnerProps {
  defaultValue: string;
  language?: string;
  exerciseId?: string;
  height?: string | number;
  className?: string;
}

export default function CodeRunner({
  defaultValue,
  language = "javascript",
  exerciseId,
  height = 320,
  className,
}: CodeRunnerProps) {
  const [output, setOutput] = useState<{ logs: string[]; error: string | null } | null>(null);

  const handleRun = useCallback((code: string) => {
    const result = runCode(code);
    setOutput(result);
  }, []);

  return (
    <div className={cn("space-y-3", className)}>
      <CodeEditor
        key={exerciseId}
        defaultValue={defaultValue}
        language={language}
        questionId={exerciseId}
        onRun={handleRun}
        height={height}
      />
      <div className="rounded-lg border border-gym-border bg-gym-card">
        <div className="border-b border-gym-border px-3 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Output
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
    </div>
  );
}
