import {
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Register necessary components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

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

  const calculateCompletionPercentage = (habit) => {
    const totalDays = habit.weeklyCompletion.length;
    const completedDays = habit.weeklyCompletion.filter(
      (completed) => completed
    ).length;
    return ((completedDays / totalDays) * 100).toFixed(1);
  };

  const habitCompletionData = habits.map((habit) => ({
    habit: habit.name,
    percentage: calculateCompletionPercentage(habit),
  }));

  // Pie chart data
  const completed = (totalCompletionPercentage * 100).toFixed(1);
  const remaining = 100 - completed;
  const pieHabitsData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: ["#0c4a6e", "#bae6fd"],
      },
    ],
  };

  // Bar chart data for individual habit percentages
  const barChartData = {
    labels: habitCompletionData.map((habit) => habit.habit),
    datasets: [
      {
        label: "Completion Percentage",
        data: habitCompletionData.map((habit) => habit.percentage),
        backgroundColor: "#0c4a6e",
        borderColor: "#0c4a6e",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-lg mx-auto p-4 rounded grid grid-cols-2 items-center gap-2 bg-primary-100 shadow-lg mt-4">
      <p className="text-left px-2">
        Total Habits: <span className="font-bold">{totalHabits}</span>
      </p>
      <p>
        Avg. Completion:{" "}
        {habits.length > 0 ? (
          <span className="font-bold">
            {(totalCompletionPercentage * 100).toFixed(1)}%
          </span>
        ) : (
          <span className="font-bold">0</span>
        )}
      </p>

      <div>
        {completedHabits.length > 0 && (
          <div className="p-2">
            <h3 className="mt-4 text-left">Habits Completed This Week</h3>
            <ul>
              {completedHabits.map((habit) => (
                <li key={habit.id} className="text-lg font-bold text-left">
                  {habit.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Pie Chart */}
      {habits.length > 0 ? (
        <div className="my-4 col-span-1">
          <Pie data={pieHabitsData} />
        </div>
      ) : (
        <p>No habits available to display.</p>
      )}

      {/* Bar Chart */}
      {habits.length > 0 ? (
        <div className="my-4 col-span-2">
          <h3 className="font-semibold">Habit Completion Percentages</h3>
          <Bar data={barChartData} />
        </div>
      ) : (
        <p>No habits available to display.</p>
      )}
    </div>
  );
}

export default HabitAnalytics;
