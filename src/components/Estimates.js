import React from "react";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
} from "chart.js";
import "../styles.css";

ChartJS.register(LineElement, Tooltip, Legend, Title, PointElement);

export default function Estimates(props) {
  const sprintStartDate = DateTime.fromISO(
    props.currentSprint.properties["Dates"].date.start
  ).toISODate();
  const sprintEndDate = DateTime.fromISO(
    props.currentSprint.properties["Dates"].date.end
  ).toISODate();

  const today = DateTime.now().toISODate();

  const sprintEstimates = getWorkingDays(sprintStartDate, sprintEndDate);

  // Assign Labels to incoming Data date objects
  let labels = sprintEstimates.map((item) => item.date);
  const values = [];

  // Iterate through the labels and if the label is a day previous to today assaign that days estimate to the values array
  for (const label of labels) {
    const item = sprintEstimates.find((item) => item.date === label);
    if (DateTime.fromISO(item.date) < DateTime.fromISO(today)) {
      values.push(item.estimates);
    } else {
      values.push(null);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Estimates",
        data: values,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: 20,
        },
        text: "Estimates over Time",
      },
      legend: {
        display: false,
        position: "bottom",
      },
    },
  };

  function getWorkingDays(start, end) {
    const workingDays = [];
    let currentDate = DateTime.fromISO(start);
    let endDate = DateTime.fromISO(end);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.weekday;
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Day of the week is 1 (Monday) to 5 (Friday)

        const formattedDate = currentDate.toISODate();

        const current_date_ev = props.notionEstimates.find(
          (item) => item.date === formattedDate
        );

        workingDays.push({
          date: formattedDate,
          estimates: current_date_ev ? current_date_ev.estimates : 0,
        }); // Add a copy of the date
      }
      currentDate = currentDate.plus({ days: 1 }); // Move to the next day
    }

    return workingDays;
  }

  return (
    <div>
      <Line options={options} data={data}></Line>
    </div>
  );
}
