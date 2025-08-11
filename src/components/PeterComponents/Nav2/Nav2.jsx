import React from 'react'
import "./Nav2.css";
import { Link } from 'react-router';
import logo from "../../../assets/logo.png";
function Nav2() {
  return (
    <nav className="nav">
      <img src={logo} alt="" />
      <ul>
        <li>
          <Link to="/patient/patientdashboard/Dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/patient/MyRecordTest/MyRecordTest">My Records</Link>
        </li>
        <li>
          <Link to="/Appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/messages">messages</Link>
        </li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
      </ul>
      <div>
        <Link to="/professionals" className="Jane">
          Jane, DOE
        </Link>
        <Link to="/signin" className="logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
export default Nav2;