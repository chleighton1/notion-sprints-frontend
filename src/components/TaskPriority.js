import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "../styles.css";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

export default function TaskPriority(props) {
  const priority = props.sprintDB.reduce(function (obj, item) {
    if (!obj[item.priority]) {
      obj[item.priority] = 0;
    }
    obj[item.priority]++;
    return obj;
  }, {});

  if (priority[""]) {
    priority["Unassigned"] = priority[""];
    delete priority[""];
  }

  const colors = {
    High: "#ff6384",
    Medium: "#ffcd56",
    Low: "#4cc0c0",
    Unassigned: "#c9cbcf",
  };

  const chartData = Object.entries(priority).map(([key, value]) => ({
    title: key,
    count: value,
    color: colors[key],
  }));

  const data = {
    labels: chartData.map((obj) => obj["title"]),
    datasets: [
      {
        data: chartData.map((obj) => obj["count"]),
        hoverOffset: 4,
        backgroundColor: chartData.map((obj) => obj["color"]),
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        top: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: 20,
        },
        text: "Work by Priority",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div class="chart-div">
      <Doughnut options={options} data={data}></Doughnut>
    </div>
  );
}
