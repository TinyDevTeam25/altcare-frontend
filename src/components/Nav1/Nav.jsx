import "../../index.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import MenuBar from "../../assets/menu.png";
import HospitalRegister from "../../professional/Register/hospitalRegister";
import { useState } from "react";
function handleAnchorClick(e, href) {
  if (href.startsWith("#")) {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Nav({
  showLinks = true,
  showButton = true,
  links = [],
  buttonText = "Sign In",
  pText = "Professionals",
  buttonStyle = {
    borderRadius: "30px",
    backgroundColor: "#008080",
    color: "#fff",
    padding: "10px 20px",
  },
  linkTo = "/signin",
  pTextLink = "/professional/hospital-register",
}) {
  let [showNav, setShowNav] = useState(false);
  return (
    <nav className="nav">
      <img src={Logo} alt="logo" />
      <img
        src={MenuBar}
        className="bar"
        onClick={() => setShowNav(!showNav)}
        alt=""
      />
      {showLinks && (
        <ul className={`nav-link ${showNav? "": "hidden"}`}>
          {links.map((link, index) => (
            <li key={index}>
              {link.href.startsWith("/") ? (
                <Link to={link.href}>{link.label}</Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li className="hide">{pText}</li>
          <Link to={linkTo} className="hide">
            {buttonText}
          </Link>
        </ul>
      )}

      {showButton && (
        <div
          className="hidden"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <Link to={pTextLink} style={{ textDecoration: "none" }}>
            <P
              style={{ color: "#008080", lineHeight: "24px", cursor: "pointer" }}
            >
              {pText}
            </P>
          </Link>
          <Link to={linkTo}>
            <Button style={buttonStyle}>{buttonText}</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

function P({ children, style }) {
  return <span style={style}>{children}</span>;
}

export function Button({ children, style }) {
  return <button style={style}>{children}</button>;
}
