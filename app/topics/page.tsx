import { Suspense } from "react";
import TopicsContent from "./TopicsContent";

export default function TopicsPage() {
  return (
    <Suspense fallback={<div className="animate-pulse rounded-lg bg-gym-card p-8"><div className="h-8 w-3/4 rounded bg-gym-border" /></div>}>
      <TopicsContent />
    </Suspense>
  );
}
