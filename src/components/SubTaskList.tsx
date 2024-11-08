import { SubTask } from '../types';
import { TrashIcon } from '@heroicons/react/24/outline';

interface SubTaskListProps {
  subtasks: SubTask[];
  onToggleSubTask: (id: string) => void;
  onDeleteSubTask: (id: string) => void;
}

export function SubTaskList({ subtasks, onToggleSubTask, onDeleteSubTask }: SubTaskListProps) {
  return (
    <ul className="pl-6 mt-2 space-y-1">
      {subtasks.map((subtask) => (
        <li 
          key={subtask.id}
          className="flex items-center p-1.5 bg-white/5 rounded transition-all duration-300 hover:bg-white/10 group"
        >
          <input
            type="checkbox"
            checked={subtask.completed}
            onChange={() => onToggleSubTask(subtask.id)}
            className="mr-2 h-3 w-3 accent-blue-500"
          />
          <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-gray-400' : ''}`}>
            {subtask.text}
          </span>
          <button
            onClick={() => onDeleteSubTask(subtask.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-red-500"
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        </li>
      ))}
    </ul>
  );
}