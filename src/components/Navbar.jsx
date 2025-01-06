import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import AddEditHabitForm from "./AddEditHabitForm";

function Navbar() {
  const [showForm, setShowForm] = useState(false);

  return (
    <nav className="bg-primary-800 text-primary-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-lg font-bold">Habit Tracker</h1>
        </Link>
        <div className="flex space-x-4">
          <Link
            // to="/add-habit"
            onClick={() => setShowForm(true)}
            className="hover:scale-105 transition-transform duration-200 font-semibold "
          >
            Add Habit
          </Link>
          <Link
            to="/"
            className="hover:scale-105 transition-transform duration-200 font-semibold"
          >
            Dashboard
          </Link>{" "}
          <Link
            to="/weekly-progress"
            className="hover:scale-105 transition-transform duration-200 font-semibold"
          >
            Weekly Progress
          </Link>
        </div>
        {showForm && (
          <Modal onShowForm={setShowForm}>
            <AddEditHabitForm onShowForm={setShowForm} />
          </Modal>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
