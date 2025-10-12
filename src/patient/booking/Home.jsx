import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home container">
      <h1>Welcome to MediBook</h1>
      <p>Book hospital appointments or connect with doctors via video call.</p>
      <button className="btn-primary" onClick={() => navigate("/hospitals")}>
        Book Appointment
      </button>
    </div>
  );
};

export default Home;
