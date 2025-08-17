import React from "react";
import "./dashboard.css";
// We don't need to import Nav2 or PatientHeader here anymore.
import Top from "../../components/PeterComponents/Top/Top";
import Menu from "../../components/PeterComponents/Menu/Menu";
import Activity from "../../components/PeterComponents/Activity/Activity";
import Footer from "../../components/PeterComponents/Footer2/Footer2"; // Assuming this is the correct footer for this page

function Dashboard() {
  return (
    // The global page layout class can be added here for consistency
    <div className="patient-page-body">
      {/* 
        The <Nav2> header is now rendered automatically by App.jsx,
        so we do NOT include it here.
      */}
      <main className="dashboard-content-wrapper">
        <Top />
        <Menu />
        <Activity />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;