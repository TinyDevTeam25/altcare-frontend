import React from "react";
import { Link } from "react-router";
import "./Recordheader.css";
function Recordheader({ activeLink, setActiveLink }) {
  let recordLinks = [
    "All records",
    "Test Result",
    "Prescription",
    "Medical History",
    "Immunization",
  ];

  return (
    <section className="ls">
      <ul>
        {recordLinks.map((link, index) => (
          <li
            key={index}
            className={activeLink === link ? "under" : ""}
            onClick={() => setActiveLink(link)}
          >
            {link}
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Recordheader;
