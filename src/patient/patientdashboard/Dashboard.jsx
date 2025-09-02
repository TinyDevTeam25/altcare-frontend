import React from "react";
import "./Dashboard.css";
// We don't need to import Nav2 or PatientHeader here anymore.
import Top from "../../components/PeterComponents/Top/Top.jsx";
import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
import Footer2 from "../../components/PeterComponents/Footer2/Footer2.jsx";
function Dashboard() {
  return (
    // The global page layout class can be added here for consistency
    <div className="">
      <main className="dashboard">
        <Top />
        <Menu />
        <Activity />
      </main>
      <Footer2 />
    </div>
  );
}

export default Dashboard;
