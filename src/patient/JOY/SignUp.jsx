import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "./AuthCard.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import Couple from "../../assets/Couple.png";
import apiClient from "../../utils/axiosConfig.js";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

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
@keyframes spin { to { transform: rotate(360deg); } }
`;
  document.head.appendChild(spinnerStyle);
}

/* ----------------------------
   Popular email-domain helpers
   ---------------------------- */
const COMMON_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "ymail.com",
  "proton.me",
  "protonmail.com",
];

const TYPO_MAP = {
  "gmail.co": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.con": "gmail.com",
  "gmial.com": "gmail.com",
  "hmail.com": "gmail.com",
  "outlok.com": "outlook.com",
  "hotnail.com": "hotmail.com",
};

function levenshtein(a = "", b = "") {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function suggestPopularEmail(email) {
  const [local, domain] = String(email).toLowerCase().split("@");
  if (!local || !domain) return null;

  if (TYPO_MAP[domain]) return `${local}@${TYPO_MAP[domain]}`;

  let best = null;
  let bestDist = 2; // max distance to consider a likely typo
  for (const d of COMMON_DOMAINS) {
    const dist = levenshtein(domain, d);
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return best ? `${local}@${best}` : null;
}

// Inner form component
function SignU() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email format regex so we can toast before hitting API
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailPattern.test(email)) {
      const msg = "Please enter a valid email address.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Guard against common domain typos (e.g., gmail.co → gmail.com)
    const suggestion = suggestPopularEmail(email);
    if (suggestion && suggestion !== email) {
      const msg = `Did you mean ${suggestion}?`;
      setError(msg);
      toast.error(msg);
      return;
    }

    // Password strength check
    const strong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).{8,}$/;
    if (!strong.test(password)) {
      const msg =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Confirm match
    if (password !== confirmPassword) {
      const msg = "Passwords do not match.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await apiClient.post("/patient/sign-up", { email, password });
      toast.success("Sign up successful! Please check your email to verify.");
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      console.error("Sign Up Error:", err);
      if (err.response) {
        const status = err.response.status;
        const serverMsg = err.response?.data?.message;

        if (status === 409 || /exist|already/i.test(serverMsg || "")) {
          const msg = "This email is already in use.";
          setError(msg);
          toast.error(msg);
        } else if (status >= 400 && status < 500) {
          const msg = serverMsg || "Invalid sign up details.";
          setError(msg);
          toast.error(`Request Failed: ${msg}`);
        } else {
          const msg = serverMsg || "Something went wrong. Please try again.";
          setError(msg);
          toast.error(`Server Error: ${msg}`);
        }
      } else if (err.request) {
        const msg = "Network error. Please check your connection.";
        setError(msg);
        toast.error(msg);
      } else {
        const msg = "Unexpected error. Please try again.";
        setError(msg);
        toast.error(msg);
      }
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
        {/* Email */}
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

        {/* Password */}
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
              transform: "translateY(-50%)",
              cursor: "pointer",
              lineHeight: 0,
            }}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Confirm Password */}
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
              transform: "translateY(-50%)",
              cursor: "pointer",
              lineHeight: 0,
            }}
            title={showPassword ? "Hide password" : "Show password"}
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
