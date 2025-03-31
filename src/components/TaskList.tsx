import { Task } from "../models/model";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (index: number) => void;
  removeTask: (index: number) => void;
}

const TaskList = ({ tasks, toggleComplete, removeTask }: TaskListProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-b-3xl">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
