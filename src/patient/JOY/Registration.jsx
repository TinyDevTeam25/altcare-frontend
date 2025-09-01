import Footer from "../Profile/Footer";
import Nav from "../../components/Nav1/Nav";
import "./sign.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";





export default function Registration(){

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
         <Reg/>
   <Footer />
 </div>
)
}


function Reg(){
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [nin, setNin] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  setError("");
  setSuccess("")
    if (
      !fullName ||
      !dob ||
      !gender ||
      !contact ||
      !nin ||
      !address ||
      !emergencyName ||
      !emergencyContact ||
      !emergencyRelationship
    )  {
    alert("⚠️ Please fill in all fields.");
    return;
  }
   

    const ninRegex = /^\d{11}$/;
   if (!ninRegex.test(nin)) {
  setError("NIN must be exactly 11 digits.");
  return;
  }

  const phoneRegex = /^\d{11}$/;
 if (!phoneRegex.test(contact)) {
  setError("Phone number must be exactly 11 digits.");
  return;
 }

 if (!phoneRegex.test(emergencyContact)) {
  setError("Emergency contact must be exactly 11 digits.");
  return;
 }

 setError ("")
    

    const signupData = JSON.parse(localStorage.getItem("signupData"));
    localStorage.getItem("signupData")
    if (!signupData) {
      setError("Please Sign Up first.");
      return;
    }
    const formattedDob = new Date(dob).toISOString();

     const payload = {
      email: signupData.email,
      password: signupData.password,
      full_name: fullName,
      d_o_b: formattedDob,
      NIN: nin,
      gender,
      phone: contact,
      address,
      emergency_name: emergencyName,
      emergency_phone: emergencyContact,
      emergency_relationship: emergencyRelationship,
    };
    console.log({payload});
    
    try {
      const completeData = { ...signupData, ...payload };
      const res = await apiClient.post("/auth/register-patient", completeData);

      // Save userData with isNewUser flag
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...res.data, isNewUser: true })
      );

      localStorage.removeItem("signupData");

      alert(`Welcome ${payload.full_name}!`);
      navigate("/patient/dashboard");
    } catch (err) {
      if (!err.response) {
        alert(`Network error: ${err.message}`);
        return;
      }
      const { status, data } = err.response;
      const details =
        typeof data === "string" ? data : data?.message || data?.error || JSON.stringify(data);
      alert(`❌ Error ${status}: ${details}`);
    }
  };
   
  //
  
  return (
    <div className="all">
      <form className="formm" onSubmit={handleSubmit}>
        <article>
          {success && <p style={{ color: "green", fontSize: "14px" }}>{success}</p>}
          <h1>Alt Care</h1>
          <h2>Complete Your Profile</h2>
          <p>
            Just a few more details to get started with your personalised health
            journey.
          </p>
        </article>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <section>
          <div className="inputContainer">
            <label className="la">Full Name</label>
            <input
              placeholder="John Doe"
              required
              className="in"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Date of Birth</label>
            <input
              type="date"
              required
              className="in"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Gender</label>
            <select
              className="in select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className="inputContainer">
            <label className="la">Contact</label>
            <input
              type="text"
              placeholder="08123456789"
              required
              className="in"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">National Identification Number</label>
            <input
              type="text"
              placeholder="11232624254"
              required
              className="in"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Address</label>
            <textarea
              placeholder="Your full address"
              required
              className="tex"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div>
            <h1>Emergency Contact</h1>
          </div>
          <div className="inputContainer">
            <label className="la">Full Name</label>
            <input
              placeholder="Emergency contact full name"
              required
              type="text"
              className="in"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Contact Number</label>
            <input
              placeholder="08102017392"
              required
              type="text"
              className="in"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Relationship</label>
            <input
              placeholder="e.g., Spouse, Parent, Sibling"
              required
              type="text"
              className="in"
              value={emergencyRelationship}
              onChange={(e) => setEmergencyRelationship(e.target.value)}
            />
          </div>
        </section>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

