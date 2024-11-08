import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { ProgressBar } from './components/ProgressBar';
import { ThemeToggle } from './components/ThemeToggle';
import { Timer } from './components/Timer';
import { UISettings } from './components/UISettings';
import { type Task, type SubTask } from './types';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [buttonRadius, setButtonRadius] = useState(8);

  const addTask = (taskText: string) => {
    setTasks([...tasks, { 
      id: uuidv4(),
      task: taskText, 
      completed: false,
      subtasks: []
    }]);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          completed: !task.completed,
          subtasks: task.subtasks.map(st => ({ ...st, completed: !task.completed }))
        };
        if (updatedTask.completed && task.isSelected) {
          updatedTask.timeSpent = time;
          setIsTimerRunning(false);
          setTime(0);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addSubTask = (taskId: string, subtaskText: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...task.subtasks, { 
            id: uuidv4(),
            text: subtaskText,
            completed: false
          }]
        };
      }
      return task;
    }));
  };

  const toggleSubTask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(st => 
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return task;
    }));
  };

  const deleteSubTask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter(st => st.id !== subtaskId)
        };
      }
      return task;
    }));
  };

  const selectTaskForTimer = (taskId: string) => {
    setTasks(tasks.map(task => ({
      ...task,
      isSelected: task.id === taskId
    })));
    setTime(0);
    setIsTimerRunning(true);
  };

  const completedTasks = tasks.filter(task => 
    task.completed && task.subtasks.every(st => st.completed)
  ).length;
  const totalTasks = tasks.length;

  useEffect(() => {
    if (completedTasks === totalTasks && totalTasks > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [completedTasks, totalTasks]);

  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 text-gray-900'
    }`}>
      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          Task Master
        </h1>
        <Timer 
          isRunning={isTimerRunning}
          onToggle={() => setIsTimerRunning(!isTimerRunning)}
          time={time}
          buttonRadius={buttonRadius}
        />
      </div>

      <div className="w-full max-w-2xl">
        <UISettings 
          buttonRadius={buttonRadius}
          onRadiusChange={setButtonRadius}
        />

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
          <TaskInput onAddTask={addTask} buttonRadius={buttonRadius} />
          <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
          <TaskList 
            tasks={tasks} 
            onToggleTask={toggleTaskCompletion}
            onDeleteTask={deleteTask}
            onAddSubTask={addSubTask}
            onToggleSubTask={toggleSubTask}
            onDeleteSubTask={deleteSubTask}
            buttonRadius={buttonRadius}
          />

          <button 
            onClick={() => alert('Still under development')}
            className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 font-medium transition-all duration-300 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700"
            style={{ borderRadius: `${buttonRadius}px` }}
          >
            View Leaderboard
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          An LTA Production
        </p>
      </div>

      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          initialVelocityY={20}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
    </div>
  );
}