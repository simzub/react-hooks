import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext, useEffect, useReducer, useState } from "react";
import ThemeContext from "./ThemeContext.ts";
import { Task } from "./model.ts";
import { taskReducer } from "./todoReducer.ts";
import CreateTaskModal from "./CreateTaskModal.tsx";

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const themeContext = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Hardcoded initial to-do items
  const initialTasks: Task[] = [
    {
      title: "Learn React Hooks",
      description:
        "Donec nec est eget mi ultricies pharetra id at enim. Dui ultrices nunc at metus tincidunt pharetra.",
      completed: false,
    },
    {
      title: "Build a to-do app",
      description:
        "Donec nec est eget mi ultricies pharetra id at enim. Dui ultrices nunc at metus tincidunt pharetra.",
      completed: false,
    },
    {
      title: "Write unit tests",
      description:
        "Donec nec est eget mi ultricies pharetra id at enim. Dui ultrices nunc at metus tincidunt pharetra.",
      completed: true,
    },
  ];

  // Set initial to-do items when the component mounts
  useEffect(() => {
    dispatch({ type: "SET_INITIAL_TASKS", payload: initialTasks });
  }, []);

  const toggleComplete = (index: number) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: index });
  };

  const addTask = (title: string, description: string) => {
    dispatch({ type: "ADD_TASK", payload: { title, description } });
  };

  const removeTask = (index: number) => {
    dispatch({ type: "REMOVE_TASK", payload: index });
  };

  return (
    <>
      <CreateTaskModal open={open} onClose={handleClose} onAddTask={addTask} />
      <button className="m-6" onClick={themeContext.toggleTheme}>
        {themeContext.theme === "light" ? (
          <DarkModeIcon fontSize="large" />
        ) : (
          <LightModeIcon fontSize="large" className="text-white" />
        )}
      </button>
      <div className="flex flex-col w-140 mx-auto my-20">
        <div
          className={`flex justify-between items-center bg-amber-400 dark:bg-teal-500 h-40 rounded-t-3xl px-10 ${
            !tasks.length && "rounded-b-3xl"
          }`}
        >
          <h1 className=" text-black dark:text-white font-bold text-3xl">
            Task List
          </h1>
          <button
            className="flex items-center gap-1 justify-center bg-white dark:bg-gray-800 py-2 px-3 rounded-2xl text-2xl dark:text-white transition delay-50 duration-300 ease-in-out cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleClickOpen()}
          >
            <AddIcon fontSize="medium" />
            <span>New</span>
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-b-3xl">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="relative bg-gray-200 dark:bg-gray-600 flex flex-col rounded-2xl m-8"
            >
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
                  className="h-7 w-7 accent-amber-400  dark:accent-teal-500 cursor-pointer "
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
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
