import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export default function UserWorkload(props) {
  const userWorkload = props.sprintDB.reduce(function (obj, item) {
    if (!obj[item.assignee]) {
      obj[item.assignee] = 0;
    }
    obj[item.assignee]++;
    return obj;
  }, {});

  console.log(Object.values(userWorkload));

  const data = {
    labels: Object.keys(userWorkload),
    datasets: [
      {
        label: "Tasks per User",
        data: Object.values(userWorkload),
        backgroundColor: [
          "#ece7f2",
          "#d0d1e6",
          "#a6bddb",
          "#74a9cf",
          "#3690c0",
          "#0570b0",
          "#045a8d",
          "#023858",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        font: {
          size: 20,
        },
        text: "Asignee Workload",
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div class="bar-chart">
      <Bar options={options} data={data}></Bar>
    </div>
  );
}
