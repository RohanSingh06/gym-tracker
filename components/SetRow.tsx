"use client";

import NumberInput from "./NumberInput";

type Props = {
  setNumber: number;
  weight: number;
  reps: number;
  onWeightChange: (value: number) => void;
  onRepsChange: (value: number) => void;
};

export default function SetRow({
  setNumber,
  weight,
  reps,
  onWeightChange,
  onRepsChange,
}: Props) {
  return (
    <div className="grid grid-cols-5 items-center gap-3 py-3 border-b border-zinc-800">

      {/* Set Number */}
      <div className="text-white font-semibold text-center">
        {setNumber}
      </div>

      {/* Previous Workout */}
      <div className="text-zinc-400 text-center">
        --
      </div>

      {/* Weight */}
      <NumberInput
        value={weight}
        onDecrease={() => onWeightChange(Math.max(0, weight - 2.5))}
        onIncrease={() => onWeightChange(weight + 2.5)}
        onChange={onWeightChange}
      />

      {/* Reps */}
      <NumberInput
        value={reps}
        onDecrease={() => onRepsChange(Math.max(0, reps - 1))}
        onIncrease={() => onRepsChange(reps + 1)}
        onChange={onRepsChange}
      />

      {/* Completed */}
      <div className="flex justify-center">
        <input
          type="checkbox"
          className="w-5 h-5 accent-green-500"
        />
      </div>

    </div>
  );
}