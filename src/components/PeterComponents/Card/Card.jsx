import React from "react";
import { Link } from "react-router";

function Card({
  Image,
  Title,
  Parameter1,
  Parameter2,
  color,
  color2,
  bgColor,
  date1,
  Parameter3,
  Parameter4,
  date2,
  text,
  btn,
}) {
  return (
    <div className="card1">
      <div className="heading">
        <img src={Image} alt="" className="fileimage" />
        <p>{Title}</p>
      </div>

      <div className="appointment">
        <div className="fl">
          <p className="paragraph">
            <span className="Para">{Parameter1}</span> <br />
            <span className="name">{Parameter2} </span>
          </p>
          <span className="pill" style={{ background: bgColor, color: color }}>
            {date1}
          </span>
        </div>
        <div className="fl">
          <p className="paragraph">
            {Parameter3}
            <br />
            <span className="name">{Parameter4}</span>{" "}
          </p>
          <span className="pill" style={{ background: bgColor, color: color }}>
            {date2}
          </span>
        </div>

        <p className="name">{text}</p>
        <Link to="" className="appoint" style={{color:color2}}>
          {btn} &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Card;
