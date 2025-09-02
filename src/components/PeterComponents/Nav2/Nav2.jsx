import React from "react";
import "./Nav2.css";
import { Link, useLocation } from "react-router-dom"; // Corrected import
import logo from "../../../assets/logo.png";
import JaneDoe from "../../../assets/jane-doe-avatar.png";
import Wallet from "../../../assets/wallet.png";

function Nav2({ setshowProfileCard, setshowWalletCard }) {
  let navLinks = [
    { path: "/patient/dashboard", name: "Dashboard" }, // Corrected path
    { path: "/patient/records", name: "My Records" }, // Corrected path
    { path: "/patient/appointments", name: "Appointments" }, // Corrected path
    { path: "/patient/messages", name: "Messages" }, // Corrected path
    { path: "/patient/profile", name: "Profile" }, // Corrected path
  ];
  let location = useLocation();

  return (
    <nav className="nav">
      <Link to="/">
        <img
          src={logo}
          alt="Altcare company logo with stylized text on a white background"
        />
      </Link>

      <ul>
        {navLinks.map(({ path, name }) => (
          // Added the 'key' prop to the <li> element
          <li key={path}>
            <Link
              to={path}
              className={location.pathname.startsWith(path) ? "active" : ""}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <section className="profile">
        <div className="prof" onClick={() => setshowProfileCard(true)}>
          <img
            src={JaneDoe}
            alt="Jane Doe smiling in a professional headshot with a neutral background"
          />
          <div className="Jane">Jane, DOE</div>
        </div>
        <div className="wallet" onClick={() => setshowWalletCard(true)}>
          <img src={Wallet} alt="" />
          <p> 100,000 NGN</p>
        </div>
      </section>
    </nav>
  );
}
export default Nav2;
