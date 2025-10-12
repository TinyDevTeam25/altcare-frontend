import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <section className="Footer">
      <div>© 2025 AltCare. All rights reserved.</div>

      <div>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
    </section>
  );
}
export default Footer;
