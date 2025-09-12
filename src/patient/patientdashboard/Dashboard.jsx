// import React from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
// import Top from "../../components/PeterComponents/Top/Top.jsx";
// import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
// import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
// import "./Dashboard.css";

// function Dashboard() {
//   const { user, loading } = useAuth();

//   // If the context is still checking localStorage, render a loading state.
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // This code will now ONLY run after loading is false.
//   const firstName = user?.patient?.full_name?.split(" ")[0] || "User";
//   const isNewUser = user?.isNewUser || false;

//   return (
//     <main className="dashboard">
//       <Top userName={firstName} isNewUser={isNewUser} />
//       <Menu />
//       <Activity />
//     </main>
//   );
// }

// export default Dashboard;
import React from "react";
import "./Dashboard.css";
import { useAuth } from "../../context/AuthContext.jsx";
import Top from "../../components/PeterComponents/Top/Top.jsx";
import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
// This component should not render its own header or footer.
function Dashboard() {
  // Get the full user object and the loading state from our global context.
  const { user, loading } = useAuth();
  // While the context is checking localStorage, show a simple loading message.
  // This prevents any part of the page from rendering with null data.
  if (loading) {
    return <div>Loading...</div>;
  }
  // Safely get the user's data after loading is complete.
  // The optional chaining (?.) is a final safety measure.
  const firstName = user?.patient?.full_name?.split(" ")[0] || "User";
  const isNewUser = user?.isNewUser || false;
  return (
    <main className="dashboard">
      {/* Pass the prepared data down as props. */}
      <Top userName={firstName} isNewUser={isNewUser} />
      <Menu />
      <Activity />
    </main>
  );
}
export default Dashboard;
