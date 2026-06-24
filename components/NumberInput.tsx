type NumberInputProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onChange: (value: number) => void;
};

export default function NumberInput({
  value,
  onDecrease,
  onIncrease,
  onChange,
}: NumberInputProps) {
  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-lg w-24 h-9 px-1">

      <button
        type="button"
        onClick={onDecrease}
        className="flex items-center justify-center w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm"
      >
        −
      </button>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-10 bg-transparent text-center text-white text-sm font-semibold outline-none appearance-none"
      />

      <button
        type="button"
        onClick={onIncrease}
        className="flex items-center justify-center w-6 h-6 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
      >
        +
      </button>

    </div>
  );
}