import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import "./index.css";

// This line is important for deployment.
const basename = import.meta.env.PROD ? "/altcare-frontend" : "";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* The basename prop is correctly passed to BrowserRouter */}
    <BrowserRouter basename={basename}>
      {/* Our AuthProvider is wrapped inside the router */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
