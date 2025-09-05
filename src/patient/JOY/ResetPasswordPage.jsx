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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");
    try {
      await apiClient.post("/auth/verify-otp", { email, otp });
      setIsOtpVerified(true);
      setMessage("OTP verified. Please create a new password.");
    } catch (err) {
      setError("The OTP is invalid or has expired. Please request a new one.");
      console.error("Verify OTP Error:", err);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await apiClient.post("/auth/reset-password-otp", {
        email,
        otp,
        newPassword: password,
      });
      setMessage(
        "Your password has been reset successfully! Redirecting to sign in..."
      );
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Reset Password Error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpVerified) {
      handleResetPassword();
    } else {
      handleVerifyOtp();
    }
  };

  return (
    <div>
      <Nav linkTo="/" buttonText="Back Home" />
      <form onSubmit={handleSubmit}>
        <AuthCard
          image={Singleman}
          title={isOtpVerified ? "Create New Password" : "Verify Your Identity"}
          subtitle={
            isOtpVerified
              ? "Your new password must be strong."
              : `An OTP has been sent to ${email}`
          }
          buttonText={isOtpVerified ? "Reset Password" : "Verify OTP"}
        >
          <div className="the-form">
            {!isOtpVerified && (
              <div className="field">
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
            )}
            {isOtpVerified && (
              <>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <label>New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <label>Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
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
                </div>
              </>
            )}
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
