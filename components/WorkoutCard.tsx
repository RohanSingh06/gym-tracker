"use client";

import { useState } from "react";
import { exercises } from "@/data/exercises";
import ExerciseCard from "./ExerciseCard";
import { createWorkout } from "@/lib/workoutService";

type SavedExercise = {
  name: string;
  sets: {
    id: number;
    weight: number;
    reps: number;
  }[];
};

export default function WorkoutCard() {
  const [workoutDay, setWorkoutDay] = useState("Push");

  const firstExercise =
    exercises[workoutDay as keyof typeof exercises][0];

  const [selectedExercise, setSelectedExercise] =
    useState(firstExercise);

  const [savedExercises, setSavedExercises] = useState<SavedExercise[]>([]);

  function saveExercise(exercise: SavedExercise) {
    setSavedExercises((prev) => [...prev, exercise]);
  }

  async function finishWorkout() {
    const workout = await createWorkout(workoutDay);

    if (!workout) {
      alert("Failed to save workout.");
      return;
    }

    console.log("Workout Saved:", workout);
    alert("Workout saved successfully!");
  }

  return (
    <div className="bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-800">

      <h2 className="text-3xl font-bold text-white mb-6">
        Workout Session
      </h2>

      {/* Workout Day */}

      <div className="mb-5">
        <label className="block text-zinc-400 mb-2">
          Workout Day
        </label>

        <select
          value={workoutDay}
          onChange={(e) => {
            const day = e.target.value;

            setWorkoutDay(day);

            const first =
              exercises[day as keyof typeof exercises][0];

            setSelectedExercise(first);
          }}
          className="w-full rounded-xl bg-zinc-800 text-white p-3 border border-zinc-700"
        >
          <option value="Push">Push</option>
          <option value="Pull">Pull</option>
          <option value="Legs">Legs</option>
        </select>
      </div>

      {/* Exercise */}

      <div className="mb-6">
        <label className="block text-zinc-400 mb-2">
          Exercise
        </label>

        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 text-white p-3 border border-zinc-700"
        >
          {exercises[
            workoutDay as keyof typeof exercises
          ].map((exercise) => (
            <option key={exercise}>{exercise}</option>
          ))}
        </select>
      </div>

      <ExerciseCard
        exerciseName={selectedExercise}
        onSave={saveExercise}
      />

      {savedExercises.length > 0 && (
        <div className="mt-6 bg-zinc-800 rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-3">
            Exercises Added
          </h3>

          {savedExercises.map((exercise, index) => (
            <p key={index} className="text-green-400">
              ✅ {exercise.name}
            </p>
          ))}
        </div>
      )}

      <button
        onClick={finishWorkout}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 text-lg font-semibold text-white"
      >
        Finish Workout
      </button>

    </div>
  );
}