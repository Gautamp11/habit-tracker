import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  removeHabit,
  reset,
  toggleWeeklyCompletion,
} from "../redux/habitSlice";
import React from "react";
import Modal from "../ui/Modal";
import AddEditHabitForm from "./AddEditHabitForm";
import ProgressBar from "./ProgressBar";
function HabitCard({ habits }) {
  const [selectedHabit, setSelectedHabit] = React.useState(null);
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = React.useState(false);

  const handleEditHabit = (habit) => {
    setShowEditForm(true);
    setSelectedHabit(habit);
  };

  const handleWeeklyCompletion = (habitId, index) => {
    // console.log(habitId, index);
    dispatch(toggleWeeklyCompletion({ habitId: habitId, dayIndex: index }));
  };

  const handleReset = (id) => {
    dispatch(reset({ id }));
  };

  return (
    <>
      {/* <ul className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  mb-8"> */}
      <ul className="flex justify-center items-center flex-wrap gap-8">
        {habits.map((habit) => (
          <li key={habit.id} className="bg-primary-100 p-4 rounded">
            <ProgressBar habit={habit} />
            <h3 className="text-xl font-semibold mb-1">{habit.name}</h3>
            <p className="italic">{habit.description}</p>
            <ul className="flex mt-4 space-x-2 justify-center items-center">
              {habit.weeklyCompletion.map((completed, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded transition-colors duration-200 ${
                    completed
                      ? "bg-primary-800 text-primary-50 "
                      : "bg-primary-200"
                  }`}
                  onClick={() => handleWeeklyCompletion(habit.id, index)}
                >
                  {["S", "M", "T", "W", "T", "F", "S"][index]}
                </button>
              ))}
            </ul>
            <div className="mt-4 flex justify-between ">
              <button
                className="bg-primary-800 text-primary-50 p-2 rounded"
                onClick={() => handleEditHabit(habit)}
              >
                <HiOutlinePencil />
              </button>
              <button
                className="bg-primary-200 p-1 rounded"
                onClick={() => handleReset(habit.id)}
              >
                Reset
              </button>
              <button
                className="bg-primary-800 text-primary-50 p-2 max-w-fit rounded"
                onClick={() => dispatch(removeHabit(habit.id))}
              >
                <HiOutlineTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showEditForm && (
        <Modal onShowForm={setShowEditForm}>
          <AddEditHabitForm
            onShowForm={setShowEditForm}
            habit={selectedHabit}
          />
        </Modal>
      )}
    </>
  );
}

export default HabitCard;
