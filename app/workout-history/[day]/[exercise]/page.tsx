"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import { getExerciseHistory }
  from "@/lib/setHistoryService";

type WorkoutHistory = {
  workoutDate: string;
  sets: {
    weight: number;
    reps: number;
  }[];
};

export default function ExerciseHistoryPage() {

  const params = useParams();
  const router = useRouter();

  const exercise =
    decodeURIComponent(
      String(params.exercise)
    );

  const [history, setHistory] =
    useState<WorkoutHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    const data =
      await getExerciseHistory(
        user.id,
        exercise
      );

    setHistory(data);
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-6">

      <div className="max-w-xl mx-auto">

        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-500 hover:text-blue-400 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-white">
          {exercise}
        </h1>

        <p className="mt-2 text-zinc-400">
          Sessions Found: {history.length}
        </p>

        <div className="mt-8 space-y-6">

          {history.map(
            (session, index) => (

              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
              >

                <h2 className="text-lg font-semibold text-white">
                  {new Date(
                    session.workoutDate
                  ).toLocaleDateString()}
                </h2>

                <div className="mt-4 space-y-2">

                  {session.sets.map(
                    (set, setIndex) => (

                      <div
                        key={setIndex}
                        className="flex justify-between text-zinc-300"
                      >
                        <span>
                          Set {setIndex + 1}
                        </span>

                        <span>
                          {set.weight} kg × {set.reps}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}