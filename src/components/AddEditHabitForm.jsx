import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHabit, updateHabit } from "../redux/habitSlice";

function AddEditHabitForm({ onShowForm, habit }) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
    }
  }, [habit]);

  const handleSubmit = (e) => {
    if (!name || !description) {
      alert("Both name and description are required!");
      return;
    }
    e.preventDefault();
    if (habit) {
      console.log("I'm inside habit check");

      dispatch(updateHabit({ id: habit.id, name, description }));
    } else {
      dispatch(addHabit({ id: Date.now(), name, description }));
    }
    setName("");
    setDescription("");
    onShowForm(false);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">{habit ? "Edit" : "Add"} Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="">Habit Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 rounded w-full border border-primary-800 focus:outline-none focus:ring focus:border-primary-800"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="">Habit Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-1 rounded w-full border border-primary-800 focus:outline-none focus:ring focus:border-primary-800"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-800 text-white py-2 px-4 rounded"
        >
          {habit ? "Edit" : "Add"} Habit
        </button>
      </form>
    </div>
  );
}

export default AddEditHabitForm;
