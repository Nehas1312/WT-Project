import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import New from "./Components/NewReg";
import Completed from "./Components/Completed";
import Home from "./Components/Home";
import Sidebar from "./Components/sidebar";
import Myday from "./Components/Myday";
import Scheduled from "./Components/Scheduled";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<New />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/New" element={<New />} />
        <Route path="/Completed" element={<Completed />} />
        <Route path="/Myday" element={<Myday />} />
        <Route path="/Scheduled" element={<Scheduled />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
