import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HospitalDetails.css";

const HospitalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="container hospital-details">
      <h2>Hospital #{id} Details</h2>
      <p>
        Comprehensive healthcare services, expert doctors, and modern facilities.
      </p>
      <div className="actions">
        <button className="btn-primary" onClick={() => navigate("/book")}>
          Book Physical Appointment
        </button>
        <button className="btn-outline" onClick={() => navigate("/video-call")}>
          Book Video Consultation
        </button>
      </div>
    </div>
  );
};

export default HospitalDetails;
