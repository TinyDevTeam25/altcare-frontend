import Nav from "../../components/Nav1/Nav";
import SingleMan from "../../assets/Couple.png"
import Footer from "../Profile/Footer";
import AuthCard from "./AuthCard";
import "./sign.css"
import { Link } from "react-router-dom"
import Singleman from "../../assets/singleman.png"






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
  return (
    <AuthCard
      image={Singleman}
      title="AltCare"
      subtitle="Welcome Back!"
      p="Sign in to access to your patient portal."
      buttonText="Sign in"
      footerText="Don’t have an account yet?"
      footerLinkText="Sign up for AltCare"
      footerLinkHref="/signup"
    >
      {/* Form fields go here */}
     <div className="the-form">
        <div className="field">
        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
       </div>

      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="******" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
        <a href="/forgot-password" style={{ display: "block", marginTop: "5px", color: "#008080", fontSize: "14px" ,textAlign:"right"}}>
          Forgot your password?
        </a>
      </div>

      <div className="fieldd">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">
          Remember me <br />
          <span >(Don’t do this on a shared device)</span>
        </label>
      </div>
     </div>
    </AuthCard>
  );
}


