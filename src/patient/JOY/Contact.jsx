


"use client";
import React, { useMemo, useState } from "react";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import doctorImg from "../../assets/contact-hero.png";
import PhoneIcon from "../../assets/phone.png";
import WhatsAppIcon from "../../assets/whatsapp.png";
import MailIcon from "../../assets/mail.png";
import "./ContactUs.css";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Contact Us", href: "/contact" },
];

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [newsEmail, setNewsEmail] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);

  const canSubmit = useMemo(
    () =>
      name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(email) &&
      message.trim().length >= 10,
    [name, email, message]
  );

  const submitContact = async () => {
    if (!canSubmit) return alert("Please fill out all required fields.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Message submitted successfully.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  const submitNewsletter = async () => {
    if (!/\S+@\S+\.\S+/.test(newsEmail))
      return alert("Please enter a valid email address.");
    setNewsLoading(true);
    setTimeout(() => {
      setNewsLoading(false);
      alert("Subscribed successfully.");
      setNewsEmail("");
    }, 1200);
  };

  /* === your same inline styles === */
  const S = {
    page: {
      position: "relative",
      width: "1480px",
      height: "2823px",
      background: "#FFFFFF",
      overflow: "hidden",
      margin: "0 auto",
      fontFamily: "Poppins, sans-serif",
    },
    heroBg: { position: "absolute", left: "1px", top: "0px", width: "1479px", height: "617px", background: "#F5FFFF" },
    h1: { position: "absolute", left: "91px", top: "257px", fontWeight: 600, fontSize: "64px", color: "#38B2AC" },
    intro: { position: "absolute", left: "91px", top: "335px", width: "677px", fontSize: "24px", color: "#0C0C0C" },
    imgFrame: { position: "absolute", left: "824px", top: "176px", width: "553px", height: "441px", border: "3px solid #38B2AC", borderRadius: "300px 300px 0 0" },
    imgInner: { position: "absolute", left: "847px", top: "198.62px", width: "506px", height: "624.38px", borderRadius: "250px 250px 0 0", objectFit: "cover" },
    contactInformationTitle: { position: "absolute", left: "88px", top: "705px", fontSize: "35px", fontWeight: 500 },
    helpText: { position: "absolute", left: "91px", top: "767px", width: "630px", fontSize: "24px", color: "#131313" },
    miniCardBase: (left) => ({
      position: "absolute",
      left: `${left}px`,
      top: "990px",
      width: "303px",
      height: "299px",
      background: "#FFFFFF",
      borderLeft: "3px solid #38B2AC",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: "18px",
      padding: "32px",
    }),
    miniIconImg: (w, h) => ({ width: `${w}px`, height: `${h}px` }),
    miniTitle: { fontWeight: 600, fontSize: 22 },
    miniSub: { fontSize: 20, color: "#000" },
    getInTouch: { position: "absolute", left: "617px", top: "1400px", fontSize: "36px", fontWeight: 500 },
    weLoveText: { position: "absolute", left: "248px", top: "1467px", width: "958px", textAlign: "center", fontSize: "24px" },
    fieldRect: (top) => ({
      position: "absolute",
      left: "117px",
      top: `${top}px`,
      width: "1221px",
      height: "92px",
      background: "#F5FFFF",
      border: "1px solid #000",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
    }),
    fieldInput: { width: "100%", border: "none", outline: "none", fontSize: "20px", background: "transparent" },
    messageRect: { position: "absolute", left: "117px", top: "1968px", width: "1221px", height: "274px", background: "#F5FFFF", border: "1px solid #000", borderRadius: "20px", padding: "16px 24px" },
    messageTextarea: { width: "100%", height: "100%", border: "none", outline: "none", resize: "vertical", background: "transparent", fontSize: "20px" },
    submitWrap: { position: "absolute", left: "571px", top: "2288px", width: "312px", height: "92px" },
    submitBtn: {
      width: "305px",
      height: "82px",
      background: "#DBFFFD",
      borderRadius: "45px",
      border: "1px solid #aee9e6",
      display: "grid",
      placeItems: "center",
      cursor: "pointer",
      transition: "transform .12s ease, box-shadow .12s ease",
    },
    submitText: { fontWeight: 500, fontSize: "28px", color: "#131313" },
    newsBand: { position: "absolute", left: 0, top: "2429px", width: "1447px", height: "300.77px", background: "#F5FFFF" },
    newsTitle: { position: "absolute", left: "100px", top: "2500px", fontSize: "36px", fontWeight: 500 },
    newsText: { position: "absolute", left: "100px", top: "2572px", width: "607px", fontSize: "24px", color: "#131313" },
    newsInputWrap: { position: "absolute", left: "747px", top: "2548px", width: "591px", height: "75px", background: "#fff", border: "1px solid #000", borderRadius: "45px", display: "flex", alignItems: "center", padding: "0 18px" },
    newsInput: { flex: 1, border: "none", outline: "none", fontSize: "18px" },
    newsSubmitWrap: { position: "absolute", left: "1203px", top: "2556px", width: "128px", height: "60px" },
    newsSubmitBtn: { width: "100%", height: "100%", background: "#38B2AC", borderRadius: "50px", color: "#fff", fontWeight: 600, fontSize: "16px", cursor: "pointer" },
  };

  return (
    <div>
      <Nav links={mainLinks} />
      <div className="contact-wrap">
        <div className="contact-canvas">
          <div style={S.page}>
            <div style={S.heroBg}></div>
            <div style={S.h1}>Contact Us</div>
            <div style={S.intro}>
              Access your medical records, schedule appointments, view prescriptions, and connect with your healthcare team — all in one place.
            </div>
            <div style={S.imgFrame}></div>
            <img src={doctorImg} alt="doctor" style={S.imgInner} />

            <div style={S.contactInformationTitle}>Contact Information</div>
            <div style={S.helpText}>Need help or have questions? Reach out to us anytime.</div>

            <a style={S.miniCardBase(168)} href="tel:+2347063949519">
              <img src={PhoneIcon} alt="Phone" style={S.miniIconImg(82, 82)} />
              <div style={S.miniTitle}>Phone</div>
              <div style={S.miniSub}>+234 706 394 9519</div>
            </a>

            <a style={S.miniCardBase(578)} href="https://wa.me/2348146093712" target="_blank" rel="noreferrer">
              <img src={WhatsAppIcon} alt="WhatsApp" style={S.miniIconImg(78, 78)} />
              <div style={S.miniTitle}>WhatsApp</div>
              <div style={S.miniSub}>+234 814 609 3712</div>
            </a>

            <a style={S.miniCardBase(988)} href="mailto:Althubteam25@gmail.com" target="_blank" rel="noreferrer">
              <img src={MailIcon} alt="Email" style={S.miniIconImg(73, 73)} />
              <div style={S.miniTitle}>Email</div>
              <div style={S.miniSub}>Althubteam25@gmail.com</div>
            </a>

            <div style={S.getInTouch}>Get In Touch</div>
            <div style={S.weLoveText}>
              We’d love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to help.
            </div>

            <div style={S.fieldRect(1593)}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={S.fieldInput} />
            </div>

            <div style={S.fieldRect(1718)}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={S.fieldInput} />
            </div>

            <div style={S.fieldRect(1843)}>
              <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={S.fieldInput} />
            </div>

            <div style={S.messageRect}>
              <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} style={S.messageTextarea}></textarea>
            </div>

            <div style={S.submitWrap}>
              <button
                type="button"
                onClick={submitContact}
                disabled={loading || !canSubmit}
                style={{ ...S.submitBtn, opacity: loading || !canSubmit ? 0.7 : 1 }}
              >
                {loading ? (
                  <div className="loader" style={{ width: "24px", height: "24px", border: "3px solid #38B2AC", borderTop: "3px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                ) : (
                  <span style={S.submitText}>Submit</span>
                )}
              </button>
            </div>

            <div style={S.newsBand}></div>
            <div style={S.newsTitle}>Our Newsletter</div>
            <div style={S.newsText}>Stay informed about health tips, new features, and updates. Subscribe here.</div>

            <div style={S.newsInputWrap}>
              <input type="email" placeholder="Email" value={newsEmail} onChange={(e) => setNewsEmail(e.target.value)} style={S.newsInput} />
            </div>

            <div style={S.newsSubmitWrap}>
              <button
                type="button"
                onClick={submitNewsletter}
                disabled={newsLoading}
                style={{ ...S.newsSubmitBtn, opacity: newsLoading ? 0.8 : 1 }}
              >
                {newsLoading ? (
                  <div className="loader" style={{ width: "16px", height: "16px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Add this in your global CSS or ContactUs.css */
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
