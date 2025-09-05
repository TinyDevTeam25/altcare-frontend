import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import apiClient from "../../utils/axiosConfig";
import Singleman from "../../assets/singleman.png";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // This is the API call to request the OTP
      await apiClient.post("/auth/request-otp", { email });

      // On success, navigate to the reset page and pass the email
      navigate("/reset-password", { state: { email: email } });
    } catch (err) {
      // Even if the API fails (e.g., user not found), we still navigate for security
      // The error will be handled on the next page if the OTP is invalid
      console.error("Request OTP Error:", err);
      navigate("/reset-password", { state: { email: email } });
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
          buttonText="Send OTP"
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
          </div>
        </AuthCard>
      </form>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
