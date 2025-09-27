import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import HeroImage from "./assets/Group 2124.png";
import "./index.css";
import folder from "./assets/folder-2.png";
import calender from "./assets/calendar-tick.png";
import message from "./assets/messages.png";
import timer from "./assets/timer-start.png";
import user from "./assets/jane-doe-avatar.png";
import Footer from "./components/headfoot/Footer.jsx";
import Nav from "./components/Nav1/Nav.jsx";
import { Button } from "./components/Nav1/Nav.jsx";
// import SignUp from "./patient/JOY/SignUp.jsx";



const mainLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Contact Us", href: "/contact" },

 ];

export default function LandingPage() {
  return (
    <div className="wrapper">
      <Nav links={mainLinks} />
      {/* <Nav links={mainLinks} /> */}
      <Hero />
      <HealthCards />
      <WhatUsersSay />
      <HealthControl />
      <Footer />
    </div>
  );
}



function Hero() {
  const words=["Control","Access","Management","Power","Toolkit"]
  const[currentordIndex,setCurrentWordIndex]=useState(0)
  

  useEffect(function(){
    const interval=setInterval(()=>{
      setCurrentWordIndex((prevIndex)=> prevIndex===words.length-1?0:prevIndex+1)
    },2000)
    return()=>clearInterval(interval)
  },[words.length])

  return (
    <section className="hero-section-landing">
      <div className="hero-left">
        <h1>
          Your Health,Your <span style={{ color: "#38B2AC"}}>{words[currentordIndex]}</span>
        </h1>
        <p>
          Access your medical records, schedule appointments, view prescriptions, connect seamlessly with your healthcare team and track health. All in one place.
        </p>
        <span style={{ display: "flex",marginTop: "30px",gap: "10px" }}>
          <Link to="/signup" style={{ flex: 1, textDecoration: "none"}}>
            <button style={{ color: "white", backgroundColor: "#008080", border: "none", padding: "10px 20px", borderRadius: "30px", cursor: "pointer",width: "100%" }} >Get started</button>
          </Link>

          <Button style={{ border: "1px solid #319999", color: "#008080", backgroundColor: "#f5ffff", padding: "10px 0px", borderRadius:"30px", cursor: "pointer",flex: 1 }}>Take a tour</Button>
        </span>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="hero image" />
      </div>
    </section>
  );
}

function HealthCards() {
  return (
    <section className="health">
      <div className="health-section">
        <h1 className="head-text">Empowering Your Health Management</h1>
        <section className="health-cards">
          <HealthCard img={folder} title="Secure Record Access" description="Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." />
          <HealthCard img={calender} title="Effortless Appointment" description="Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." />
          <HealthCard img={message} title="Direct Communication" description="Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." />
          <HealthCard img={timer} title="Medication Reminders" description="Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." />
        </section>
      </div>
    </section>
  );
}

function HealthCard({ img, title, description }) {
  return (
    <article className="card">
      <img src={img} alt={title} />
      <strong>{title}</strong>
      <p>{description}</p>
    </article>
  );
}

function WhatUsersSay() {
  return (
    <section className="testimonial-section">
      <div className="tes-head">
        <h1 className="head-text">What Users say</h1>
        <article className="testimonial">
          <p>“Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis!”</p>
          <figure>
            <img src={user} alt="user profile" />
            <figcaption>
              <p>Jane Doe</p>
              <p>This app made managing my health so much easier. Highly recommended!</p>
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
}

function HealthControl() {
  return (
    <section className="health-control">
      <h1 className="control-head-text">Ready to take control of your Health?</h1>
      <p>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
      <Button style={{ color: "#38B2AC", borderRadius: "30px", padding: "20px 50px", fontSize: "16px", cursor: "pointer", border: "none" }}>Sign up for free</Button>
    </section>
  );
}
