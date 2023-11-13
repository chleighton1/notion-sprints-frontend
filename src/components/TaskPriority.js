import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default function TaskPriority(props) {
  const priority = props.sprintDB.reduce(function (obj, item) {
    if (!obj[item.priority]) {
      obj[item.priority] = 0;
    }
    obj[item.priority]++;
    return obj;
  }, {});

  console.log(props.sprintDB);

  const data = {
    labels: Object.keys(priority),
    datasets: [
      {
        data: Object.values(priority),
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
        text: "Work by Priority",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <Doughnut
        options={{
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
        }}
        data={data}
      ></Doughnut>
    </div>
  );
}
