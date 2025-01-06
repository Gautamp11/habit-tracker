import { useState } from "react";
import { useSelector } from "react-redux";
import AddEditHabitForm from "../components/AddEditHabitForm";
import HabitCard from "../components/HabitCard";
import Modal from "../ui/Modal";
import HabitAnalytics from "../components/HabitAnalytics";
import Filter from "../components/Filter";
import { useSearchParams } from "react-router-dom";
import Sort from "../components/Sort";
import Search from "../components/Search";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const habits = useSelector((state) => state.habits.habits);

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const sortBy = searchParams.get("sort") || "name";
  const search = searchParams.get("search") || "";

  const handleAddHabit = () => {
    setShowForm(true);
  };

  function handleSort(value) {
    setSearchParams({ filter: filter, sort: value });
  }
  function handleSearch(value) {
    setSearchParams({ filter, sort: sortBy, search: value });
  }

  const filteredHabits = habits
    .filter((habit) => {
      if (filter === "completed")
        return habit.weeklyCompletion.every((completed) => completed);
      if (filter === "incomplete")
        return habit.weeklyCompletion.some((completed) => !completed);
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name); // Correct method
      if (sortBy === "progress") {
        const aProgress = a.weeklyCompletion.filter(
          (completed) => completed
        ).length;
        const bProgress = b.weeklyCompletion.filter(
          (completed) => completed
        ).length;
        console.log(aProgress, bProgress);

        return bProgress - aProgress;
      }

      return 0; // No sorting applied if criteria don't match
    })
    .filter((habit) => {
      // Filter by search term, check if the name includes the search query
      if (search.length > 1)
        return habit.name.toLowerCase().includes(search.toLowerCase());
      return true;
    });

  return (
    <div className="text-center max-w-5xl min-h-screen mx-auto">
      <h2 className="text-3xl font-bold mb-4 mt-4">Your Habits</h2>
      <div className="flex justify-center gap-4 items-center mb-8">
        <Search onSearchQuery={handleSearch} />
        <Filter filter={filter} setSearchParams={setSearchParams} />
        <Sort sortBy={sortBy} onSort={handleSort} />
      </div>

      {filteredHabits.length > 0 ? (
        <HabitCard habits={filteredHabits} />
      ) : (
        <p className="text-xl">Start adding Habits to track your progress!</p>
      )}
      <button
        className="bg-primary-800 text-primary-50 font-semibold rounded py-2 px-4 mt-8"
        onClick={handleAddHabit}
      >
        Add Habit
      </button>

      {showForm && (
        <Modal onShowForm={setShowForm}>
          <AddEditHabitForm onShowForm={setShowForm} />
        </Modal>
      )}

      <div>
        <h1 className="text-2xl font-bold mt-16">You Habit Analytics.</h1>
        <HabitAnalytics />
      </div>
    </div>
  );
}

export default Dashboard;
