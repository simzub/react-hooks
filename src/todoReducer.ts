import { Task, TaskAction } from "./model.ts";

export const taskReducer = (state: Task[], action: TaskAction) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          title: action.payload.title,
          description: action.payload.description,
          completed: false,
        },
        ...state,
      ];
    case "TOGGLE_COMPLETE":
      return state.map((task, index) =>
        index === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "REMOVE_TASK":
      return state.filter((_, index) => index !== action.payload);
    case "SET_INITIAL_TASKS":
      return action.payload;
    default:
      return state;
  }
};
