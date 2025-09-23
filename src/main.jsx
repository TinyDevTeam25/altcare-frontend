import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider, { useAuth } from "./context/AuthContext.jsx";
import "./index.css";

// This line is important for deployment.
const basename = import.meta.env.PROD ? "/altcare-frontend" : "";

// Timeout warning component
function TimeoutWarningBanner() {
  const { showTimeoutWarning } = useAuth();
  if (!showTimeoutWarning) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        background: "#fff3cd",
        color: "#856404",
        padding: "16px",
        textAlign: "center",
        zIndex: 1000,
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      Your session will expire in 1 minute due to inactivity.
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <TimeoutWarningBanner />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
