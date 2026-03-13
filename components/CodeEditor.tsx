"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  questionId?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  className?: string;
  height?: string | number;
}

export default function CodeEditor({
  defaultValue = "// Start coding here...",
  language = "javascript",
  questionId,
  onCodeChange,
  onRun,
  className,
  height = 320,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue);

  const handleChange = useCallback(
    (value: string | undefined) => {
      const v = value ?? "";
      setCode(v);
      onCodeChange?.(v);
    },
    [onCodeChange]
  );

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gym-border bg-gym-card", className)}>
      <div className="flex items-center justify-between border-b border-gym-border px-3 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {language}
        </span>
        {onRun && (
          <button
            type="button"
            onClick={() => onRun(code)}
            className="rounded bg-gym-accent px-3 py-1 text-sm font-medium text-gym-dark hover:bg-gym-accent/90"
          >
            Run
          </button>
        )}
      </div>
      <MonacoEditor
        key={questionId}
        height={typeof height === "number" ? `${height}px` : height}
        defaultLanguage={language}
        defaultValue={defaultValue}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 12 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
