// import axios from "axios"
import Nav from "../../components/Nav1/Nav";
import Footer from "../Profile/Footer";
import AuthCard from "./AuthCard";
import "./sign.css"
import Singleman from "../../assets/singleman.png"
import React, { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";






function SignIn(){
   return(
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
       <Sign/>
       
  
      <Footer/>
      
    </div>
   )
}
export default SignIn

function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
   const navigate = useNavigate();
   

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember me:", remember);

    // Here you can call axios.post('/api/auth/login', { email, password }) later

    try {
      const res = await apiClient.post("/auth/login-patient", {
        email,
        password,
      });

      console.log("Login successful:", res.data);

    const userData = { ...res.data, isNewUser: false }; 
    if (remember) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
      navigate("/patient/dashboard"); // redirect after successful login

    } catch (err) {
      console.error(err);
      if (err.response) {
        // Backend returned an error
        alert(`❌ Error ${err.response.status}: ${err.response.data.message || "Login failed"}`);
      } else {
        // Network or other error
        alert(`🌐 Network error: ${err.message}`);
      }
    }
  };

  return (
    <form  onSubmit={handleSignIn}>
    <AuthCard
      image={Singleman}
      title="AltCare"
      subtitle="Welcome Back!"
      p="Sign in to access to your patient portal."
      buttonText="Sign In"
      footerText="Don’t have an account yet?"
      footerLinkText="Sign up for AltCare"
      footerLinkHref="/signup"
    >
      {/* Form fields go here */}
    
     <div className="the-form">
        <div className="field">
        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" value={email} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} onChange={(e) => setEmail(e.target.value)} required />
       </div>

      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="******" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} onChange={(e) => setPassword(e.target.value)}
            value={password}  required/>
        <a href="/forgot-password" style={{ display: "block", marginTop: "5px", color: "#008080", fontSize: "14px" ,textAlign:"right"}}>
          Forgot your password?
        </a>
      </div>

      <div className="fieldd">
        <input type="checkbox" id="remember" onChange={(e) =>setRemember(e.target.checked)} checked={remember}/>
        <label htmlFor="remember">
          Remember me <br />
          <span >(Don’t do this on a shared device)</span>
        </label>
      </div>
     </div>
     
    </AuthCard>
    </form>
  );
}


