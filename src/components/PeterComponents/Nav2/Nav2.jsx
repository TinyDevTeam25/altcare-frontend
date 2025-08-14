import React from "react";
import "./Nav2.css";
import { Link, useLocation } from "react-router";
import logo from "../../../assets/logo.png";
import JaneDoe from "../../../assets/jane-doe-avatar.png";

function Nav2() {
  let navLinks = [
    { path: "/patient/patientdashboard/Dashboard", name: "Dashboard" },
    { path: "/patient/MyRecordTest/MyRecordTest", name: "My Records" },
    { path: "/Appointments", name: "Appointments" },
    { path: "/messages", name: "messages" },
    { path: "/profile", name: "profile" },
  ];
  let location = useLocation();
  return (
    <nav className="nav">
      <img
        src={logo}
        alt="Altcare company logo with stylized text on a white background"
      />
      <ul>
        {navLinks.map(({ path, name }) => (
          <li>
            <Link
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <img
          src={JaneDoe}
          alt="Jane Doe smiling in a professional headshot with a neutral background"
        />
        <Link to="" className="Jane">
          Jane, DOE
        </Link>
        <Link to="" className="logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
export default Nav2;
