// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ votes }) => {
  const data = {
    labels: ["At variance", "Skip/Neutral", "Of one mind"],
    datasets: [
      {
        data: [
          votes["At variance"] || 0,
          votes["Skip/Neutral"] || 0,
          votes["Of one mind"] || 0,
        ],
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF"], // Pie slice colors
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;

