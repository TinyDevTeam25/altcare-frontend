// import React from "react";
// import "./Top.css";
// import Card2 from "../Card2/Card2.jsx";

// // This component is now simple. It receives userName and isNewUser as props.
// // It no longer has its own state or useEffect.
// function Top({ userName, isNewUser }) {
//   // Determine the welcome message based on the prop.
//   const welcomeText = isNewUser ? "Welcome" : "Welcome back";

//   return (
//     <Card2
//       Headline={`${welcomeText}, ${userName}!`}
//       Textline="Your personalized health overview at a glance"
//     />
//   );
// }

// export default Top;
import React from "react";
import "./Nav2.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import logo from "../../../assets/logo.png";
import JaneDoe from "../../../assets/jane-doe-avatar.png";
import Wallet from "../../../assets/wallet.png";

function Nav2({ setshowProfileCard, setshowWalletCard }) {
  // Get both user and loading state from the context.
  const { user, loading } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: "/patient/dashboard", name: "Dashboard" },
    { path: "/patient/records", name: "My Records" },
    { path: "/patient/appointments", name: "Appointments" },
    { path: "/patient/messages", name: "Messages" },
    { path: "/patient/profile", name: "Profile" },
  ];

  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="Altcare company logo" />
      </Link>

      <ul>
        {navLinks.map(({ path, name }) => (
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
          <img src={JaneDoe} alt="User avatar" />
          <div className="Jane">
            {/* 
              This is the fix. We use optional chaining for safety.
              It will show 'Guest' if the user is null, and the real name once it loads.
              This prevents the crash and fixes the display issue.
            */}
            {user?.patient?.full_name?.split(" ")[0] || "Guest"}
          </div>
        </div>
        <div className="wallet" onClick={() => setshowWalletCard(true)}>
          <img src={Wallet} alt="Wallet" />
          <p> 100,000 NGN</p>
        </div>
      </section>
    </nav>
  );
}

export default Nav2;
