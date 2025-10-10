import React from "react";
import { useNavigate } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container confirmation">
      <h2>✅ Appointment Confirmed!</h2>
      <p>Your appointment has been successfully booked.</p>
      <button className="btn-primary" onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

export default Confirmation;
