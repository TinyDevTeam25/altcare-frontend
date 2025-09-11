import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Top from "../../components/PeterComponents/Top/Top.jsx";
import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
import "./Dashboard.css";

function Dashboard() {
  const { user, loading } = useAuth();

  // If the context is still checking localStorage, render a loading state.
  if (loading) {
    return <div>Loading...</div>;
  }

  // This code will now ONLY run after loading is false.
  const firstName = user?.patient?.full_name?.split(" ")[0] || "User";
  const isNewUser = user?.isNewUser || false;

  return (
    <main className="dashboard">
      <Top userName={firstName} isNewUser={isNewUser} />
      <Menu />
      <Activity />
    </main>
  );
}

export default Dashboard;
