// import React from "react";
// import Nav from "../../components/Nav1/Nav.jsx";
// import Footer from "../../components/headfoot/Footer.jsx";
// import doctorImg from "../../assets/contact-hero.png";
// import PhoneIcon from "../../assets/phone.png";
// import WhatsAppIcon from "../../assets/whatsapp.png";
// import MailIcon from "../../assets/mail.png";

// const mainLinks = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   { label: "Features", href: "/features" },
//   { label: "Contact Us", href: "/contact" },
// ];

// export default function ContactUsFigma() {
//   const S = {
//     page: {
//       position: "relative",
//       width: "1480px",
//       height: "2823px",
//       background: "#FFFFFF",
//       overflow: "hidden",
//       margin: "0 auto",
//     },
//     heroBg: {
//       position: "absolute",
//       left: "1px",
//       top: "0px",
//       width: "1479px",
//       height: "617px",
//       background: "#F5FFFF",
//     },
//     h1: {
//       position: "absolute",
//       left: "91px",
//       top: "257px",
//       width: "354px",
//       height: "36px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 600,
//       fontSize: "64px",
//       lineHeight: "36px",
//       display: "flex",
//       alignItems: "center",
//       textAlign: "center",
//       letterSpacing: "-0.5px",
//       color: "#38B2AC",
//     },
//     intro: {
//       position: "absolute",
//       left: "91px",
//       top: "335px",
//       width: "677px",
//       height: "135px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "24px",
//       lineHeight: "36px",
//       display: "flex",
//       alignItems: "center",
//       letterSpacing: "-0.5px",
//       color: "#0C0C0C",
//     },
//     imgFrame: {
//       boxSizing: "border-box",
//       position: "absolute",
//       left: "824px",
//       top: "176px",
//       width: "553px",
//       height: "441px",
//       border: "3px solid #38B2AC",
//       borderRadius: "300px 300px 0 0",
//     },
//     imgInner: {
//       boxSizing: "border-box",
//       position: "absolute",
//       left: "847px",
//       top: "198.62px",
//       width: "506px",
//       height: "624.38px",
//       border: "1px solid #38B2AC",
//       borderRadius: "250px 250px 0 0",
//       objectFit: "cover",
//     },
//     contactInformationTitle: {
//       position: "absolute",
//       left: "88px",
//       top: "705px",
//       width: "350px",
//       height: "36px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 500,
//       fontSize: "35px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#000",
//       display: "flex",
//       alignItems: "center",
//       textAlign: "center",
//     },
//     helpText: {
//       position: "absolute",
//       left: "91px",
//       top: "767px",
//       width: "630px",
//       height: "135px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "24px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#131313",
//       display: "flex",
//       alignItems: "center",
//     },
//     miniCardBase: (left) => ({
//       boxSizing: "border-box",
//       position: "absolute",
//       left: `${left}px`,
//       top: "990px",
//       width: "303px",
//       height: "299px",
//       background: "#FFFFFF",
//       borderLeft: "3px solid #38B2AC",
//       boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
//       borderRadius: "30px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "50px",
//       padding: "50px",
//     }),
//     miniIconImg: (w, h) => ({
//       width: `${w}px`,
//       height: `${h}px`,
//       objectFit: "contain",
//       display: "block",
//     }),
//     miniTitle: {
//       marginTop: "10px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 600,
//       fontSize: "24px",
//       lineHeight: "24px",
//       color: "#000",
//     },
//     miniSub: {
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "22px",
//       lineHeight: "36px",
//       color: "#000",
//       letterSpacing: "-0.5px",
//     },
//     weLoveText: {
//       position: "absolute",
//       left: "248px",
//       top: "1467px",
//       width: "958px",
//       height: "93px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "24px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#131313",
//       display: "flex",
//       alignItems: "center",
//       textAlign: "center",
//     },
//     getInTouch: {
//       position: "absolute",
//       left: "617px",
//       top: "1400px",
//       width: "294px",
//       height: "52px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 500,
//       fontSize: "36px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#000",
//       display: "flex",
//       alignItems: "center",
//     },
//     fieldRect: (top) => ({
//       boxSizing: "border-box",
//       position: "absolute",
//       left: "117px",
//       top: `${top}px`,
//       width: "1221px",
//       height: "92px",
//       background: "#F5FFFF",
//       border: "1px solid #000",
//       borderRadius: "20px",
//     }),
//     fieldLabel: (left, top, textOpacity = 0.12) => ({
//       position: "absolute",
//       left: `${left}px`,
//       top: `${top}px`,
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "24px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#000",
//       opacity: textOpacity,
//     }),
//     messageRect: {
//       boxSizing: "border-box",
//       position: "absolute",
//       left: "117px",
//       top: "1968px",
//       width: "1221px",
//       height: "274px",
//       background: "#F5FFFF",
//       border: "1px solid #000",
//       borderRadius: "20px",
//     },
//     submitWrap: {
//       position: "absolute",
//       left: "571px",
//       top: "2288px",
//       width: "312px",
//       height: "92px",
//     },
//     submitInner: {
//       position: "absolute",
//       left: "0px",
//       top: "0px",
//       width: "305px",
//       height: "82px",
//       background: "#DBFFFD",
//       borderRadius: "45px",
//     },
//     submitText: {
//       position: "absolute",
//       left: "97px",
//       top: "23px",
//       width: "111px",
//       height: "36px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "32px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#131313",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     newsBand: {
//       position: "absolute",
//       left: "0px",
//       top: "2429px",
//       width: "1447px",
//       height: "300.77px",
//       background: "#F5FFFF",
//     },
//     newsTitle: {
//       position: "absolute",
//       left: "100px",
//       top: "2500px",
//       width: "265px",
//       height: "52px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 500,
//       fontSize: "36px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#000",
//       display: "flex",
//       alignItems: "center",
//     },
//     newsText: {
//       position: "absolute",
//       left: "100px",
//       top: "2572px",
//       width: "607px",
//       height: "93px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "24px",
//       lineHeight: "36px",
//       letterSpacing: "-0.5px",
//       color: "#131313",
//       display: "flex",
//       alignItems: "center",
//     },
//     newsInput: {
//       boxSizing: "border-box",
//       position: "absolute",
//       left: "747px",
//       top: "2548px",
//       width: "591px",
//       height: "75px",
//       background: "#FFFFFF",
//       border: "1px solid #000",
//       borderRadius: "45px",
//     },
//     newsInputLabel: {
//       position: "absolute",
//       left: "795px",
//       top: "2568px",
//       width: "64px",
//       height: "36px",
//       fontFamily: "Poppins, sans-serif",
//       fontWeight: 400,
//       fontSize: "24px",
//       lineHeight: "36px",
//       color: "#000",
//       opacity: 0.12,
//       display: "flex",
//       alignItems: "center",
//     },
//     newsSubmitWrap: {
//       position: "absolute",
//       left: "1203px",
//       top: "2556px",
//       width: "128px",
//       height: "60px",
//     },
//     newsSubmitBtn: {
//       position: "absolute",
//       inset: 0,
//       background: "#38B2AC",
//       borderRadius: "50px",
//       display: "grid",
//       placeItems: "center",
//       color: "#FFF",
//       fontFamily: "Inter, sans-serif",
//       fontWeight: 400,
//       fontSize: "16px",
//       lineHeight: "24px",
//       letterSpacing: "-0.5px",
//     },
//   };

//   return (
//     <div>
//       <Nav links={mainLinks} />

//       {/* Responsive wrapper*/}
//       <div className="figma-scale-wrap">
//         <div className="figma-scale-inner">
//           <div style={S.page}>
//             <div style={S.heroBg} />

//             {/* Heading & intro */}
//             <div style={S.h1}>Contact Us</div>
//             <div style={S.intro}>
//               Access your medical records, schedule appointments, view prescriptions, and connect with your healthcare team all in one place.
//               Reach out today and let us support your wellness journey!
//             </div>

//             {/* Right image frame + image */}
//             <div style={S.imgFrame} />
//             <img src={doctorImg} alt="Paediatrician" style={S.imgInner} />

//             {/* Section titles */}
//             <div style={S.contactInformationTitle}>Contact Information</div>
//             <div style={S.helpText}>Need help or have questions? Reach out to us anytime.</div>

//             {/* Mini Cards with icons */}
//             <div style={S.miniCardBase(168)}>
//               <img src={PhoneIcon} alt="Phone" style={S.miniIconImg(82, 82)} />
//               <div style={S.miniTitle}>Phone</div>
//               <div style={S.miniSub}>Worem ipsum</div>
//             </div>

//             <div style={S.miniCardBase(578)}>
//               <img src={WhatsAppIcon} alt="WhatsApp" style={S.miniIconImg(78, 78)} />
//               <div style={S.miniTitle}>WhatsApp</div>
//               <div style={S.miniSub}>Worem ipsum</div>
//             </div>

//             <div style={S.miniCardBase(988)}>
//               <img src={MailIcon} alt="Email" style={S.miniIconImg(73, 73)} />
//               <div style={S.miniTitle}>Email</div>
//               <div style={S.miniSub}>Worem ipsum</div>
//             </div>

//             {/* Center line */}
//             <div style={S.weLoveText}>
//               We’d love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to help.
//             </div>

//             {/* Contact form */}
//             <div style={S.getInTouch}>Get In Touch</div>
//             <div style={S.fieldRect(1593)} />
//             <div style={S.fieldRect(1718)} />
//             <div style={S.fieldRect(1843)} />
//             <div style={S.messageRect} />
//             <div style={S.fieldLabel(157, 1621, 0.13)}>Name</div>
//             <div style={S.fieldLabel(157, 1747, 0.12)}>Email</div>
//             <div style={S.fieldLabel(157, 1871, 0.12)}>Phone</div>
//             <div style={S.fieldLabel(157, 1995, 0.12)}>Message</div>

//             {/* Submit pill */}
//             <div style={S.submitWrap}>
//               <div style={S.submitInner} />
//               <div style={S.submitText}>Submit</div>
//             </div>

//             {/* Newsletter band */}
//             <div style={S.newsBand} />
//             <div style={S.newsTitle}>Our Newsletter</div>
//             <div style={S.newsText}>
//               Stay informed about health tips, new features, and updates. Subscribe here.
//             </div>
//             <div style={S.newsInput} />
//             <div style={S.newsInputLabel}>Email</div>
//             <div style={S.newsSubmitWrap}>
//               <div style={S.newsSubmitBtn}>Submit</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

"use client";
import React, { useMemo, useState } from "react";
import doctorImg from "../../assets/contact-hero.png";
import PhoneIcon from "../../assets/phone.png";
import WhatsAppIcon from "../../assets/whatsapp.png";
import MailIcon from "../../assets/mail.png";
import { toast } from "react-toastify";
import apiClient from "../../utils/axiosConfig.js";
import "./ContactUs.css";

/**  backend */
const CONTACT_ENDPOINT = "/contact/messages";
const NEWSLETTER_ENDPOINT = "/newsletter/subscribe";

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
    if (!canSubmit) {
      toast.info("Please fill Name, a valid Email, and a longer Message.");
      return;
    }
    setLoading(true);
    try {
      await apiClient.post(CONTACT_ENDPOINT, {
        name,
        email,
        phone,
        message,
      });
      toast.success("Thanks! We’ll get back to you shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Could not send message right now. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const submitNewsletter = async () => {
    if (!/\S+@\S+\.\S+/.test(newsEmail)) {
      toast.info("Enter a valid email to subscribe.");
      return;
    }
    setNewsLoading(true);
    try {
      await apiClient.post(NEWSLETTER_ENDPOINT, { email: newsEmail });
      toast.success("Subscribed! Check your inbox.");
      setNewsEmail("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Subscription failed. Please try again.";
      toast.error(msg);
    } finally {
      setNewsLoading(false);
    }
  };

  /** Inline styles that match your Figma positions */
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
    heroBg: {
      position: "absolute",
      left: "1px",
      top: "0px",
      width: "1479px",
      height: "617px",
      background: "#F5FFFF",
    },
    h1: {
      position: "absolute",
      left: "91px",
      top: "257px",
      width: "354px",
      height: "36px",
      fontWeight: 600,
      fontSize: "64px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#38B2AC",
      display: "flex",
      alignItems: "center",
    },
    intro: {
      position: "absolute",
      left: "91px",
      top: "335px",
      width: "677px",
      height: "135px",
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#0C0C0C",
      display: "flex",
      alignItems: "center",
    },
    imgFrame: {
      boxSizing: "border-box",
      position: "absolute",
      left: "824px",
      top: "176px",
      width: "553px",
      height: "441px",
      border: "3px solid #38B2AC",
      borderRadius: "300px 300px 0 0",
    },
    imgInner: {
      boxSizing: "border-box",
      position: "absolute",
      left: "847px",
      top: "198.62px",
      width: "506px",
      height: "624.38px",
      border: "1px solid #38B2AC",
      borderRadius: "250px 250px 0 0",
      objectFit: "cover",
    },
    contactInformationTitle: {
      position: "absolute",
      left: "88px",
      top: "705px",
      width: "350px",
      height: "36px",
      fontWeight: 500,
      fontSize: "35px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#000",
      display: "flex",
      alignItems: "center",
    },
    helpText: {
      position: "absolute",
      left: "91px",
      top: "767px",
      width: "630px",
      height: "135px",
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
    },
    miniCardBase: (left) => ({
      boxSizing: "border-box",
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
      justifyContent: "center",
      alignItems: "center",
      gap: "18px",
      padding: "32px",
      textAlign: "center",
    }),
    miniIconImg: (w, h) => ({
      width: `${w}px`,
      height: `${h}px`,
      objectFit: "contain",
      display: "block",
    }),
    miniTitle: {
      marginTop: "6px",
      fontWeight: 600,
      fontSize: "22px",
      lineHeight: "24px",
      color: "#000",
    },
    miniSub: {
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "30px",
      color: "#000",
      letterSpacing: "-0.5px",
      wordBreak: "break-word",
    },
    weLoveText: {
      position: "absolute",
      left: "248px",
      top: "1467px",
      width: "958px",
      height: "93px",
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
    },
    getInTouch: {
      position: "absolute",
      left: "617px",
      top: "1400px",
      width: "294px",
      height: "52px",
      fontWeight: 500,
      fontSize: "36px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#000",
      display: "flex",
      alignItems: "center",
    },

    /** Rect containers (we’ll place inputs inside) */
    fieldRect: (top) => ({
      boxSizing: "border-box",
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
    /** Inputs inside the rects */
    fieldInput: {
      width: "100%",
      height: "56px",
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "20px",
      color: "#000",
    },

    messageRect: {
      boxSizing: "border-box",
      position: "absolute",
      left: "117px",
      top: "1968px",
      width: "1221px",
      height: "274px",
      background: "#F5FFFF",
      border: "1px solid #000",
      borderRadius: "20px",
      padding: "16px 24px",
      display: "flex",
    },
    messageTextarea: {
      width: "100%",
      height: "100%",
      border: "none",
      outline: "none",
      resize: "vertical",
      minHeight: "220px",
      background: "transparent",
      fontSize: "20px",
      color: "#000",
    },

    /** Ghost placeholder labels (keep your Figma look) */
    fieldLabel: (left, top, textOpacity = 0.12) => ({
      position: "absolute",
      left: `${left}px`,
      top: `${top}px`,
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#000",
      opacity: textOpacity,
      pointerEvents: "none",
    }),

    /** Submit pill */
    submitWrap: {
      position: "absolute",
      left: "571px",
      top: "2288px",
      width: "312px",
      height: "92px",
    },
    submitBtn: {
      position: "absolute",
      left: "0",
      top: "0",
      width: "305px",
      height: "82px",
      background: "#DBFFFD",
      borderRadius: "45px",
      display: "grid",
      placeItems: "center",
      cursor: "pointer",
      userSelect: "none",
      border: "1px solid #aee9e6",
      transition: "transform .12s ease, box-shadow .12s ease",
    },
    submitText: {
      fontWeight: 500,
      fontSize: "28px",
      lineHeight: "36px",
      letterSpacing: "-0.5px",
      color: "#131313",
    },

    /** Newsletter band */
    newsBand: {
      position: "absolute",
      left: "0px",
      top: "2429px",
      width: "1447px",
      height: "300.77px",
      background: "#F5FFFF",
    },
    newsTitle: {
      position: "absolute",
      left: "100px",
      top: "2500px",
      width: "265px",
      height: "52px",
      fontWeight: 500,
      fontSize: "36px",
      lineHeight: "36px",
      color: "#000",
      display: "flex",
      alignItems: "center",
    },
    newsText: {
      position: "absolute",
      left: "100px",
      top: "2572px",
      width: "607px",
      height: "93px",
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "36px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
    },
    newsInputWrap: {
      boxSizing: "border-box",
      position: "absolute",
      left: "747px",
      top: "2548px",
      width: "591px",
      height: "75px",
      background: "#FFFFFF",
      border: "1px solid #000",
      borderRadius: "45px",
      display: "flex",
      alignItems: "center",
      padding: "0 18px",
      gap: "12px",
    },
    newsInput: {
      flex: 1,
      height: "44px",
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "18px",
    },
    newsSubmitWrap: {
      position: "absolute",
      left: "1203px",
      top: "2556px",
      width: "128px",
      height: "60px",
    },
    newsSubmitBtn: {
      position: "absolute",
      inset: 0,
      background: "#38B2AC",
      borderRadius: "50px",
      display: "grid",
      placeItems: "center",
      color: "#FFF",
      fontFamily: "Inter, sans-serif",
      fontWeight: 600,
      fontSize: "16px",
      letterSpacing: "-0.5px",
      cursor: "pointer",
      userSelect: "none",
      transition: "transform .12s ease, box-shadow .12s ease",
    },
  };

  return (
    <div className="contact-wrap">
      <div className="contact-canvas">
        <div style={S.page}>
          {/* HERO */}
          <div style={S.heroBg} />
          <div style={S.h1}>Contact Us</div>
          <div style={S.intro}>
            Access your medical records, schedule appointments, view
            prescriptions, and connect with your healthcare team all in one
            place. Reach out today and let us support your wellness journey!
          </div>

          {/* Right image frame + image */}
          <div style={S.imgFrame} />
          <img src={doctorImg} alt="Paediatrician" style={S.imgInner} />

          {/* Contact info */}
          <div style={S.contactInformationTitle}>Contact Information</div>
          <div style={S.helpText}>
            Need help or have questions? Reach out to us anytime.
          </div>

          {/* Mini Cards (clickable) */}
          <a style={S.miniCardBase(168)} href="tel:+2347063949519">
            <img src={PhoneIcon} alt="Phone" style={S.miniIconImg(82, 82)} />
            <div style={S.miniTitle}>Phone</div>
            <div style={S.miniSub}>+234 706 394 9519</div>
          </a>

          <a
            style={S.miniCardBase(578)}
            href="https://wa.me/2348146093712"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={WhatsAppIcon}
              alt="WhatsApp"
              style={S.miniIconImg(78, 78)}
            />
            <div style={S.miniTitle}>WhatsApp</div>
            <div style={S.miniSub}>+234 814 609 3712</div>
          </a>

          <a
            style={S.miniCardBase(988)}
            href="mailto:Althubteam25@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={MailIcon} alt="Email" style={S.miniIconImg(73, 73)} />
            <div style={S.miniTitle}>Email</div>
            <div style={S.miniSub}>Althubteam25@gmail.com</div>
          </a>

          {/* Center line */}
          <div style={S.weLoveText}>
            We’d love to hear from you. Whether you have a question about
            features, pricing, or anything else, our team is ready to help.
          </div>

          {/* --- Get In Touch form --- */}
          <div style={S.getInTouch}>Get In Touch</div>

          {/* Name */}
          <div style={S.fieldRect(1593)}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={S.fieldInput}
              aria-label="Your name"
            />
          </div>

          {/* Email */}
          <div style={S.fieldRect(1718)}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={S.fieldInput}
              aria-label="Your email"
            />
          </div>

          {/* Phone */}
          <div style={S.fieldRect(1843)}>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={S.fieldInput}
              aria-label="Your phone number"
            />
          </div>

          {/* Message */}
          <div style={S.messageRect}>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={S.messageTextarea}
              aria-label="Your message"
            />
          </div>

          {/* (Optional) ghost labels that match Figma look */}
          <div style={S.fieldLabel(157, 1621, 0.13)}>Name</div>
          <div style={S.fieldLabel(157, 1747, 0.12)}>Email</div>
          <div style={S.fieldLabel(157, 1871, 0.12)}>Phone</div>
          <div style={S.fieldLabel(157, 1995, 0.12)}>Message</div>

          {/* Submit pill */}
          <div style={S.submitWrap}>
            <button
              type="button"
              onClick={submitContact}
              disabled={loading || !canSubmit}
              style={{
                ...S.submitBtn,
                opacity: loading || !canSubmit ? 0.7 : 1,
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.99)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <span style={S.submitText}>
                {loading ? "Submitting…" : "Submit"}
              </span>
            </button>
          </div>

          {/* Newsletter band */}
          <div style={S.newsBand} />
          <div style={S.newsTitle}>Our Newsletter</div>
          <div style={S.newsText}>
            Stay informed about health tips, new features, and updates.
            Subscribe here.
          </div>

          <div style={S.newsInputWrap}>
            <input
              style={S.newsInput}
              type="email"
              placeholder="Email"
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              aria-label="Newsletter email"
            />
          </div>

          <div style={S.newsSubmitWrap}>
            <button
              type="button"
              onClick={submitNewsletter}
              disabled={newsLoading}
              style={{
                ...S.newsSubmitBtn,
                boxShadow: newsLoading ? "none" : "0 1px 0 rgba(0,0,0,.06)",
                opacity: newsLoading ? 0.8 : 1,
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.99)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {newsLoading ? "Sending…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
