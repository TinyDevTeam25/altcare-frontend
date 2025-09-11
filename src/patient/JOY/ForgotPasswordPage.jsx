import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for completeness
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import apiClient from "../../utils/axiosConfig.js";
import Singleman from "../../assets/singleman.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage(""); // Clear previous messages

    try {
      await apiClient.post("/patient/request-password-reset", { email });
      // On success, we set a message AND navigate
      setMessage("Request successful! Navigating to the next step...");
      navigate("/reset-password", { state: { email: email } });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Request Password Reset Error:", err);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <AuthCard
          image={Singleman}
          title="Reset Your Password"
          subtitle="Enter your email address and we'll send you an OTP to reset your password."
          buttonText="Request OTP"
          footerText="Remembered your password?"
          footerLinkText="Sign in here"
          footerLinkHref="/signin"
        >
          <div className="the-form">
            <div className="field">
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
            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {error}
              </p>
            )}

            {message && (
              <p
                style={{ color: "green", fontSize: "14px", marginTop: "10px" }}
              >
                {message}
              </p>
            )}
          </div>
        </AuthCard>
      </form>
      <Footer />
    </div>
  );
}
