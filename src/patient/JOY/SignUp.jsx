// SignUp.jsx
import React from "react";
import AuthCard from "./AuthCard";
import Nav from "../../components/Nav1/Nav";
import Footer from "../Profile/Footer";
import Couple from "../../assets/couple.png"


export default function SignUp(){
  return(
    <div>
       <Nav
             buttonText="Back Home"
             pText="Need Help?"
             buttonStyle={{
             borderRadius: "30px",
             backgroundColor: "#fff", 
            color: "#008080",       
            border: "1px solid #008080",
            padding: "10px 20px",
            fontWeight: "600",
            cursor: "pointer"
      
        }}
            />
      <SignU/>
      <Footer/>

    </div>
  )
}




 function SignU() {
  return (
    <AuthCard
    linkTo="/"
     image={Couple}
      title="AltCare"
      subtitle="Create Your Account"
      buttonText="Sign up"
      footerText="Already have an account?"
      footerLinkText="Sign in here"
      footerLinkHref="/signin"
    >
      {/* Reuse fields + Confirm Password */}
      <div style={{ marginBottom: "15px" }}>
        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Password</label>
        <input type="password" placeholder="******" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Confirm Password</label>
        <input type="password" placeholder="******" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
      </div>
    </AuthCard>
  );
}
