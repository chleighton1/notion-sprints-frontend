import React from "react";
import { Bar } from "react-chartjs-2";
import { DateTime } from "luxon";
import "../styles.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function SprintProgress(props) {
  const sprintStartDate = DateTime.fromISO(
    props.currentSprint.properties["Dates"].date.start
  ).toISODate();
  const sprintEndDate = DateTime.fromISO(
    props.currentSprint.properties["Dates"].date.end
  ).toISODate();

  const sprintProgress = calculateSprintProgress(
    sprintStartDate,
    sprintEndDate
  );

  console.log(props.currentSprint);

  const options = {
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        font: {
          size: 20,
        },
        text: "Sprint Progress",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
        min: 0,
        max: 100,
        ticks: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
        min: 0,
        max: 100,
        ticks: {
          display: true,
        },
      },
    },
  };

  const labels = ["Sprint Progress", "Task Completion"];

  const data = {
    labels,
    datasets: [
      {
        label: ["Percentage Complete"],
        data: [sprintProgress, props.taskCompletion],
        backgroundColor: ["rgb(75, 192, 192, 0.6)", "rgb(255, 205, 86, 0.6)"],
        borderColor: ["rgb(75, 192, 192)", "rgb(255, 205, 86)"],
        borderWidth: 1,
        borderSkipped: false,
        borderRadius: 5,
        barPercentage: 0.4,
      },
    ],
  };

  function calculateSprintProgress(startDate, endDate) {
    startDate = DateTime.fromISO(startDate);
    endDate = DateTime.fromISO(endDate);
    const today = DateTime.now();
    const timeElapsed = today - startDate;
    const totalDuration = endDate - startDate;
    const percentage = Math.round((timeElapsed / totalDuration) * 100);

    return percentage;
  }

  return (
    <div class="chart-div">
      <Bar className="canvas" type="line" options={options} data={data}></Bar>
    </div>
  );
}
