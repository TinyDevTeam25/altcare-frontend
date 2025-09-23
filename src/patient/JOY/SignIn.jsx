import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import "./sign.css";
import Singleman from "../../assets/singleman.png";
import apiClient from "../../utils/axiosConfig.js";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify"; // <-- Import toast

// Spinner component
function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "2px solid #008080",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        marginRight: 8,
        animation: "spin 0.7s linear infinite",
        verticalAlign: "middle",
      }}
    />
  );
}

// Add spinner keyframes to the page (only once)
if (!document.getElementById("spin-keyframes")) {
  const spinnerStyle = document.createElement("style");
  spinnerStyle.id = "spin-keyframes";
  spinnerStyle.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);
}

// This is the main page component that assembles the page
function SignIn() {
  return (
    <div>
      <Nav
        linkTo="/"
        buttonText="Back Home"
        pText="Need Help?"
        buttonStyle={{
          borderRadius: "30px",
          backgroundColor: "#fff",
          color: "#008080",
          border: "1px solid #008080",
          padding: "10px 20px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      />
      <SignInForm />
      <Footer />
    </div>
  );
}

// This is the inner component that contains the form and its logic
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from our global context

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // This is REAL API call
      const res = await apiClient.post("/patient/login", {
        email,
        password,
      });

      toast.success("Login successful!"); // <-- Toast for success

      // Call the global login function to save the user data
      login(res.data);

      // Navigate to the dashboard after successful login
      navigate("/patient/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(
          `❌ Error ${err.response.status}: ${
            err.response.data.message || "Login failed"
          }`
        ); // <-- Toast for error
      } else {
        toast.error(`🌐 Network error: ${err.message}`); // <-- Toast for network error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <AuthCard
        image={Singleman}
        title="AltCare"
        subtitle="Welcome Back!"
        p="Sign in to access to your patient portal."
        buttonText={
          loading ? (
            <>
              <Spinner />
              Signing In...
            </>
          ) : (
            "Sign In"
          )
        }
        buttonDisabled={loading}
        footerText="Don’t have an account yet?"
        footerLinkText="Sign up for AltCare"
        footerLinkHref="/signup"
      >
        <div className="the-form">
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="field" style={{ position: "relative" }}>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "40%",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            <Link
              to="/forgot-password"
              style={{
                display: "block",
                marginTop: "5px",
                color: "#008080",
                fontSize: "14px",
                textAlign: "right",
              }}
            >
              Forgot your password?
            </Link>
          </div>
          <div className="fieldd">
            <input
              type="checkbox"
              id="remember"
              onChange={(e) => setRemember(e.target.checked)}
              checked={remember}
              disabled={loading}
            />
            <label htmlFor="remember">
              Remember me <br />
              <span>(Don’t do this on a shared device)</span>
            </label>
          </div>
        </div>
      </AuthCard>
    </form>
  );
}

export default SignIn;
