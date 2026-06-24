"use client";

import { getExerciseUsage } from "@/lib/exercisePriorityService";
import { useEffect, useMemo, useState } from "react";
import { exercises } from "@/data/exercises";
import { getPreviousExerciseData } from "@/lib/previousWorkoutService";

type BottomPanelProps = {
  workoutDay: string;
  onAddSet: (
    exercise: string,
    weight: number,
    reps: number
  ) => void;
};

type PreviousSet = {
  weight: number;
  reps: number;
};

export default function BottomPanel({
  workoutDay,
  onAddSet,
}: BottomPanelProps) {
  const [isExpanded, setIsExpanded] =
    useState(true);

  const [equipment, setEquipment] = useState<
    "Barbell" | "Dumbbell" | "Machine" | "Cable" | "Other"
  >("Barbell");

  const [exercise, setExercise] = useState("");

  const [weight, setWeight] = useState("");

  const [reps, setReps] = useState("");

  const [previousSets, setPreviousSets] =
    useState<PreviousSet[]>([]);

  const [usageCounts, setUsageCounts] =
    useState<Record<string, number>>({});

  const [suggestedSetIndex, setSuggestedSetIndex] =
    useState(0);

  const exerciseList = useMemo<string[]>(() => {

  const list =
    exercises[
      workoutDay as keyof typeof exercises
    ][equipment] ?? [];

  return [...list].sort((a, b) => {

    const countA = usageCounts[a] ?? 0;
    const countB = usageCounts[b] ?? 0;

    return countB - countA;

  });

}, [
  workoutDay,
  equipment,
  usageCounts,
]);

async function loadExercisePriority() {

  const storedUser =
    localStorage.getItem("user");

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  const counts =
    await getExerciseUsage(user.id);

  console.log(
    "Exercise Usage:",
    counts
  );

  setUsageCounts(counts);
}

async function loadPreviousWorkout() {

  const storedUser =
    localStorage.getItem("user");

  if (!storedUser || !exercise) {
    setPreviousSets([]);
    setSuggestedSetIndex(0);
    return;
  }

  const user =
    JSON.parse(storedUser);

  const sets =
    await getPreviousExerciseData(
      user.id,
      exercise
    );

  setPreviousSets(sets);
  setSuggestedSetIndex(0);

  if (sets.length > 0) {
    setWeight(String(sets[0].weight));
    setReps(String(sets[0].reps));
  } else {
    setWeight("");
    setReps("");
  }
}

function handleEquipmentChange(
  e: React.ChangeEvent<HTMLSelectElement>
) {
  setEquipment(
    e.target.value as
      | "Barbell"
      | "Dumbbell"
      | "Machine"
      | "Cable"
      | "Other"
  );
}

function handleAddSet() {

  if (!exercise) {
    alert("Please select an exercise.");
    return;
  }

  if (!weight || !reps) {
    alert("Please enter weight and reps.");
    return;
  }

  onAddSet(
    exercise,
    Number(weight),
    Number(reps)
  );

  const nextIndex =
    suggestedSetIndex + 1;

  if (
    previousSets.length > 0 &&
    nextIndex < previousSets.length
  ) {

    setSuggestedSetIndex(nextIndex);

    setWeight(
      String(
        previousSets[nextIndex].weight
      )
    );

    setReps(
      String(
        previousSets[nextIndex].reps
      )
    );

  } else {

    setWeight("");
    setReps("");

  }
}

useEffect(() => {
  setExercise(exerciseList[0] ?? "");
}, [exerciseList]);

useEffect(() => {
  loadPreviousWorkout();
}, [exercise]);

useEffect(() => {
  loadExercisePriority();
}, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md">

      {/* Header */}

      <button
        onClick={() =>
          setIsExpanded(!isExpanded)
        }
        className="w-full py-3 text-center font-semibold text-white border-b border-zinc-800"
      >
        {isExpanded
          ? "▼ Add Workout"
          : "▲ Add Workout"}
      </button>

      {/* Expandable Content */}

      {isExpanded && (

        <div className="max-w-xl mx-auto p-4 space-y-3">

          {/* Equipment */}

          <select
            value={equipment}
            onChange={
              handleEquipmentChange
            }
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-3 text-white"
          >
            <option value="Barbell">
              Barbell
            </option>

            <option value="Dumbbell">
              Dumbbell
            </option>

            <option value="Machine">
              Machine
            </option>

            <option value="Cable">
              Cable
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          {/* Exercise */}

          <select
            value={exercise}
            onChange={(e) =>
              setExercise(
                e.target.value
              )
            }
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-3 text-white"
          >
            {exerciseList.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          {/* Previous Workout */}

          {previousSets.length > 0 && (

            <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-3">

              <p className="mb-2 text-sm font-semibold text-zinc-300">
                Previous Workout
              </p>

              <div className="space-y-1">

                {previousSets.map(
                  (
                    set,
                    index
                  ) => (
                    <p
                      key={index}
                      className="text-sm text-zinc-400"
                    >
                      {set.weight} kg ×{" "}
                      {set.reps}
                    </p>
                  )
                )}

              </div>

            </div>

          )}

          {/* Weight & Reps */}

          <div className="grid grid-cols-2 gap-3">

            <input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) =>
                setWeight(
                  e.target.value
                )
              }
              className="rounded-xl bg-zinc-800 border border-zinc-700 p-3 text-white"
            />

            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) =>
                setReps(
                  e.target.value
                )
              }
              className="rounded-xl bg-zinc-800 border border-zinc-700 p-3 text-white"
            />

          </div>

          {/* Add Set */}

          <button
            onClick={
              handleAddSet
            }
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition"
          >
            + Add Set
          </button>

        </div>

      )}

    </div>
  );
}