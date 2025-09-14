// AuthCard.jsx
import React from "react";
import "./sign.css"
import { Link } from "react-router-dom"; 


export default function AuthCard({
  title,
  subtitle,
  p,
  children,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  image,
 
}) {
  return (
    <div className="cont">
      <img src={image} alt="" />
     <div className="form">
        <div className="text">
          <h2 >{title}</h2>
          <h2 className="welcome">{subtitle}</h2>
          <p>{p}</p>
        </div>

        {/* Custom Form Content */}
       <div>{children}</div>

        {/* Submit Button */}
       <div>
         <button
          style={{
          width: "100%",
          backgroundColor: "#008080",
          color: "#fff",
          border: "none",
          borderRadius: "30px",
          padding: "12px",
          fontWeight: "600",
          marginTop: "20px",
          cursor: "pointer",
          }}  type="submit"
        >
          {buttonText}
       </button>

      {footerText && (
        <div className="foot">
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
          {footerText}
          </p>
         <Link to={footerLinkHref} style={{ color: "#008080", fontWeight: "600" }}>
            {footerLinkText}
          </Link>
          
        </div>
      )}
       </div>
       </div>
    </div>
  );
}
