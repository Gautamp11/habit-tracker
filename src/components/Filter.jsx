import { useSearchParams } from "react-router-dom";

function Filter({ filter, setSearchParams }) {
  return (
    <div className="max-w-full">
      <button
        onClick={() => setSearchParams({ filter: "all" })}
        className={`p-1 bg-primary-100 rounded m-2 font-semibold ${
          filter === "all" ? "bg-primary-800 text-primary-50" : ""
        }`}
      >
        ALL
      </button>
      <button
        onClick={() => setSearchParams({ filter: "completed" })}
        className={`p-1 bg-primary-100 rounded m-2 font-semibold ${
          filter === "completed" ? "bg-primary-800 text-primary-50" : ""
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => setSearchParams({ filter: "incomplete" })}
        className={`p-1 bg-primary-100 rounded m-2 font-semibold ${
          filter === "incomplete" ? "bg-primary-800 text-primary-50" : ""
        }`}
      >
        Incomplete
      </button>
    </div>
  );
}

export default Filter;
