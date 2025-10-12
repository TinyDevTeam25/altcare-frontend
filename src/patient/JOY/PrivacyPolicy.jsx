import React from "react";
import Nav from "../../components/Nav1/Nav.jsx";             
import Footer from "../../components/headfoot/Footer.jsx";   

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Contact Us", href: "/contact" },
];

export default function PrivacyPolicyFigma() {
  const page = {
    position: "relative",
    width: "1440px",
    height: "1692px",
    background: "#F5FFFF",
    overflow: "hidden",
    margin: "0 auto", 
  };
  const topSpacer = { height: "90px" }; 
    // ---- PAGE CONTENT ----
  const titleCard = {
    position: "absolute",
    left: "100px",
    top: "140px",
    width: "1160px",
    height: "130px",
    background: "#FFFFFF",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "18px 0px",
    gap: "22px",
    boxSizing: "border-box",
  };
  const title = {
    width: "1160px",
    height: "24px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "24px",
    letterSpacing: "-0.5px",
    color: "#121212",
    display: "flex",
    alignItems: "center",
    margin: 0,
    paddingLeft: "18px",
  };
  const subtitle = {
    width: "1160px",
    height: "48px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "-0.5px",
    color: "#121212",
    display: "flex",
    alignItems: "center",
    margin: 0,
    paddingLeft: "18px",
  };

  const bodyFrame = {
    position: "absolute",
    left: "100px",
    top: "286px",
    width: "1240px",
    height: "1266px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    gap: "10px",
    boxSizing: "border-box",
  };
  const bodyText = {
    width: "1220px",
    height: "1224px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "-0.5px",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-wrap",
    margin: 0,
  };

  const bodyCopy = `
At Altcare NG, we value the trust you place in us and take your privacy seriously. This policy explains how we collect, use, and protect your information, and your rights under Nigeria’s Data Protection Act, 2023.

1. Why We Collect Your Information
We collect your data to be able to provide you with the best health services. This is done with your permission, to meet our agreements with you, or when it’s necessary for us to run our business properly.

2. What Information We Collect
We gather details like your name, contact info, health records, and how you use our app — all to help us improve your experience and deliver better care.

3. How We Use Your Data
Your information helps us:
• Tailor services to your needs
• Keep you updated about your health and our offerings
• Make the app easier and safer to use
• Follow laws and regulations

4. Sharing Your Data
We don’t sell your information to anyone. Sometimes, we may share it with trusted partners who assist us in providing services, but only under strict agreements to keep your info safe.

5. Keeping Your Data Safe
We put strong security measures in place to protect your personal data from unauthorized access or loss.

6. Your Rights About Your Data
You can:
• Ask to see the information we hold about you
• Correct anything that’s wrong or out of date
• Ask us to delete your data when you no longer want us to have it
• Change your mind about giving permission whenever you want

7. How Long We Keep Your Data
We keep your data only as long as we need it to provide our services or meet legal requirements.

8. Changes to This Policy
If we update this policy, we’ll let you know through the app or by email so you’re always informed.

9. How to Contact Us
If you have questions or concerns about your privacy, feel free to reach out:
Email: support@altcare.ng
Phone: +234 XXXXXXXX

By using Altcare NG, you’re agreeing to this privacy approach.
  `.trim();

  return (
    <div>
      <Nav links={mainLinks} />
      <div style={topSpacer} />
      <div style={page}>
        {/* White title card */}
        <section style={titleCard}>
          <h1 style={title}>Privacy Policy</h1>
          <p style={subtitle}>Date: September 12, 2025&nbsp;&nbsp;Version: V1.0</p>
        </section>

        {/* Body frame */}
        <section style={bodyFrame}>
          <p style={bodyText}>{bodyCopy}</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
