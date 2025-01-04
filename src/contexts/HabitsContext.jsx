import { createContext, useEffect, useState } from "react";

const HabitsContext = createContext();

function HabitsContextProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  const removeHabit = (habitId) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  return (
    <HabitsContext.Provider
      value={{ habits, setHabits, addHabit, removeHabit }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

export { HabitsContextProvider, HabitsContext };
