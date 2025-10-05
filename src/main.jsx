// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import AuthProvider, { useAuth } from "./context/AuthContext.jsx";
// import "./index.css";

// // This line is important for deployment.
// const basename = import.meta.env.PROD ? "/altcare-frontend" : "";

// // Timeout warning component
// function TimeoutWarningBanner() {
//   const { showTimeoutWarning } = useAuth();
//   if (!showTimeoutWarning) return null;
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         background: "#fff3cd",
//         color: "#856404",
//         padding: "16px",
//         textAlign: "center",
//         zIndex: 1000,
//         fontWeight: "bold",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       }}
//     >
//       Your session will expire in 1 minute due to inactivity.
//     </div>
//   );
// }

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter basename={basename}>
//       <AuthProvider>
//         <TimeoutWarningBanner />
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider, { useAuth } from "./context/AuthContext.jsx";
import "./index.css";

// ADDED: react-toastify container + CSS
import { ToastContainer } from "react-toastify"; // ADDED
import "react-toastify/dist/ReactToastify.css"; // ADDED

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

        {/* ADDED: Global toast container (one place only) */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 999999 }} // keep above modals/banners
          toastStyle={{ borderRadius: "10px" }}
          // OPTIONAL: if banner covers toasts, push them down a bit:
          // style={{ zIndex: 999999, top: 72 }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
