import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  // 1. While the context is checking localStorage on initial load, show a loading message.
  if (loading) {
    return <div>Loading session...</div>;
  }

  // 2. After loading, if there is no user, redirect to the sign-in page.
  //    The 'replace' prop is important for good back-button behavior.
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 3. If loading is false AND a user exists, render the requested page.
  //    The <Outlet> will be replaced by the actual page component (e.g., Dashboard).
  return <Outlet />;
}

export default ProtectedRoute;
