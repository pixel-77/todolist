interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ min, max, value, onChange }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
    />
  );
}