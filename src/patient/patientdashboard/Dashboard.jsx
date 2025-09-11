import React from "react";
import { useAuth } from "../../context/AuthContext.jsx"; // Use our global context
import "./Dashboard.css";
import Top from "../../components/PeterComponents/Top/Top.jsx";
import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
import Activity from "../../components/PeterComponents/Activity/Activity.jsx";

// NOTE: This component should NOT render its own Nav2 or Footer2.
// That is handled by the PatientLayout.

function Dashboard() {
  // Get the full user object from our global state
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading user data...</div>;
  }

  // Safely get the user's first name and isNewUser status
  // Provide default values in case the user object is not available yet
  const firstName = user?.patient?.full_name?.split(" ")[0] || "User";
  const isNewUser = user?.isNewUser || false;

  return (
    <main className="dashboard">
      {/* Pass the data down to the Top component as props */}
      <Top userName={firstName} isNewUser={isNewUser} />
      <Menu />
      <Activity />
    </main>
  );
}

export default Dashboard;
