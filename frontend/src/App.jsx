import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import FoodTracker from "./Components/Pages/FoodTracker/FoodTracker";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Leaves from "./Components/Pages/Leaves/Leaves";
import { useEffect, useState } from "react";

function App() {
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  return (
    <div className="App">
      <div className="main-container">
        <SideBar setActivePage={setActivePage} activePage={activePage} />
        {activePage === "1" && <Dashboard />}
        {activePage === "2" && <FoodTracker />}
        {activePage === "3" && <Leaves />}
      </div>
    </div>
  );
}

export default App;
