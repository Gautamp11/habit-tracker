function ProgressBar({ habit }) {
  const completedDays = habit.weeklyCompletion.filter(
    (completed) => completed
  ).length;
  const TOTAL_DAYS = 7;
  const progressPercentage = (completedDays / TOTAL_DAYS) * 100;

  return (
    <div className="mb-4 mt-2 bg-primary-200 h-2 rounded relative">
      {/* Filled portion */}
      <div
        style={{
          width: `${progressPercentage}%`,
        }}
        className="bg-primary-800 h-full rounded"
        title={`Progress: ${completedDays} / ${TOTAL_DAYS}`}
      ></div>
      {/* Percentage display */}
      <span className="absolute right-0  top-1/2 transform translate-y-1/2 text-xs font-bold text-primary-800">
        {completedDays} / {TOTAL_DAYS}
        {completedDays === TOTAL_DAYS && "⭐"}
      </span>
    </div>
  );
}

export default ProgressBar;
