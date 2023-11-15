import React from "react";
import { DateTime } from "luxon";
import GaugeChart from "react-gauge-chart";
import "../styles.css";

export default function SprintHealth(props) {
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

  const variance = props.taskCompletion - sprintProgress;

  console.log(variance);

  let values = {
    colorStart: null,
    colorStop: null,
    value: 0,
    title: "",
  };
  if (variance < -35) {
    values.value = 0.4;
    values.title = "Poor";
  } else if (variance < -15) {
    values.value = 0.7;
    values.title = "Good";
  } else {
    values.value = 0.9;
    values.title = "Great!";
  }

  return (
    <div class="gauge-chart-div">
      <h2 className="gauge-chart-title">Sprint Health</h2>

      <GaugeChart
        id="gauge-chart3"
        nrOfLevels={5}
        colors={["#ff7102", "#ffe300", "#19d228"]}
        arcWidth={0.3}
        percent={values.value}
        hideText={true}
      />

      <h3 className="gauge-chart-label">{values.title}</h3>
    </div>
  );
}

function calculateSprintProgress(startDate, endDate) {
  startDate = DateTime.fromISO(startDate);
  endDate = DateTime.fromISO(endDate);
  const today = DateTime.now();
  const timeElapsed = today - startDate;
  const totalDuration = endDate - startDate;
  const percentage = Math.round((timeElapsed / totalDuration) * 100);

  return percentage;
}
