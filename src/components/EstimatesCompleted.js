import React from "react";
import CountUp from "react-countup";
import "../styles.css";

export default function EstimatesCompleted(props) {
  let total = 0;
  props.sprintDB.forEach((item) => {
    if (
      item.status.includes("Done") ||
      item.status.includes("Q/A") ||
      item.status.includes("In Review")
    ) {
      total += Number(item.estimates);
    }
  });

  return (
    <div class="chart-div">
      <div className="estimates-div">
        <h2 className="estimates-title">Estimates Achieved</h2>
        <div className="celeb-div">
          <span className="celebration celeb-l">✨</span>
          <CountUp className="countUp" start={0} end={total} duration={4} />
          <span className="celebration celeb-r">✨</span>
        </div>
      </div>
    </div>
  );
}
