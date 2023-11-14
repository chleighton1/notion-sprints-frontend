import React, { useEffect, useState } from "react";
import SprintProgress from "./components/SprintProgress";
import { DateTime } from "luxon";
import TaskPriority from "./components/TaskPriority";
import SprintHealth from "./components/SprintHealth";
import UserWorkload from "./components/UserWorkload";
import Estimates from "./components/Estimates";
import "./styles.css";

function App() {
  const [sprintDB, setSprintDB] = useState([]);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [evCompleted, setEvCompleted] = useState(null);
  const [notionEstimates, setNotionEstimates] = useState(null);
  const [selectedValue, setSelectedValue] = useState("realply");
  const [isLoading, setLoading] = useState(true); // Initialize loading state
  const [sprintName, setSprintName] = useState("Not set");
  const [sprintStartDate, setSprintStartDate] = useState("");
  const [sprintEndDate, setSprintEndDate] = useState("");

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    localStorage.setItem("selectedOption", newValue);

    // Call your function to post data and reload the page
    postDataAndReloadPage(newValue);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/getData`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSprintDB(data.sprintDB);
        setCurrentSprint(data.currentSprint);
        setEvCompleted(data.ev_completed);
        setNotionEstimates(data.notionEstimates);

        setSprintName(
          currentSprint.properties["Sprint name"].title[0].plain_text
        );
        setSprintStartDate(
          DateTime.fromISO(
            currentSprint.properties["Dates"].date.start
          ).toISODate()
        );
        setSprintEndDate(
          DateTime.fromISO(
            currentSprint.properties["Dates"].date.end
          ).toISODate()
        );

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const postDataAndReloadPage = (value) => {
    const requestData = { value: value };

    fetch(`${process.env.REACT_APP_URL}/updateData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .then((responseData) => {
        // Handle the response from the server (if needed)
        console.log("Server response:", responseData);

        setLoading(false);

        // Reload the page after the data is posted
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      {currentSprint && (
        <div class="container">
          <header class="header-container">
            <div>
              <select
                class="form-select form-select-lg mb-3"
                aria-label="Default select example"
                id="mySelect"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value="realply">Realply</option>
                <option value="socialpr">Social PR</option>
              </select>
            </div>
            <div class="sprint">
              <p id="sprint-name">{sprintName}</p>
              <p id="sprint-dates">{`${sprintStartDate} → ${sprintEndDate}`}</p>
            </div>
          </header>
          <div class="charts">
            <div class="chart-col">
              <div class="chart-div">
                <SprintProgress
                  currentSprint={currentSprint}
                  taskCompletion={evCompleted}
                />
              </div>

              <SprintHealth
                currentSprint={currentSprint}
                taskCompletion={evCompleted}
              />
            </div>
            <div class="chart-col">
              <div class="chart-div">
                <TaskPriority sprintDB={sprintDB} />
              </div>
              <div class="chart-div">
                <UserWorkload sprintDB={sprintDB} />
              </div>
            </div>
          </div>
          <div class="estimates-chart">
            <Estimates
              currentSprint={currentSprint}
              notionEstimates={notionEstimates}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
