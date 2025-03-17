import AddIcon from "@mui/icons-material/Add";

function App() {
  return (
    <>
      <div className="flex flex-col w-140 mx-auto my-20">
        <div className="flex justify-between items-center bg-amber-400 h-40 rounded-t-3xl px-10">
          <h1 className="text-white font-bold text-3xl">Task List</h1>
          <button className="flex items-center gap-1 justify-center bg-white py-2 px-3 rounded-2xl text-2xl text-amber-400 transition delay-50 duration-300 ease-in-out cursor-pointer hover:bg-gray-200">
            <AddIcon fontSize="medium" />
            <span>New</span>
          </button>
        </div>
        <div className="bg-gray-200 rounded-b-3xl">Todo container</div>
      </div>
    </>
  );
}

export default App;
