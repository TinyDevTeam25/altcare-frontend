import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import apiClient from "../../utils/axiosConfig";
import { Eye, EyeOff } from "lucide-react";
// Import an image to use in the AuthCard
import Singleman from "../../assets/singleman.png";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await apiClient.post("/auth/reset-password", { token, password });
      setMessage(
        "Your password has been reset successfully! Redirecting to sign in..."
      );
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      setError(
        "Failed to reset password. The link may be invalid or have expired."
      );
      console.error("Reset Password Error:", err);
    }
  };

  return (
    // This structure now perfectly matches your working SignIn.jsx
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
          title="Create New Password"
          subtitle="Your new password must be different from previous ones."
          buttonText="Reset Password"
        >
          <div className="the-form">
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
