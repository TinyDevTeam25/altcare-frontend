import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for the footer
import AuthCard from "./AuthCard.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import Couple from "../../assets/Couple.png";
import apiClient from "../../utils/axiosConfig.js";
import { Eye, EyeOff } from "lucide-react";

// Inner form component
function SignU() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Default is hidden
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

    try {
      await apiClient.post("/patient/sign-up", { email, password });
      // Navigate to the verification page on success
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      setError("This email may already be in use or another error occurred.");
      console.error("Sign Up Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthCard
        image={Couple}
        title="AltCare"
        subtitle="Create Your Account"
        buttonText="Sign up"
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
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              cursor: "pointer",
              // transform: "translateY(-50%)",
            }}
          >
            {/* THIS IS THE ONLY CHANGE: The icons are now reversed to the correct logic */}
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              cursor: "pointer",
              // transform: "translateY(-50%)",
            }}
          >
            {/* Also fixed the icon logic here for consistency */}
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        </div>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </AuthCard>
    </form>
  );
}

// Main page component
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
