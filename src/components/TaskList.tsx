import { type Task } from '../types';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { SubTaskList } from './SubTaskList';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddSubTask: (taskId: string, subtask: string) => void;
  onToggleSubTask: (taskId: string, subtaskId: string) => void;
  onDeleteSubTask: (taskId: string, subtaskId: string) => void;
  buttonRadius: number;
}

export function TaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
  buttonRadius 
}: TaskListProps) {
  const [newSubTasks, setNewSubTasks] = useState<Record<string, string>>({});

  const handleAddSubTask = (taskId: string) => {
    const subtaskText = newSubTasks[taskId]?.trim();
    if (subtaskText) {
      onAddSubTask(taskId, subtaskText);
      setNewSubTasks(prev => ({ ...prev, [taskId]: '' }));
    }
  };

  return (
    <ul className="space-y-3 mb-6">
      {tasks.map((task) => (
        <li 
          key={task.id}
          className="bg-white/10 rounded-xl backdrop-blur-lg border border-white/10 overflow-hidden"
        >
          <div className="p-3 flex items-center group">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="mr-3 h-4 w-4 accent-blue-500"
              style={{ borderRadius: `${buttonRadius/4}px` }}
            />
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.task}
            </span>
            {task.timeSpent !== undefined && (
              <span className="text-sm text-gray-400 mr-3">
                {Math.floor(task.timeSpent / 60)}:{task.timeSpent % 60 < 10 ? '0' : ''}{task.timeSpent % 60}
              </span>
            )}
            <button
              onClick={() => onDeleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
              style={{ borderRadius: `${buttonRadius/2}px` }}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="px-3 pb-3">
            <SubTaskList
              subtasks={task.subtasks}
              onToggleSubTask={(subtaskId) => onToggleSubTask(task.id, subtaskId)}
              onDeleteSubTask={(subtaskId) => onDeleteSubTask(task.id, subtaskId)}
            />
            
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newSubTasks[task.id] || ''}
                onChange={(e) => setNewSubTasks(prev => ({ ...prev, [task.id]: e.target.value }))}
                placeholder="Add subtask"
                className="flex-1 text-sm p-1.5 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ borderRadius: `${buttonRadius/2}px` }}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubTask(task.id)}
              />
              <button
                onClick={() => handleAddSubTask(task.id)}
                className="p-1.5 bg-white/10 hover:bg-white/20 transition-colors"
                style={{ borderRadius: `${buttonRadius/2}px` }}
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}