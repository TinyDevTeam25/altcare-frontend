import React from "react";
import { useNavigate } from "react-router-dom";
import "./HospitalList.css";

const hospitals = [
  { id: 1, name: "CityCare Hospital", location: "Lagos", rating: 4.6 },
  { id: 2, name: "LifeLine Medical Center", location: "Abuja", rating: 4.8 },
  { id: 3, name: "Harmony Health Clinic", location: "Port Harcourt", rating: 4.5 },
];

const HospitalList = () => {
  const navigate = useNavigate();

  return (
    <div className="container hospital-list">
      <h2>Available Hospitals</h2>
      <div className="hospital-grid">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <h3>{hospital.name}</h3>
            <p>{hospital.location}</p>
            <p>⭐ {hospital.rating}</p>
            <div className="buttons">
              <button className="btn-primary" onClick={() => navigate(`/hospitals/${hospital.id}`)}>
                Book
              </button>
              <button className="btn-outline" onClick={() => navigate("/video-call")}>
                Video Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
