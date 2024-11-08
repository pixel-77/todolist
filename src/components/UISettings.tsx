import { Slider } from './Slider';

interface UISettingsProps {
  buttonRadius: number;
  onRadiusChange: (value: number) => void;
}

export function UISettings({ buttonRadius, onRadiusChange }: UISettingsProps) {
  return (
    <div className="p-4 bg-white/5 rounded-xl backdrop-blur-lg border border-white/10 mb-4">
      <h3 className="text-sm font-medium mb-3">Customize Interface</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 mb-2 block">Button Roundness</label>
          <Slider
            min={2}
            max={20}
            value={buttonRadius}
            onChange={onRadiusChange}
          />
        </div>
      </div>
    </div>
  );
}