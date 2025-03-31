import { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

interface AddTaskFormProps {
  addTask: (title: string, description: string) => void;
}

const AddTaskForm = ({ addTask }: AddTaskFormProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    if (newTitle && newDescription) {
      addTask(newTitle, newDescription);
      setNewTitle("");
      setNewDescription("");
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  };

  return (
    <div className="flex justify-between items-center pt-4">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            ref={titleInputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="rounded-xl p-2 bg-white"
          />
        </div>
        <div className="flex flex-col pt-2">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="bg-white rounded-xl p-2 resize-none w-90 h-20"
          />
        </div>
      </div>
      <button
        className="flex items-center gap-1 justify-center bg-white dark:bg-gray-800 py-2 px-3 rounded-2xl text-2xl dark:text-white transition delay-50 duration-300 ease-in-out cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={handleAddTask}
      >
        <AddIcon fontSize="medium" />
        <span>New</span>
      </button>
    </div>
  );
};

export default AddTaskForm;
