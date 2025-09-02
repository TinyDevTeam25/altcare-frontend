import React from "react";
import "./Dashboard.css";
// Header and Footer imports are handled by PatientLayout.

// These are the components that are UNIQUE to the dashboard page.
import Top from "../../components/PeterComponents/Top/Top.jsx";
import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
import Activity from "../../components/PeterComponents/Activity/Activity.jsx";

function Dashboard() {
  // It now ONLY returns the <main> content for the dashboard.
  // The header and footer are provided automatically by the PatientLayout.
  return (
    <main className="dashboard">
      <Top />
      <Menu />
      <Activity />
    </main>
  );
}

export default Dashboard;
