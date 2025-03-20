export interface Task {
  title: string;
  description: string;
  completed: boolean;
}

interface AddTaskAction {
  type: "ADD_TASK";
  payload: {
    title: string;
    description: string;
  };
}

interface ToggleCompleteAction {
  type: "TOGGLE_COMPLETE";
  payload: number;
}

interface RemoveTaskAction {
  type: "REMOVE_TASK";
  payload: number;
}

interface SetInitialTasksAction {
  type: "SET_INITIAL_TASKS";
  payload: Task[];
}

export type TaskAction =
  | AddTaskAction
  | ToggleCompleteAction
  | RemoveTaskAction
  | SetInitialTasksAction;
