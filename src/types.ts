export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  task: string;
  completed: boolean;
  timeSpent?: number;
  isSelected?: boolean;
  subtasks: SubTask[];
}

export interface UISettings {
  buttonRadius: number;
}