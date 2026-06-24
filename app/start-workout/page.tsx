"use client";

import { useRouter } from "next/navigation";


export default function StartWorkoutPage() {
  const router = useRouter();

  function selectWorkout(day: string) {
    router.push(`/workout?day=${day}`);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      
      <div className="max-w-xl mx-auto">

  <button
    onClick={() => router.push("/dashboard")}
    className="mb-6 text-blue-500 hover:text-blue-400 font-medium"
  >
    ← Back to Home
  </button>

  <h1 className="text-4xl font-bold text-white">
    Today's Workout
  </h1>

  <p className="mt-2 text-zinc-400">
    What are you training today?
  </p>

        <div className="space-y-5">

          {/* PUSH */}

          <button
            onClick={() => selectWorkout("Push")}
            className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 hover:border-red-500 hover:bg-zinc-800 transition p-6 text-left"
          >
            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-red-500">
                  🔴 Push
                </h2>

                <p className="text-zinc-400 mt-2">
                  Chest • Shoulders • Triceps
                </p>

              </div>

              <span className="text-3xl">
                →
              </span>

            </div>
          </button>

          {/* PULL */}

          <button
            onClick={() => selectWorkout("Pull")}
            className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 hover:border-blue-500 hover:bg-zinc-800 transition p-6 text-left"
          >
            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-blue-500">
                  🔵 Pull
                </h2>

                <p className="text-zinc-400 mt-2">
                  Back • Rear Delts • Biceps
                </p>

              </div>

              <span className="text-3xl">
                →
              </span>

            </div>
          </button>

          {/* LEGS */}

          <button
            onClick={() => selectWorkout("Legs")}
            className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 hover:border-green-500 hover:bg-zinc-800 transition p-6 text-left"
          >
            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-green-500">
                  🟢 Legs
                </h2>

                <p className="text-zinc-400 mt-2">
                  Quads • Hamstrings • Glutes • Calves
                </p>

              </div>

              <span className="text-3xl">
                →
              </span>

            </div>
          </button>

        </div>

      </div>

    </main>
  );
}