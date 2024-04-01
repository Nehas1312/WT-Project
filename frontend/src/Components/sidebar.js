import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faStar,
  faSquarePlus,
  faCalendarCheck,
  faClock,
  faTrashCan,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/sidebar.css";

const Sidebar = () => {
  const toggleMenu = () => {
    const navigation = document.querySelector(".navigation");
    const toggle = document.querySelector(".toggle");
    navigation.classList.toggle("active");
    toggle.classList.toggle("active");
  };

  return (
    <>
      <div className="navigation bg-light position-fixed vh-100 custom-sidebar">
        <ul className="list-unstyled">
          <div className="logo text-center mt-3 ">
            <img
              src="https://tse3.mm.bing.net/th/id/OIG3.1h4n_qO8Jdl6pcL1gAIA?pid=ImgGn"
              alt="Logo"
              className="rounded-circle"
              style={{ width: "90px", height: "90px" }}
            />
            <br></br>
            TICK-TOCK
            <br></br>
          </div>
          <br></br>
          {
            <li className="mb-3">
              <Link
                to="/New"
                className="text-dark text-decoration-none d-flex align-items-center"
              >
                <span className="icon me-2">
                  <FontAwesomeIcon icon={faSquarePlus} />
                </span>
                <span className="title">Add Task</span>
              </Link>
            </li>
          }
          <li className="mb-3">
            <Link
              to="/Myday"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <span className="icon me-2">
                <FontAwesomeIcon icon={faSun} />
              </span>
              <span className="title">My Day</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/ToDoList"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <span className="icon me-2">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="title">Important</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/Scheduled"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <span className="icon me-2">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <span className="title">Scheduled</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/Completed"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <span className="icon me-2">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </span>
              <span className="title">Completed</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="#"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <span className="icon me-2">
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
              <span className="title">Recycle Bin</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/Home"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <span className="icon me-2">
                <FontAwesomeIcon icon={faInfinity} />
              </span>
              <span className="title">All Tasks</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
