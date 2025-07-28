import Logo from "./assets/logo.png"
import HeroImage from "./assets/Group 2124.png"
import "./index.css";

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
    <div>
    < Nav links={mainLinks} />
    < Hero/>
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
        <P style={{color:"#008080",lineHeight:"24px"}}>{pText}</P>
        <Button style={{borderRadius:"30px",backgroundColor:"#008080",color:"#fff",outline:"none",border:"none",padding:"10px 20px",fontWeight:"600"}}>
          {buttonText}
        </Button>
      </div>)} 
    </nav>
  )
}
function P({children,style}){
  return(
    <p style={style}>
       {children}
    </p>
   
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
          <Button style={{color:"white",backgroundColor:"#008080",border:"none",padding:"10px 20px",borderRadius:"30px"}}>Get started</Button>
          <Button style={{border:"1px solid #319999",color:"#008080",backgroundColor:"#f5ffff",padding:"10px 20px",borderRadius:"30px"}}>Take a tour</Button>
        </span>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="hero image" />
      </div>
    </section>
  )
}