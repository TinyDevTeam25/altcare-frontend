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
  const [IsHovered, setIsHovered] = useState(false);

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
            
          <Link to="/about" style={{ flex: 1, textDecoration: "none" }}>
           <Button
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               style={{
                       border: "1px solid #319999",
              color: IsHovered ? "white" : "#008080",
              backgroundColor: IsHovered ? "#008080" : "#f5ffff",
              padding: "10px 0px",
              borderRadius: "30px",
              cursor: "pointer",
              width: "100%",
              transition: "all 0.3s ease",
                   }}
                 >
                         Take a tour
             </Button>
          </Link>

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
          <HealthCard img={folder} title="Secure Record Access" description="Access your medical history anytime, without worrying about lost files or mix-ups. Your data is encrypted and stored safely for you." />
          <HealthCard img={calender} title="Effortless Appointment" description="Book, reschedule, or track your appointments in just a few taps,no long calls or waiting lines needed." />
          <HealthCard img={message} title="Direct Communication" description="Stay connected with your doctor through secure in-app messaging for updates, questions, or follow-ups.
" />
          <HealthCard img={timer} title="Medication Reminders" description="Never miss a dose again. Get personalised reminders to stay consistent  with your treatment plan." />
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
          <p>“Thanks to this app, managing my health has never been easier. The reminders and easy access to my records are game changers!”</p>
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
      <p>Access your medical records, book appointments, and get medication reminders all from one easy-to-use, secure app designed for your well-being.</p>
      <Link to="/signup" style={{ flex: 1, textDecoration: "none"}}>
      <Button style={{ color: "#38B2AC", borderRadius: "30px", padding: "20px 50px", fontSize: "16px", cursor: "pointer", border: "none", backgroundColor:"white"}}>Sign up for free</Button>
      </Link>
    </section>
  );
}
