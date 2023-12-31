import React, { useEffect, useState, CSSProperties } from "react";
import SprintProgress from "./components/SprintProgress";
import { DateTime } from "luxon";
import TaskPriority from "./components/TaskPriority";
import SprintHealth from "./components/SprintHealth";
import UserWorkload from "./components/UserWorkload";
import EstimatesCompleted from "./components/EstimatesCompleted";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles.css";

function App() {
  const [sprintDB, setSprintDB] = useState([]);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [tasksCompleted, setTasksCompleted] = useState(null);
  const [notionEstimates, setNotionEstimates] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [sprintName, setSprintName] = useState("Not set");
  const [sprintStartDate, setSprintStartDate] = useState("");
  const [sprintEndDate, setSprintEndDate] = useState("");
  const [teamOneClicked, setTeamOneClicked] = useState(true); // Set the initial state for button 1
  const [teamTwoClicked, setTeamTwoClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (teamOneClicked) {
          setLoading(true);
          response = await fetch(`${process.env.REACT_APP_URL}/getTeamOneData`);
        } else if (teamTwoClicked) {
          setLoading(true);
          response = await fetch(`${process.env.REACT_APP_URL}/getTeamTwoData`);
        }

        if (response.ok) {
          const result = await response.json();

          setSprintDB(result.sprintDB);
          setCurrentSprint(result.currentSprint);
          setTasksCompleted(result.tasks_completed);
          setNotionEstimates(result.notionEstimates);

          setSprintName(
            result.currentSprint.properties["Sprint name"].title[0].plain_text
          );
          setSprintStartDate(
            DateTime.fromISO(
              result.currentSprint.properties["Dates"].date.start
            ).toISODate()
          );
          setSprintEndDate(
            DateTime.fromISO(
              result.currentSprint.properties["Dates"].date.end
            ).toISODate()
          );
          setLoading(false);
        } else {
          console.error("Failed to fetch data");
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching data: `, error);
      }
    };

    fetchData();
  }, [teamOneClicked, teamTwoClicked]);

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setTeamOneClicked(true);
      setTeamTwoClicked(false);
    } else {
      setTeamOneClicked(false);
      setTeamTwoClicked(true);
    }
  };

  if (loading) {
    return <ClipLoader color="#37a2eb" className="loader" />;
  }

  return (
    <div>
      <div class="container">
        <header class="header-container">
          <div>
            <button
              className="button"
              onClick={() => handleButtonClick(1)}
              disabled={teamOneClicked}
            >
              Team One
            </button>
            <button
              className="button"
              onClick={() => handleButtonClick(2)}
              disabled={teamTwoClicked}
            >
              Team Two
            </button>
          </div>
          <div class="sprint">
            <p id="sprint-name">{sprintName}</p>
            <p id="sprint-dates">{`${sprintStartDate} → ${sprintEndDate}`}</p>
          </div>
        </header>
        <div class="charts">
          <div class="grid-item">
            <SprintProgress
              currentSprint={currentSprint}
              taskCompletion={tasksCompleted}
            />
          </div>
          <div className="grid-item">
            <EstimatesCompleted sprintDB={sprintDB} />
          </div>
          <div className="grid-item">
            <SprintHealth
              currentSprint={currentSprint}
              taskCompletion={tasksCompleted}
            />
          </div>

          <div class="grid-item">
            <TaskPriority sprintDB={sprintDB} />
          </div>
          <div class="grid-item">
            <UserWorkload sprintDB={sprintDB} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
