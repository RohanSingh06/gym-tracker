import ExerciseCard from "./ExerciseCard";

type WorkoutExercise = {
  exercise: string;
  sets: {
    weight: number;
    reps: number;
  }[];
};

type ExerciseListProps = {
  exercises: WorkoutExercise[];

  onDeleteSet: (
    exerciseName: string,
    setIndex: number
  ) => void;
};

export default function ExerciseList({
  exercises,
  onDeleteSet,
}: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-8 text-center">

        <h2 className="text-xl font-semibold text-white">
          No exercises yet
        </h2>

        <p className="mt-2 text-zinc-400">
          Start by adding your first set below.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.exercise}
          exercise={exercise}
          onDeleteSet={onDeleteSet}
        />
      ))}

    </div>
  );
}