import { useSelector } from "react-redux";

function HabitAnalytics() {
  const habits = useSelector((state) => state.habits.habits);
  const totalHabits = habits.length;

  const completedHabits = habits.filter((habit) =>
    habit.weeklyCompletion.every((completed) => completed)
  );

  const totalCompletionPercentage =
    habits.reduce((sum, habit) => {
      const completedDays = habit.weeklyCompletion.filter((day) => day).length;
      return sum + completedDays / 7;
    }, 0) / totalHabits;

  return (
    <div className="max-w-lg mx-auto p-4 rounded grid grid-cols-2 items-center text-center gap-4 bg-primary-100 mt-4">
      <p>
        Total Habits: <span className="font-bold">{totalHabits}</span>
      </p>
      <p>
        Avg. Completion:{" "}
        <span className="font-bold">
          {(totalCompletionPercentage * 100).toFixed(1)}%
        </span>
      </p>
      <div className="col-span-2">
        {completedHabits.length > 0 && (
          <div>
            <h3 className="mt-4">Habits Completed This Week:</h3>
            <ul>
              {completedHabits.map((habit) => (
                <li key={habit.id} className="text-lg font-bold ">
                  {habit.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HabitAnalytics;
