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

  const data = {
    labels: Object.keys(priority),
    datasets: [
      {
        data: Object.values(priority),
        hoverOffset: 4,
        backgroundColor: ["#ffcd56", "#ff6384", "#4cc0c0", "#c9cbcf"],
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
    <div>
      <Doughnut options={options} data={data}></Doughnut>
    </div>
  );
}
