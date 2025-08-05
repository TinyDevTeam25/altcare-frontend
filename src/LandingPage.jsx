import Logo from "./assets/logo.png"
import HeroImage from "./assets/Group 2124.png"
import "./index.css";
import folder from "./assets/folder-2.png"
import calender from "./assets/calendar-tick.png"
import message from "./assets/messages.png"
import timer from "./assets/timer-start.png"
import user from "./assets/jane-doe-avatar.png"
import Footer from "./components/Footer"

const mainLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact Us", href: "#contact" }
];

const dashboardLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Profile", href: "#profile" },
  { label: "Settings", href: "#settings" },
  { label: "Logout", href: "#logout" }
];

export default function LandingPage(){
  return(
    <div className="wrapper">
    < Nav links={mainLinks} />
    < Hero/>
    <HealthCards />
    <WhatUsersSay />
    <HealthControl />
    <Footer/>
    </div>
  )
}

function Nav({ showLinks = true, showButton = true, links = [], buttonText = "Sign Up" ,pText="Professionals"})
{
  return(
    <nav className="nav">
      <img src={Logo} alt="logo" />

      {showLinks &&(<ul className="nav-link">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>)}

      {showButton&&(<div style={{display:"flex", gap:"20px"}}>
        <P style={{color:"#008080",lineHeight:"24px",cursor:"pointer"}}>{pText}</P>

        <Button style={{borderRadius:"30px",backgroundColor:"#008080",color:"#fff",outline:"none",border:"none",padding:"10px 20px",fontWeight:"600",cursor:"pointer"}}>
          {buttonText}
        </Button>
      </div>)} 
    </nav>
  )
}
function P({children,style}){
  return(
    <span style={style}>
       {children}
    </span>
   
  )
}

function Button({children,style}){
  return(
    <button style={style}>
      {children}
    </button>
  )
}
 
function Hero(){
  return(
    <section style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",backgroundColor:"#f5ffff",padding:"50px 100px"}}>
      <div className="hero-left">
        <h1>Your Health,Your <span style={{color:"#38B2AC"}}>Control</span> </h1>
        <p>Access your medical records, schedule appointments, view prescriptions, connect seamlessly with your healthcare team and track health. All in one place.</p>
        <span style={{display:"flex",gap:"10px",marginTop:"30px"}}>
          <Button style={{color:"white",backgroundColor:"#008080",border:"none",padding:"10px 20px",borderRadius:"30px",cursor:"pointer"}}>Get started</Button>
          <Button style={{border:"1px solid #319999",color:"#008080",backgroundColor:"#f5ffff",padding:"10px 20px",borderRadius:"30px",cursor:"pointer"}}>Take a tour</Button>
        </span>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="hero image" />
      </div>
    </section>
  )
}

// Empower your health section

function HealthCards(){
  return(
    <section className="health">
      <div className="health-section">
        <h1 className="head-text">
          Empowering Your Health Management
        </h1>
        <section className="health-cards">
          <HealthCard
            img={folder} 
            title="Secure Record Access"
            description= "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            />
          <HealthCard
            img={calender} 
            title= "Effortless Appointment"
            description="Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            />
          <HealthCard
            img={message}
            title="Direct Communication" 
            description= "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            />
          <HealthCard
            img={timer}
            title="Medication Reminders" 
            description= "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            />
        </section>
      </div>
    </section>
  )
}

function HealthCard({img,title,description}){
  return(
    <article className="card">
      <img src={img} alt={title} />
      <strong>{title}</strong>
      <p>{description}</p>
    </article>
  )
}

// What User say

function WhatUsersSay(){
  return(
    <section className="testimonial-section">
      <div>
        <h1 className="head-text">What Users say</h1>
        <article className="testimonial">
          <p>“Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis!”</p>
          <figure>
            <img src={user} alt="user profile" />
            <figcaption>
              <h3>Jane Doe</h3>
              <p>This app made managing my health so much easier. Highly recommended!"</p>
            </figcaption>

          </figure>
        </article>
      </div>
    </section>
  )
}

// take control of your health

function HealthControl(){
  return(
    <section className="health-control">
      <h1 className="control-head-text">Ready to take control of your Health?</h1>
      <p>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
      <Button style={{color:"#38B2AC",borderRadius:"30px",padding:"20px 50px",fontSize:"16px",cursor:"pointer", border:"none"}}>Sign up for free</Button>
    </section>
  )
}