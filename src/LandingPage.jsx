import Logo from "./assets/logo.png"

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
    < Nav links={mainLinks}/>
    </div>
  )
}

function Nav({ showLinks = true, showButton = true, links = [], buttonText = "Sign Up" ,pText="Professional"})
{
  return(
    <nav>
      <img src={Logo} alt="logo" />

      {showLinks &&(<ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>)}

      {showButton&&(<div>
        <P>{pText}</P>
        <Button>
          {buttonText}
        </Button>
      </div>)} 
    </nav>
  )
}
function P({children}){
  return(
    <p>
       {children}
    </p>
   
  )
}

function Button({children}){
  return(
    <button>
      {children}
    </button>
  )
}
