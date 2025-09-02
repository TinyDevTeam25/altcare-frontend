import React from "react";
import "./Nav2.css";
import { Link, useLocation } from "react-router";
import logo from "../../../assets/Logo.png";
import JaneDoe from "../../../assets/jane-doe-avatar.png";
import Wallet from "../../../assets/wallet.png";
function Nav2({ setshowProfileCard, setshowWalletCard }) {
  let navLinks = [
    { path: "/patient/patientdashboard/Dashboard", name: "Dashboard" },
    { path: "/patient/MyRecordTest/MyRecordTest", name: "My Records" },
    { path: "/patient/appointment-details", name: "Appointments" },
    { path: "/patient/messaging/SecureMessagesPage", name: "messages" },
    { path: "/profile", name: "profile" },
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
