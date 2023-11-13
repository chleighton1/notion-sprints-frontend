import React, { useEffect, useState } from "react";
import SprintProgress from "./components/SprintProgress";
import { DateTime } from "luxon";
import TaskPriority from "./components/TaskPriority";
import SprintHealth from "./components/SprintHealth";
import UserWorkload from "./components/UserWorkload";

function App() {
  const [sprintDB, setSprintDB] = useState([]);
  const [sprintProgress, setSprintProgress] = useState(null);
  const [taskCompletion, setTaskCompletion] = useState(null);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [evCompleted, setEvCompleted] = useState(null);
  const [notionEstimates, setNotionEstimates] = useState(null);
  const [isLoading, setLoading] = useState(true); // Initialize loading state

  const today = DateTime.now().toISODate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/getData`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSprintDB(data.sprintDB);
        setCurrentSprint(data.currentSprint);
        setEvCompleted(data.ev_completed);
        setNotionEstimates(data.notionEstimates);
        setLoading(false);
        // const sprintName =
        //   currentSprint.properties["Sprint name"].title[0].plain_text;

        console.log(currentSprint);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div>
        <p>Today is {today}</p>
        <p>{sprintName}</p>
        <p>
          {sprintStartDate} - {sprintEndDate}
        </p> */}
      {/* </div> */}
      {currentSprint && (
        <div>
          <SprintProgress
            currentSprint={currentSprint}
            taskCompletion={evCompleted}
          />
          {/* <SprintHealth
            currentSprint={currentSprint}
            taskCompletion={evCompleted}
          /> */}
          <TaskPriority sprintDB={sprintDB} />
          <UserWorkload sprintDB={sprintDB} />
          <Estimates currentSprint={currentSprint} />
        </div>
      )}
    </div>
  );
}
export default App;
