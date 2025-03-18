import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext.ts";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[] | []>();
  const themeContext = useContext(ThemeContext);

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
    setTasks(initialTasks);
  }, []);

  const toggleComplete = (index: number) => {
    const updatedTasks = tasks?.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <button className="m-6" onClick={themeContext.toggleTheme}>
        {themeContext.theme === "light" ? (
          <DarkModeIcon fontSize="large" />
        ) : (
          <LightModeIcon fontSize="large" className="text-white" />
        )}
      </button>
      <div className="flex flex-col w-140 mx-auto my-20">
        <div className="flex justify-between items-center bg-amber-400 dark:bg-teal-500 h-40 rounded-t-3xl px-10">
          <h1 className=" text-black dark:text-white font-bold text-3xl">
            Task List
          </h1>
          <button className="flex items-center gap-1 justify-center bg-white dark:bg-gray-800 py-2 px-3 rounded-2xl text-2xl dark:text-white transition delay-50 duration-300 ease-in-out cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            <AddIcon fontSize="medium" />
            <span>New</span>
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-b-3xl">
          {tasks?.map((task, index) => (
            <div
              key={index}
              className="relative bg-gray-200 dark:bg-gray-600 flex flex-col rounded-2xl m-8 cursor-pointer"
              onClick={() => toggleComplete(index)}
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
                  className={`max-w-5/6 text-gray-500 dark:text-gray-100 ${
                    task.completed && "line-through"
                  }`}
                >
                  {task.description}
                </p>
              </div>
              <input
                checked={task.completed}
                type="checkbox"
                className="absolute end-6 top-1/2 -translate-y-1/2 h-8 w-8 accent-amber-400  dark:accent-teal-500"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
