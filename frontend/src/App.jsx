import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import FoodTracker from "./Components/Pages/FoodTracker/FoodTracker";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Leaves from "./Components/Pages/Leaves/Leaves";
import { useEffect, useState } from "react";
import Login from "./Components/Pages/Login/Login";
import AdminDashboard from "./Components/AdminPages/Dashboard/Dashboard";
import AdminLeaves from "./Components/AdminPages/Leaves/Leaves";
import Employees from "./Components/AdminPages/Employees/Employees";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
  });

  const [activePage, setActivePage] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="main-container">
          <SideBar
            setActivePage={setActivePage}
            activePage={activePage}
            setIsLoggedIn={setIsLoggedIn}
          />
          {activePage === "1" && <Dashboard setActivePage={setActivePage} />}
          {activePage === "2" && <FoodTracker />}
          {activePage === "3" && <Leaves />}
          {activePage === "4" && <AdminDashboard />}
          {activePage === "5" && <AdminLeaves />}
          {activePage === "6" && <Employees />}
        </div>
      ) : (
        <Login setActivePage={setActivePage} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
