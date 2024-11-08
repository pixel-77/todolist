import { useState } from 'react';

interface TaskInputProps {
  onAddTask: (task: string) => void;
  buttonRadius: number;
}

export function TaskInput({ onAddTask, buttonRadius }: TaskInputProps) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        className="flex-1 p-3 bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        style={{ borderRadius: `${buttonRadius}px` }}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        aria-label="New Task"
      />
      <button
        onClick={handleAddTask}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
        style={{ borderRadius: `${buttonRadius}px` }}
      >
        Add
      </button>
    </div>
  );
}