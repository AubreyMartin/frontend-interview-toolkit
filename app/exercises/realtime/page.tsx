"use client";

import RealTimeCodingWorkspace from "@/components/RealTimeCodingWorkspace";

export default function RealTimeCodingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Real-time coding</h1>
        <p className="mt-2 text-zinc-400">
          A lightweight playground for live problem solving. Follow the steps, write code,
          run it, and export your work as a README.
        </p>
      </div>

      <RealTimeCodingWorkspace />
    </div>
  );
}

