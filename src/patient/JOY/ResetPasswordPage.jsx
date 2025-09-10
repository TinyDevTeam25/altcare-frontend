import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import apiClient from "../../utils/axiosConfig";
import { Eye, EyeOff } from "lucide-react";
import Singleman from "../../assets/singleman.png";

function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get the email passed from the previous page
  const email = location.state?.email;

  // Security check: if the user lands here without an email, send them back.
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await apiClient.post("/patient/reset-password", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });

      setMessage(
        "Your password has been reset successfully! Redirecting to sign in..."
      );

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      setError("Failed to reset password. The OTP may be invalid or expired.");
      console.error("Reset Password Error:", err);
    }
  };

  return (
    <div>
      <Nav linkTo="/" buttonText="Back Home" />
      <form onSubmit={handleSubmit}>
        <AuthCard
          image={Singleman}
          title="Create New Password"
          subtitle={`An OTP was sent to ${email}. Please enter it below.`}
          buttonText="Reset Password"
        >
          <div className="the-form">
            <div className="field" style={{ marginBottom: "15px" }}>
              <label>OTP Code</label>
              <input
                type="text"
                placeholder="Enter the 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
              <label>New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
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

export default ResetPasswordPage;
