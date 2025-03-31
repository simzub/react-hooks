import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";
import ThemeContext from "./context/ThemeContext";
import { taskReducer } from "./reducers/todoReducer";
import useDebounce from "./hooks/useDebounce";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { initialTasks } from "./data/initialTasks.ts";

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const themeContext = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    dispatch({ type: "SET_INITIAL_TASKS", payload: initialTasks });
  }, []);

  const toggleComplete = useCallback(
    (index: number) => {
      dispatch({ type: "TOGGLE_COMPLETE", payload: index });
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, description: string) => {
      dispatch({ type: "ADD_TASK", payload: { title, description } });
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (index: number) => {
      dispatch({ type: "REMOVE_TASK", payload: index });
    },
    [dispatch]
  );

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [tasks, debouncedSearchQuery]
  );

  return (
    <>
      <button className="m-6 cursor-pointer" onClick={themeContext.toggleTheme}>
        {themeContext.theme === "light" ? (
          <DarkModeIcon fontSize="large" />
        ) : (
          <LightModeIcon fontSize="large" className="text-white" />
        )}
      </button>
      <div className="flex flex-col w-140 mx-auto my-20">
        <div
          className={`bg-amber-400 dark:bg-teal-500 h-80 rounded-t-3xl px-10 ${
            !filteredTasks.length && "rounded-b-3xl"
          }`}
        >
          <div className="flex flex-col items-center py-4">
            <label htmlFor="search" className="text-xl font-bold">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white rounded-xl p-2"
            />
          </div>
          <hr />
          <AddTaskForm addTask={addTask} />
        </div>
        <TaskList
          tasks={filteredTasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
      </div>
    </>
  );
};

export default App;
