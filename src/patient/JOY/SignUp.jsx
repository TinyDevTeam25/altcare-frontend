import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "./AuthCard.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import Couple from "../../assets/Couple.png";
import apiClient from "../../utils/axiosConfig.js";
import { Eye, EyeOff } from "lucide-react";

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

// Add spinner keyframes to the page
const spinnerStyle = document.createElement("style");
spinnerStyle.innerHTML = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(spinnerStyle);

// Inner form component
function SignU() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).{8,}$/;
    if (!regex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await apiClient.post("/patient/sign-up", { email, password });
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      setError("This email may already be in use or another error occurred.");
      console.error("Sign Up Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthCard
        image={Couple}
        title="AltCare"
        subtitle="Create Your Account"
        buttonText={
          loading ? (
            <>
              <Spinner />
              Signing Up...
            </>
          ) : (
            "Sign up"
          )
        }
        buttonDisabled={loading}
        footerText="Already have an account?"
        footerLinkText="Sign in here"
        footerLinkHref="/signin"
      >
        <div style={{ marginBottom: "15px" }}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: "15px", position: "relative" }}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
            disabled={loading}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        <div style={{ marginBottom: "15px", position: "relative" }}>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="******"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            disabled={loading}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </AuthCard>
    </form>
  );
}

export default function SignUp() {
  return (
    <div>
      <Nav
        buttonText="Back Home"
        pText="Need Help?"
        linkTo="/"
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
      <SignU />
      <Footer />
    </div>
  );
}
