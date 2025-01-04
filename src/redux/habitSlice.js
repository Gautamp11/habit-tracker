import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: JSON.parse(localStorage.getItem("habits")) || [],
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push({
        ...action.payload,
        weeklyCompletion: Array(7).fill(false),
      });
      localStorage.setItem("habits", JSON.stringify(state.habits)); // Save to localStorage
    },
    toggleWeeklyCompletion: (state, action) => {
      const { habitId, dayIndex } = action.payload;
      const habit = state.habits.find((habit) => habit.id === habitId);
      habit.weeklyCompletion[dayIndex] = !habit.weeklyCompletion[dayIndex];
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
    removeHabit: (state, action) => {
      const updatedHabits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
      state.habits = updatedHabits;
      localStorage.setItem("habits", JSON.stringify(updatedHabits)); // Save to localStorage
    },
    updateHabit: (state, action) => {
      const { id, name, description } = action.payload;
      const habitIndex = state.habits.findIndex((habit) => habit.id === id);

      if (habitIndex >= 0) {
        state.habits[habitIndex] = {
          ...state.habits[habitIndex],
          name,
          description,
        };
      }
      localStorage.setItem("habits", JSON.stringify(state.habits)); // Save to localStorage
    },
    reset: (state, action) => {
      const { id } = action.payload;
      const habitIndex = state.habits.findIndex((habit) => habit.id === id);
      if (habitIndex >= 0) {
        state.habits[habitIndex] = {
          ...state.habits[habitIndex],
          weeklyCompletion: Array(7).fill(false),
        };
      }
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
  },
});

export const {
  addHabit,
  removeHabit,
  updateHabit,
  toggleWeeklyCompletion,
  reset,
} = habitSlice.actions;

export default habitSlice.reducer;
