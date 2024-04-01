import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import services from "../Services/dataServices";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button } from "react-bootstrap";

const Completed = () => {
  const [taskdata, setTaskData] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState([]); // State to manage loading status of each task
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  useEffect(() => {
    console.log("effect");
    services
      .getAll()
      .then((response) => {
        console.log(response);
        setTaskData(response);
      })
      .catch((err) => {
        console.log(`Error while fetching data from DB :${err}`);
      });
  }, []);

  const handleSubmission = (taskId) => {
    //do nothing
  };

  const isTaskLoading = (taskId) => {
    return loadingTasks.includes(taskId);
  };

  const handleDelete = (taskId) => {
    services
      .deleteData(taskId)
      .then(() => {
        setTaskData((prevTaskData) =>
          prevTaskData.filter((task) => task.id !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <Container className="home-container ">
      <div className="home-content">
        <h1>MY DAY</h1>
        <Table
          className="task-list"
          striped
          bordered
          hover
          style={{ marginLeft: "-100px", marginTop: "60px" }}
        >
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Due-Date</th>
              <th>Submissions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {taskdata
              .filter((task) => task.taccomplished)
              .map((task) => {
                const date = new Date(task.date);
                const formattedDate = date.toLocaleDateString();
                const truncatedTaskName = task.tname.slice(0, 20);

                return (
                  <tr key={task.id} className="task-item">
                    <td className="task-name">{truncatedTaskName}</td>
                    <td className="task-date">{formattedDate}</td>
                    <td className="submission">
                      <Button
                        variant="primary"
                        onClick={() => handleSubmission(task.id)}
                        disabled={task.taccomplished}
                      >
                        {isTaskLoading(task.id) ? (
                          <>
                            <span>+10 P</span>
                            <FontAwesomeIcon icon={faClock} spin />
                            <span>INTS</span>
                          </>
                        ) : task.taccomplished ? (
                          "Completed"
                        ) : (
                          "Mark as Submitted"
                        )}
                      </Button>
                    </td>
                    <td className="delete">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Completed;
