"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ExerciseList from "./ExerciseList";
import BottomPanel from "./BottomPanel";

import { saveWorkout } from "@/lib/workoutService";

type WorkoutExercise = {
  exercise: string;
  sets: {
    weight: number;
    reps: number;
  }[];
};

export default function WorkoutSession() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const workoutDay = searchParams.get("day") || "Push";

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [saving, setSaving] = useState(false);

  function addSet(
    exerciseName: string,
    weight: number,
    reps: number
  ) {
    setWorkoutExercises((previous) => {
      const existingExercise = previous.find(
        (exercise) => exercise.exercise === exerciseName
      );

      if (existingExercise) {
        return previous.map((exercise) => {
          if (exercise.exercise === exerciseName) {
            return {
              ...exercise,
              sets: [
                ...exercise.sets,
                {
                  weight,
                  reps,
                },
              ],
            };
          }

          return exercise;
        });
      }

      return [
        ...previous,
        {
          exercise: exerciseName,
          sets: [
            {
              weight,
              reps,
            },
          ],
        },
      ];
    });
  }

  function deleteSet(
    exerciseName: string,
    setIndex: number
  ) {
    setWorkoutExercises((previous) => {
      return previous
        .map((exercise) => {
          if (exercise.exercise !== exerciseName) {
            return exercise;
          }

          return {
            ...exercise,
            sets: exercise.sets.filter(
              (_, index) => index !== setIndex
            ),
          };
        })
        .filter((exercise) => exercise.sets.length > 0);
    });
  }

  async function finishWorkout() {
    if (workoutExercises.length === 0) {
      alert("Please add at least one exercise.");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login again.");
      return;
    }

    const user = JSON.parse(storedUser);

    setSaving(true);

    const success = await saveWorkout(
      user.id,
      workoutDay,
      workoutExercises
    );

    setSaving(false);

    if (!success) {
      alert("Failed to save workout.");
      return;
    }

    alert("Workout Saved Successfully 💪");

    setWorkoutExercises([]);

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Header */}

      <div className="max-w-xl mx-auto px-5 pt-8 pb-5">
        <button
           onClick={() => router.push("/dashboard")}
            className="mb-4 text-blue-500 hover:text-blue-400 font-medium"
            >
            ← Back to Home
          </button>

        <h1 className="text-4xl font-bold text-white">
          Today's Workout
        </h1>

        <p className="text-zinc-400 mt-2 text-lg font-medium">
          {workoutDay} Day
        </p>

      </div>

      {/* Exercise List */}

      <div
        className="max-w-xl mx-auto px-5"
        style={{ paddingBottom: "120px" }}
      >

        <ExerciseList
          exercises={workoutExercises}
          onDeleteSet={deleteSet}
        />

        <button
          onClick={finishWorkout}
          disabled={saving}
          className="w-full mt-6 rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-green-400 transition py-4 text-lg font-semibold text-white"
        >
          {saving
            ? "Saving Workout..."
            : "✅ Finish Today's Workout"}
        </button>

      </div>

      <BottomPanel
        workoutDay={workoutDay}
        onAddSet={addSet}
      />

    </div>
  );
}