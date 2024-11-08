import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface TimerProps {
  isRunning: boolean;
  onToggle: () => void;
  time: number;
  buttonRadius: number;
}

export function Timer({ isRunning, onToggle, time, buttonRadius }: TimerProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onToggle}
        className="p-2 bg-white/10 hover:bg-white/20 transition-colors"
        style={{ borderRadius: `${buttonRadius}px` }}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? (
          <PauseIcon className="h-5 w-5" />
        ) : (
          <PlayIcon className="h-5 w-5" />
        )}
      </button>
      <p className="text-lg font-medium">
        {Math.floor(time / 60)}:{time % 60 < 10 ? '0' : ''}{time % 60}
      </p>
    </div>
  );
}