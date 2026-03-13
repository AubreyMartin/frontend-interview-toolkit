/**
 * Run user code in a sandboxed way and capture console.log output.
 */
export interface RunResult {
  logs: string[];
  error: string | null;
}

export function runCode(code: string): RunResult {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
    },
    warn: (...args: unknown[]) => {
      logs.push("[warn] " + args.map(String).join(" "));
    },
    error: (...args: unknown[]) => {
      logs.push("[error] " + args.map(String).join(" "));
    },
  };

  try {
    const fn = new Function("console", code);
    fn(fakeConsole);
  } catch (e) {
    return {
      logs,
      error: e instanceof Error ? e.message : String(e),
    };
  }
  return { logs, error: null };
}
