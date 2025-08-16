import React from "react";
import "./dashboard.css";
//import Nav2 from "../../components/headfoot/PatientHeader";
import Top from "../../components/PeterComponents/Top/Top";
import Menu from "../../components/PeterComponents/Menu/Menu";
import Activity from "../../components/PeterComponents/Activity/Activity";
import Footer from "../../components/PeterComponents/Footer2/Footer2";
import PatientHeader from "../../components/headfoot/PatientHeader";

// Resolved: Use the correct capitalized function name from your branch
function Dashboard() {
  return (
    <>
      {/* The <body> tag is technically invalid here, but we will leave it 
          as it was part of your teammate's original code. This is a change 
          they can make later. */}
      <body>
        <PatientHeader />
        <main className="dashboard">
          <Top />
          <Menu />
          <Activity />
        </main>

        {/* Use the component with the name from the 'main' branch */}
        <Footer />
      </body>
    </>
  );
}

export default Dashboard;
