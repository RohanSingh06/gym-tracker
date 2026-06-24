import WorkoutSession from "@/components/workout/WorkoutSession";
import { Suspense } from "react";

export default function WorkoutPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Suspense fallback={<div>Loading...</div>}>
        <WorkoutSession />
      </Suspense>
    </main>
  );
}