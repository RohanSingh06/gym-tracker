"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getExercisesByWorkoutDay } from "@/lib/exerciseHistoryService";

export default function WorkoutDayHistoryPage() {
  const params = useParams();
  const router = useRouter();

  const day =
    String(params.day).charAt(0).toUpperCase() +
    String(params.day).slice(1);

  const [exercises, setExercises] = useState<string[]>([]);

  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    const data =
      await getExercisesByWorkoutDay(
        user.id,
        day
      );

    setExercises(data);
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-6">

      <div className="max-w-xl mx-auto">

        <button
          onClick={() =>
            router.push("/workout-history")
          }
          className="mb-6 text-blue-500 hover:text-blue-400 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-white">
          {day}
        </h1>

        <p className="mt-2 text-zinc-400">
          Select an exercise.
        </p>

        <div className="mt-8 space-y-4">

          {exercises.map((exercise) => (

            <button
              key={exercise}
              onClick={() =>
                router.push(
                  `/workout-history/${day.toLowerCase()}/${encodeURIComponent(
                    exercise
                  )}`
                )
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left hover:bg-zinc-800 transition"
            >
              <h2 className="text-xl font-semibold text-white">
                {exercise}
              </h2>
            </button>

          ))}

        </div>

      </div>

    </main>
  );
}