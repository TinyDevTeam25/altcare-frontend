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
// import React from "react";
// import "./Dashboard.css";
// import { useAuth } from "../../context/AuthContext.jsx";
// import Top from "../../components/PeterComponents/Top/Top.jsx";
// import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
// import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
// // This component should not render its own header or footer.
// function Dashboard() {
//   // Get the full user object and the loading state from our global context.
//   const { user, loading } = useAuth();
//   // While the context is checking localStorage, show a simple loading message.
//   // This prevents any part of the page from rendering with null data.
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   // Safely get the user's data after loading is complete.
//   // The optional chaining (?.) is a final safety measure.
//   const firstName = user?.patient?.full_name?.split(" ")[0] || "User";
//   const isNewUser = user?.isNewUser || false;
//   return (
//     <main className="dashboard">
//       {/* Pass the prepared data down as props. */}
//       <Top userName={firstName} isNewUser={isNewUser} />
//       <Menu />
//       <Activity />
//     </main>
//   );
// }
// export default Dashboard;
// import React from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
// import { Navigate } from "react-router-dom"; // For page protection
// import Top from "../../components/PeterComponents/Top/Top.jsx";
// import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
// import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
// import "./Dashboard.css";

// function Dashboard() {
//   const { user, loading } = useAuth();

//   // 1. While the context is doing its initial check, show a loading state.
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // 2. After loading, if there is NO user, redirect them to the sign-in page.
//   //    This is professional-grade page protection.
//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   // 3. This code is now GUARANTEED to run only when 'user' is a valid object.
//   const firstName = user.patient.full_name.split(" ")[0];
//   const isNewUser = user.isNewUser || false;

//   return (
//     <main className="dashboard">
//       <Top userName={firstName} isNewUser={isNewUser} />
//       <Menu />
//       <Activity />
//     </main>
//   );
// }

// export default Dashboard;

// import React from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
// import Top from "../../components/PeterComponents/Top/Top.jsx";
// import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
// import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
// import "./Dashboard.css";

// function Dashboard() {
//   const { user } = useAuth();

//   // THIS IS THE FIX: Use optional chaining for safety.
//   // This line can no longer crash the application.
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
import { useAuth } from "../../context/AuthContext.jsx";
import Top from "../../components/PeterComponents/Top/Top.jsx";
import Menu from "../../components/PeterComponents/Menu/Menu.jsx";
import Activity from "../../components/PeterComponents/Activity/Activity.jsx";
import "./Dashboard.css";

function Dashboard() {
  const { user, loading } = useAuth();

  // If the context is still doing its initial check of localStorage,
  // we render nothing or a loading spinner. This prevents the crash.
  if (loading) {
    return <div>Loading dashboard...</div>;
  }
  // Now that loading is false, we can safely access user data.
  const firstName =
    user?.patient?.full_name?.split(" ")[0] || user?.patient?.email || "User";
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
