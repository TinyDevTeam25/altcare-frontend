// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import Nav from "../../components/Nav1/Nav";
import Footer from "../Profile/Footer";
import Couple from "../../assets/couple.png";
// import axios from "axios";
import { Eye, EyeOff } from "lucide-react"

function SignU() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = "https://altcare-backend.onrender.com/api/auth/register-patient";
 const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).{8,}$/;
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!regex.test(password)) {
  setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
  return;
  }

  if (password !== confirmPassword) {
  setError("Passwords do not match");
  return;
 }


setError("");
      
    // ✅ Save email & password for later use in registration
    localStorage.setItem("signupData", JSON.stringify({ email, password }));

    // ✅ Navigate to registration page
    navigate("/registration");
  };
  

return (
  <form onSubmit={handleSubmit}>
    <AuthCard
      linkTo="/"
      image={Couple}
      title="AltCare"
      subtitle="Create Your Account"
      buttonText="Sign up"
      footerText="Already have an account?"
      footerLinkText="Sign in here"
      footerLinkHref="/signin"
      onSubmit={handleSubmit}
    >
      
        <div style={{ marginBottom: "15px" }}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px",position:"relative" }}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", borderRadius: "8px", border: "1px solid #ccc",padding: "10px"  }}
          />
          <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            bottom:"50%",
            transform: "translateY(-50%)",
            cursor: "pointer"
          }}
        >
          {showPassword ?<EyeOff size={20} /> : <Eye size={20} />}
        </span>
        </div>

        <div style={{ marginBottom: "15px",position:"relative" }}>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="******"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            
          />
          
          <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            bottom:"50%",
            transform: "translateY(-50%)",
            cursor: "pointer"
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
          
        </div>
      {error && <p style={{ color: "red",fontSize:"14px" }}>{error}</p>}

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
