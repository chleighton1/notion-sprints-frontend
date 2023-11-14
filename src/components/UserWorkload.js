import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

export default function UserWorkload(props) {
  const userWorkload = props.sprintDB.reduce(function (obj, item) {
    if (!obj[item.assignee]) {
      obj[item.assignee] = 0;
    }
    obj[item.assignee]++;
    return obj;
  }, {});

  const data = {
    labels: Object.keys(userWorkload),
    datasets: [
      {
        data: Object.values(userWorkload),
        hoverOffset: 4,
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
        text: "Asignee Workload",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <Pie options={options} data={data}></Pie>
    </div>
  );
}
