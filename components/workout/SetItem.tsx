type SetItemProps = {
  weight: number;
  reps: number;
  onDelete: () => void;
};

export default function SetItem({
  weight,
  reps,
  onDelete,
}: SetItemProps) {
  return (
    <div className="flex justify-between items-center rounded-xl bg-zinc-800 px-4 py-2">

      <span className="text-white font-medium">
        {weight} kg × {reps}
      </span>

      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-400 transition"
      >
        🗑
      </button>

    </div>
  );
}