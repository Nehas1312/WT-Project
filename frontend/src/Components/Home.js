import React, { useState, useEffect } from "react";
import services from "../Services/dataServices";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [taskdata, setTaskData] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState([]); // State to manage loading status of each task

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
    // Update loading status for the specific task
    setLoadingTasks((prevState) => [...prevState, taskId]);

    // Find the task to be updated
    const taskToUpdate = taskdata.find((task) => task.id === taskId);

    // Update the task's taccomplished value
    const updatedTask = {
      ...taskToUpdate,
      taccomplished: !taskToUpdate.taccomplished,
    };

    // Simulate a 2-second delay before sending the update request
    setTimeout(() => {
      services
        .updateData(taskId, updatedTask)
        .then((response) => {
          setTaskData((prevTaskData) =>
            prevTaskData.map((task) =>
              task.id === taskId ? updatedTask : task
            )
          );

          // Update loading status for the specific task after completion
          setLoadingTasks((prevState) =>
            prevState.filter((id) => id !== taskId)
          );
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          // Update loading status for the specific task after failure
          setLoadingTasks((prevState) =>
            prevState.filter((id) => id !== taskId)
          );
        });
    }, 2000); // 2-second delay
  };

  const isTaskLoading = (taskId) => {
    return loadingTasks.includes(taskId);
  };

  // Function to handle delete request
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
    <Container className="home-container " fluid>
      <h1 className="text-center mb-4" style={{ color: "white" }}>
        ALL TASKS
      </h1>
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
          {taskdata.map((task) => {
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
                        <span>+10&nbsp;P</span>
                        <Spinner animation="border" size="sm" />
                        <span>&nbsp;INTS</span>
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
    </Container>
  );
};

export default Home;
