import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ darkMode, onToggle }: ThemeToggleProps) {
  return (
    <div className="absolute top-4 right-4">
      <button 
        onClick={onToggle} 
        className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-blue-500" />
        )}
      </button>
    </div>
  );
}