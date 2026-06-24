"use client";

import { useRouter } from "next/navigation";

export default function WorkoutHistory() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-950 p-6">

      <div className="max-w-xl mx-auto">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-blue-500 hover:text-blue-400 font-medium"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-white">
          Workout History
        </h1>

        <p className="mt-2 text-zinc-400">
          Select a workout category.
        </p>

        <div className="mt-8 space-y-4">

          <button
            onClick={() =>
              router.push("/workout-history/push")
            }
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left hover:bg-zinc-800 transition"
          >
            <h2 className="text-3xl font-bold text-red-400">
              💪 Push
            </h2>

            <p className="mt-2 text-zinc-400">
              Chest • Shoulders • Triceps
            </p>
          </button>

          <button
            onClick={() =>
              router.push("/workout-history/pull")
            }
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left hover:bg-zinc-800 transition"
          >
            <h2 className="text-3xl font-bold text-blue-400">
              🏋 Pull
            </h2>

            <p className="mt-2 text-zinc-400">
              Back • Rear Delts • Biceps
            </p>
          </button>

          <button
            onClick={() =>
              router.push("/workout-history/legs")
            }
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left hover:bg-zinc-800 transition"
          >
            <h2 className="text-3xl font-bold text-green-400">
              🦵 Legs
            </h2>

            <p className="mt-2 text-zinc-400">
              Quads • Hamstrings • Glutes • Calves
            </p>
          </button>

        </div>

      </div>

    </main>
  );
}