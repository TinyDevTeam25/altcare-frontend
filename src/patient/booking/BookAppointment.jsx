import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation");
  };

  return (
    <div className="container booking">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Time</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <button className="btn-primary">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookAppointment;
