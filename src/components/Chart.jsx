import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { height, width } from "@mui/system";

// Register components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyChart = () => {
  // Data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May"], // Y-axis labels
    datasets: [
      {
        label: "Sales Data", // Label for the dataset
        data: [65, 59, 80, 81, 56], // Values for each bar
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color of the bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color of the bars
        borderWidth: 1, // Border width
        barThickness: 10,
        borderR,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true, // Makes the chart responsive
    indexAxis: "y", // Change to 'y' for horizontal bars
    plugins: {
      title: {
        display: true,
        text: "Sales Over Time", // Title of the chart
      },
    },
    scales: {
      x: {
        // Customize the X-axis (values are now on the X-axis because of horizontal bars)
        beginAtZero: true, // Start the scale at 0
        max: 100,
      },
      y: {
        // Customize the Y-axis (categories are now on the Y-axis)
        beginAtZero: true, // Start the scale at 0
      },
    },
  };

  return (
    <div>
      <h2>My Horizontal Sales Chart</h2>
      <Bar data={data} options={options} /> {/* Render the Bar chart */}
    </div>
  );
};

export default MyChart;
