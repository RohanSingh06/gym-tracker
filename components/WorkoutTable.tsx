type SetData = {
  previous: string;
  weight: number;
  reps: number;
  completed: boolean;
};

type WorkoutTableProps = {
  exerciseName: string;
};

export default function WorkoutTable({
  exerciseName,
}: WorkoutTableProps) {
  const sets: SetData[] = [
    {
      previous: "80 × 8",
      weight: 80,
      reps: 8,
      completed: false,
    },
    {
      previous: "80 × 8",
      weight: 80,
      reps: 8,
      completed: false,
    },
    {
      previous: "75 × 10",
      weight: 75,
      reps: 10,
      completed: false,
    },
  ];

  return (
    <div className="bg-zinc-800 rounded-2xl p-5">

      <h3 className="text-white text-2xl font-bold mb-5">
        {exerciseName}
      </h3>

      <div className="grid grid-cols-5 text-zinc-400 text-sm mb-3">

        <p>SET</p>

        <p>PREVIOUS</p>

        <p>KG</p>

        <p>REPS</p>

        <p>✓</p>

      </div>

      {sets.map((set, index) => (
        <div
          key={index}
          className="grid grid-cols-5 items-center py-3 border-t border-zinc-700"
        >
          <p className="text-white">{index + 1}</p>

          <p className="text-zinc-300">
            {set.previous}
          </p>

          <input
            type="number"
            defaultValue={set.weight}
            className="bg-zinc-900 rounded-lg p-2 text-center text-white w-16"
          />

          <input
            type="number"
            defaultValue={set.reps}
            className="bg-zinc-900 rounded-lg p-2 text-center text-white w-16"
          />

          <input
            type="checkbox"
            className="w-5 h-5"
          />
        </div>
      ))}

      <button className="mt-5 w-full bg-zinc-700 hover:bg-zinc-600 rounded-xl py-3 text-white">
        + Add Set
      </button>

    </div>
  );
}