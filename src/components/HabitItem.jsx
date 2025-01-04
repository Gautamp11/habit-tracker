import { useContext } from "react";
import { HabitsContext } from "../contexts/HabitsContext";

function HabitItem({ habit }) {
  const { removeHabit } = useContext(HabitsContext);

  return (
    <li
      key={habit.id}
      className="p-4 bg-primary-100 rounded-lg shadow-md text-left"
    >
      <h2 className="text-xl font-semibold text-primary-800 mb-2">
        {habit.name}
      </h2>
      <p className="text-sm text-primary-700">
        {habit.description || "No description provided."}
      </p>

      <button
        onClick={() => removeHabit(habit.id)}
        className="text-red-500 mt-2"
      >
        Remove
      </button>
    </li>
  );
}

export default HabitItem;
