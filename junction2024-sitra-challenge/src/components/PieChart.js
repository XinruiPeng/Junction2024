import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

// Register necessary Chart.js components and the plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ votes }) => {
  const data = {
    labels: ["At variance", "Skip/Neutral", "Of one mind"],
    datasets: [
      {
        data: [
          votes["At variance"] || 3,
          votes["Skip/Neutral"] || 2,
          votes["Of one mind"] || 4,
        ],
        backgroundColor: ["#522473", "#c6303a", "#f7b924"], // Donut slice colors
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`, // Custom tooltip formatting
        },
      },
      legend: {
        position: "top", // Position the legend on top of the chart
        display: true,
        align: "center", // Align legend items horizontally
        labels: {
          boxWidth: 28,
          padding: 10,
          font: {
            size: 12.9,
            weight: "bold",
          },
        },
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          // Calculate the percentage
          const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
          return `${percentage}%`; // Return the percentage as a string
        },
        color: "#fff", // Set the color of the text
        font: {
          weight: "bold",
          size: 11, // Font size for the percentage text
        },
      },
    },
    cutout: "70%", // Make the donut hole by defining the cutout (hole size) percentage
    rotation: -90, // Rotate the chart to make the first section appear at the top
    circumference: 180, // To make the chart semi-circular
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;




