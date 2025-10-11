import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import "./sign.css";
import Singleman from "../../assets/singleman.png";
import apiClient from "../../utils/axiosConfig.js";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify"; // (kept)

// Spinner component (kept)
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

// Add spinner keyframes to the page (only once) (kept)
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

// ADDED: simple domain-suggestion helpers
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
  "gmai.com": "gmail.com",
  "gail.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmial.com": "gmail.com",
  "hmail.com": "gmail.com",
  "hotnail.com": "hotmail.com",
  "outlok.com": "outlook.com",
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

function suggestEmail(input) {
  const parts = String(input).split("@");
  if (parts.length < 2) return null;
  const local = parts[0];
  const domain = parts[1].toLowerCase();

  if (!domain) return null;

  if (TYPO_MAP[domain]) return `${local}@${TYPO_MAP[domain]}`;

  let best = null;
  let bestDist = 3; // threshold
  for (const d of COMMON_DOMAINS) {
    const dist = levenshtein(domain, d);
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  if (best && bestDist <= 2) return `${local}@${best}`;
  return null;
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
  const [emailSuggestion, setEmailSuggestion] = useState(null); // ADDED
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from our global context

  // ADDED: validate structure and surface custom toast (independent of HTML5)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailSuggestion(suggestEmail(val)); // ADDED: compute suggestion on the fly
  };

  const applySuggestion = () => {
    if (emailSuggestion) {
      setEmail(emailSuggestion);
      setEmailSuggestion(null);
      toast.success("Email corrected.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // ADDED: custom validation + suggestion block before calling API
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (emailSuggestion && emailSuggestion !== email) {
      toast.info(`Did you mean ${emailSuggestion}? Click the hint to fix.`);
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post("/patient/login", { email, password });
      toast.success("Login successful!");
      login(res.data);
      navigate("/patient/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response) {
        const msg = err.response?.data?.message || "Invalid email or password.";
        toast.error(`❌ Error ${err.response.status}: ${msg}`);
      } else {
        toast.error(`🌐 Network error: ${err.message}`);
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
          <div className="field" style={{ marginBottom: 8 }}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            {emailSuggestion && emailSuggestion !== email && (
              <button
                type="button"
                onClick={applySuggestion}
                style={{
                  display: "block",
                  marginTop: 6,
                  marginLeft: "auto", // right-align the hint
                  fontSize: 12,
                  color: "#0F766E",
                  background: "transparent",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                }}
                title="Apply suggestion"
              >
                Did you mean {emailSuggestion}?
              </button>
            )}
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
            {/* EDITED: center the eye icon perfectly */}
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
