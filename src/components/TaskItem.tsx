import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../models/model";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleComplete: (index: number) => void;
  removeTask: (index: number) => void;
}

const TaskItem = ({
  task,
  index,
  toggleComplete,
  removeTask,
}: TaskItemProps) => {
  return (
    <div className="relative bg-gray-200 dark:bg-gray-600 flex flex-col rounded-2xl m-8">
      <div className="py-4 ps-8">
        <h1
          className={`mb-2 font-bold text-xl dark:text-white ${
            task.completed && "line-through"
          }`}
        >
          {task.title}
        </h1>
        <p
          className={`max-w-4/5 text-gray-500 dark:text-gray-100 ${
            task.completed && "line-through"
          }`}
        >
          {task.description}
        </p>
      </div>
      <div className="flex justify-center items-center gap-2 absolute end-4 top-1/2 -translate-y-1/2">
        <input
          checked={task.completed}
          type="checkbox"
          className="h-7 w-7 accent-amber-400 dark:accent-teal-500 cursor-pointer"
          onClick={() => toggleComplete(index)}
        />
        <DeleteIcon
          className="cursor-pointer"
          color="error"
          fontSize="large"
          onClick={() => removeTask(index)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
