interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
}

export function ProgressBar({ completedTasks, totalTasks }: ProgressBarProps) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="w-full bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-sm">
        Progress: {completedTasks}/{totalTasks} tasks completed ({Math.round(progress)}%)
      </p>
    </div>
  );
}