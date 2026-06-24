import SetItem from "./SetItem";

type WorkoutExercise = {
  exercise: string;
  sets: {
    weight: number;
    reps: number;
  }[];
};

type ExerciseCardProps = {
  exercise: WorkoutExercise;

  onDeleteSet: (
    exerciseName: string,
    setIndex: number
  ) => void;
};

export default function ExerciseCard({
  exercise,
  onDeleteSet,
}: ExerciseCardProps) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

      <div className="flex justify-between items-center mb-3">

        <h2 className="text-xl font-semibold text-white">
          {exercise.exercise}
        </h2>

      </div>

      <div className="space-y-2">

        {exercise.sets.map((set, index) => (
          <SetItem
            key={index}
            weight={set.weight}
            reps={set.reps}
            onDelete={() =>
              onDeleteSet(exercise.exercise, index)
            }
          />
        ))}

      </div>

    </div>
  );
}