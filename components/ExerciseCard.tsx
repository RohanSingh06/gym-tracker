"use client";

import { useState } from "react";
import SetRow from "./SetRow";

type SetType = {
  id: number;
  weight: number;
  reps: number;
};

type SavedExercise = {
  name: string;
  sets: SetType[];
};

type Props = {
  exerciseName: string;
  onSave: (exercise: SavedExercise) => void;
};

export default function ExerciseCard({
  exerciseName,
  onSave,
}: Props) {
  const [sets, setSets] = useState<SetType[]>([
    {
      id: 1,
      weight: 0,
      reps: 0,
    },
  ]);

  function updateWeight(id: number, weight: number) {
    console.log("Weight changed:", id, weight);

    setSets((prev) =>
      prev.map((set) =>
        set.id === id
          ? { ...set, weight }
          : set
      )
    );
  }

  function updateReps(id: number, reps: number) {
    console.log("Reps changed:", id, reps);

    setSets((prev) =>
      prev.map((set) =>
        set.id === id
          ? { ...set, reps }
          : set
      )
    );
  }

  function addSet() {
    const lastSet = sets[sets.length - 1];

    setSets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        weight: lastSet.weight,
        reps: lastSet.reps,
      },
    ]);
  }

  function saveExercise() {
    console.log("Saving Exercise:", {
      name: exerciseName,
      sets,
    });

    onSave({
      name: exerciseName,
      sets,
    });
  }

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 mb-6">

      <h2 className="text-2xl font-bold text-white mb-5">
        {exerciseName}
      </h2>

      <div className="grid grid-cols-5 text-zinc-500 text-xs uppercase mb-3">
        <p>Set</p>
        <p>Previous</p>
        <p>Weight</p>
        <p>Reps</p>
        <p>✓</p>
      </div>

      {sets.map((set) => (
        <SetRow
          key={set.id}
          setNumber={set.id}
          weight={set.weight}
          reps={set.reps}
          onWeightChange={(weight) =>
            updateWeight(set.id, weight)
          }
          onRepsChange={(reps) =>
            updateReps(set.id, reps)
          }
        />
      ))}

      <button
        onClick={addSet}
        className="mt-5 w-full rounded-xl border border-dashed border-zinc-700 py-3 text-zinc-300 hover:bg-zinc-800 transition"
      >
        + Add Set
      </button>

      <button
        onClick={saveExercise}
        className="mt-3 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold transition"
      >
        Save Exercise
      </button>

    </div>
  );
}