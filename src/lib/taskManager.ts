// Task Manager - zarządzanie stanem zadań

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: "beginner" | "intermediate" | "advanced";
}

const STORAGE_KEY = "wikamp_completed_tasks";

export const getCompletedTasks = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const markTaskAsCompleted = (taskId: string): void => {
  const completed = getCompletedTasks();
  if (!completed.includes(taskId)) {
    completed.push(taskId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent("taskCompleted", { detail: { taskId } }));
  }
};

export const isTaskCompleted = (taskId: string): boolean => {
  return getCompletedTasks().includes(taskId);
};

export const getTotalPoints = (): number => {
  // This would normally fetch from a database
  // For now, return based on completed tasks
  return getCompletedTasks().length * 10;
};
