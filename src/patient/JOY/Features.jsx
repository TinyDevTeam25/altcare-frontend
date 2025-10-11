// "use client";
// import React from "react";
// import doctor1 from "../../assets/doctor1.png";
// import doctor2 from "../../assets/doctor2.png";
// import Footer from "../../components/headfoot/Footer.jsx";
// import Nav from "../../components/Nav1/Nav.jsx";

// export default function Features() {
//   const mainLinks = [
//     { label: "Home", href: "/" },
//     { label: "About", href: "/about" },
//     { label: "Features", href: "/features" },
//     { label: "Contact Us", href: "/contact" },
//   ];

//   return (
//     <div className="wrapper bg-white font-[Poppins]">
//       {/* --- HEADER --- */}
//       <Nav links={mainLinks} />

//       {/* --- MAIN HEADING + DESCRIPTION --- */}
//       <section className="relative px-[100px] pt-[140px] pb-[200px]">
//         <div className="flex items-start justify-between">
//           <div className="w-[556px]">
//             <h2 className="text-[64px] font-semibold leading-[90px] tracking-[-0.5px] text-[#000]">
//               Your Health,<br />
//               <span className="text-[#00ADEF]">Your Control</span>
//             </h2>
//           </div>
//           <div className="w-[508px]">
//             <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
//               Access your medical records, track appointments, and manage your
//               health in one easy-to-use platform — secure, simple, and personalized.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* --- DOCTOR 1 + TEXT SEGMENT --- */}
//       <section className="relative flex justify-between items-center px-[100px] pt-[140px] pb-[200px]">
//         <div className="max-w-[520px]">
//           <p className="text-[40px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313] mb-[16px]">
//             Features
//           </p>
//           <h3 className="text-[55px] font-semibold leading-[96px] tracking-[-0.5px] text-[#000] mb-[24px]">
//             Smart Health Insights
//           </h3>
//           <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
//             Track, understand, and improve your health with real-time insights.
//             Our intuitive dashboards give you clear information, helping you
//             make informed decisions and stay on top of your progress.
//           </p>
//         </div>

//         <div className="relative w-[570px] h-[553px]">
//           <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-[102px] left-[-138px]" />
//           <img
//             src={doctor1}
//             alt="Doctor 1"
//             className="absolute w-[432px] h-[418px] top-0 left-[138px] rounded-[20px] object-cover"
//           />
//         </div>
//       </section>

//       {/* --- DOCTOR 2 + TEXT SEGMENT --- */}
//       <section className="relative flex justify-between items-center px-[100px] pt-[140px] pb-[200px]">
//         <div className="relative w-[570px] h-[520px]">
//           <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-0 left-[138px]" />
//           <img
//             src={doctor2}
//             alt="Doctor 2"
//             className="absolute w-[432px] h-[414px] top-[106px] left-0 rounded-[20px] object-cover"
//           />
//         </div>

//         <div className="w-[513px]">
//           <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
//             Expert Connection
//           </h3>
//           <p className="text-[20px] leading-[32px] text-[#333] mb-[40px]">
//             Gain access to trusted medical professionals and resources when you
//             need them most. We bridge the gap between patients and experts,
//             ensuring you get the right care at the right time.
//           </p>
//           <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
//             Seamless Experience
//           </h3>
//           <p className="text-[20px] leading-[32px] text-[#333]">
//             Enjoy a smooth, intuitive platform designed for ease of use. From booking consultations to managing records, everything works together to save you time and reduce stress.
//           </p>
//         </div>
//       </section>

//       {/* --- THREE BOTTOM CARDS --- */}
//       <section className="relative flex justify-between gap-[20px] px-[100px] pt-[300px] pb-[300px]">
//         {[
//           {
//             title: "Secure Health Data",
//             text: "We ensure your medical data remains private, secure, and accessible only to you and trusted professionals.",
//           },
//           {
//             title: "Reliable Support",
//             text: "Get consistent and professional assistance from our network of qualified healthcare specialists.",
//           },
//           {
//             title: "Patient Shared Care",
//             text: "Collaborate with healthcare providers and share important updates to enhance treatment outcomes.",
//           },
//         ].map((card, index) => (
//           <div
//             key={index}
//             className="w-[398px] h-[395px] bg-[#F5FFFF] shadow-md rounded-[20px] flex flex-col justify-center items-center text-center px-6"
//           >
//             <h4 className="text-[28px] font-semibold text-[#000] mb-3">
//               {card.title}
//             </h4>
//             <p className="text-[18px] text-[#333]">{card.text}</p>
//           </div>
//         ))}
//       </section>

//       {/* --- QUIZ SECTION --- */}
//       <section className="relative flex justify-center px-[100px] pt-[140px] pb-[200px]">
//         <div className="w-[601px] h-[394px] flex flex-col items-center justify-center text-center bg-[#E5FAFF] rounded-[30px] shadow-lg p-[40px]">
//           <h4 className="text-[32px] font-semibold text-[#000] mb-3">
//             Any questions through out the process?
//           </h4>
//           <p className="text-[18px] text-[#333] mb-6">
//             Any questions throughout the process?
//             We’re here to help! Reach out anytime for support, guidance, or more information about using AltCare.
//           </p>
//           <button className="bg-[background: #FFFFFF;
// ] text-white text-[18px] px-[40px] py-[16px] rounded-[8px] hover:bg-[#0090cf] transition radius-[30px] bg-[background: #FFFFFF;
// ]">
//             Contact Us
//           </button>
//         </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <Footer />
//     </div>
//   );
// }






// // "use client";
// // import React from "react";
// // import doctor1 from "../../assets/doctor1.png";
// // import doctor2 from "../../assets/doctor2.png";
// // import Footer from "../../components/headfoot/Footer.jsx";
// // import Nav from "../../components/Nav1/Nav.jsx";

// // export default function Features() {
// //   const mainLinks = [
// //     { label: "Home", href: "/" },
// //     { label: "About", href: "/about" },
// //     { label: "Features", href: "/features" },
// //     { label: "Contact Us", href: "/contact" },
// //   ];

// //   return (
// //     <div className="wrapper bg-white font-[Poppins]">
// //       {/* --- HEADER --- */}
// //       <Nav links={mainLinks} />

// //       {/* --- MAIN FEATURES SECTION --- */}
// //       <section className="relative px-[100px] pt-[140px] pb-[300px]">
// //         {/* --- MAIN HEADING + DESCRIPTION --- */}
// //         <div className="flex items-start justify-between mb-[120px]">
// //           {/* Left side heading */}
// //           <div className="w-[556px]">
// //             <h2 className="text-[64px] font-semibold leading-[90px] tracking-[-0.5px] text-[#000]">
// //               Your Health,<br />
// //               <span className="text-[#00ADEF]">Your Control</span>
// //             </h2>
// //           </div>

// //           {/* Right side paragraph */}
// //           <div className="w-[508px]">
// //             <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
// //               Access your medical records, track appointments, and manage your
// //               health in one easy-to-use platform — secure, simple, and personalized.
// //             </p>
// //           </div>
// //         </div>

// //         {/* --- DOCTOR 1 + TEXT SEGMENT (Smart Health Insights) --- */}
// //         <div className="flex justify-between items-center mb-[200px]">
// //           {/* Text Section */}
// //           <div className="max-w-[520px]">
// //             <p className="text-[40px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313] mb-[16px]">
// //               Features
// //             </p>
// //             <h3 className="text-[55px] font-semibold leading-[96px] tracking-[-0.5px] text-[#000] mb-[24px]">
// //               Smart Health Insights
// //             </h3>
// //             <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
// //               Track, understand, and improve your health with real-time insights.
// //               Our intuitive dashboards give you clear information, helping you
// //               make informed decisions and stay on top of your progress.
// //             </p>
// //           </div>

// //           {/* Doctor 1 Image */}
// //           <div className="relative w-[570px] h-[553px]">
// //             <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-[102px] left-[-138px]" />
// //             <img
// //               src={doctor1}
// //               alt="Doctor 1"
// //               className="absolute w-[432px] h-[418px] top-0 left-[138px] rounded-[20px] object-cover"
// //             />
// //           </div>
// //         </div>

// //         {/* --- DOCTOR 2 + TEXT SEGMENT --- */}
// //         <div className="flex justify-between items-center mb-[200px]">
// //           <div className="relative w-[570px] h-[520px]">
// //             <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-0 left-[138px]" />
// //             <img
// //               src={doctor2}
// //               alt="Doctor 2"
// //               className="absolute w-[432px] h-[414px] top-[106px] left-0 rounded-[20px] object-cover"
// //             />
// //           </div>

// //           <div className="w-[513px]">
// //             <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
// //               Expert Connection
// //             </h3>
// //             <p className="text-[20px] leading-[32px] text-[#333] mb-[40px]">
// //               Gain access to trusted medical professionals and resources when you
// //               need them most. We bridge the gap between patients and experts,
// //               ensuring you get the right care at the right time.
// //             </p>
// //             <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
// //               Seamless Experience
// //             </h3>
// //             <p className="text-[20px] leading-[32px] text-[#333] mb-[40px]">
// //               Enjoy a smooth, intuitive platform designed for ease of use. From booking consultations to managing records, everything works together to save you time and reduce stress.
// //             </p>


// //           </div>
// //         </div>

// //         {/* --- THREE BOTTOM CARDS --- */}
// //         <div className="flex justify-between gap-[20px] mt-[500px] mb-[200px]">
// //           {[
// //             {
// //               title: "Secure Health Data",
// //               text: "We ensure your medical data remains private, secure, and accessible only to you and trusted professionals.",
// //             },
// //             {
// //               title: "Reliable Support",
// //               text: "Get consistent and professional assistance from our network of qualified healthcare specialists.",
// //             },
// //             {
// //               title: "Patient Shared Care",
// //               text: "Collaborate with healthcare providers and share important updates to enhance treatment outcomes.",
// //             },
// //           ].map((card, index) => (
// //             <div
// //               key={index}
// //               className="w-[398px] h-[395px] bg-[#F5FFFF] shadow-md rounded-[20px] flex flex-col justify-center items-center text-center px-6"
// //             >
// //               <h4 className="text-[28px] font-semibold text-[#000] mb-3">
// //                 {card.title}
// //               </h4>
// //               <p className="text-[18px] text-[#333]">{card.text}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* --- QUIZ SECTION --- */}
// //         <div className="mx-auto w-[601px] h-[394px] flex flex-col items-center justify-center text-center bg-[#E5FAFF] rounded-[30px] shadow-lg p-[40px]">
// //           <h4 className="text-[32px] font-semibold text-[#000] mb-3">
// //             Take Health Quizzes
// //           </h4>
// //           <p className="text-[18px] text-[#333] mb-6">
// //             Test your knowledge and improve your health awareness through fun,
// //             interactive quizzes.
// //           </p>
// //           <button className="bg-[#00ADEF] text-white text-[18px] px-[40px] py-[16px] rounded-[8px] hover:bg-[#0090cf] transition">
// //             Start Quiz
// //           </button>
// //         </div>
// //       </section>

// //       {/* --- FOOTER --- */}
// //       <Footer />
// //     </div>
// //   );
// // }




"use client";
import React from "react";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import doctorRight from "../../assets/doctor2.png";  // Right feature image (612x612 stock)
import doctorLeft from "../../assets/doctor1.png";   // Left feature image (another stock)
import fileMedicalAlt from "../../assets/file-medical.png";   // left card icon
import fileMedical from "../../assets/file-medical-alt.png";          // middle card icon
import medicalRibbon from "../../assets/medical-ribbon.png";      // right card icon

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Contact Us", href: "/contact" },
];

export default function Features() {
  const S = {
    page: {
      position: "relative",
      width: "1439px",
      height: "3531px",
      background: "#FFFFFF",
      margin: "0 auto",
      overflow: "hidden",
    },

    // Top soft band
    rect21: {
      position: "absolute",
      left: "1px",
      top: "-83px",
      width: "1439px",
      height: "655px",
      background: "#F5FFFF",
    },

    // Headings near top
    bigHeadingWrap: {
      position: "absolute",
      left: "100px",
      top: "199px",
      width: "556px",
      height: "192px",
      display: "flex",
      alignItems: "center",
    },
    bigHeading: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: "64px",
      lineHeight: "96px",
      letterSpacing: "-0.5px",
      color: "#131313",
    },
    rightIntro: {
      position: "absolute",
      left: "823px",
      top: "244px",
      width: "508px",
      height: "87px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
    },

    // Page title “Features”
    featuresTitle: {
      position: "absolute",
      left: "84px",
      top: "618px",
      width: "241px",
      height: "96px",
      display: "flex",
      alignItems: "center",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: "55px",
      lineHeight: "96px",
      letterSpacing: "-0.5px",
      color: "#000",
    },

    // (right image with cyan rounded bg)
    blobRight: {
      position: "absolute",
      left: "770px",
      top: "871.3px",
      width: "432.16px",
      height: "450.7px",
      background: "#B3FAF7",
      borderRadius: "130px",
    },
    photoRight: {
      position: "absolute",
      left: "908px",
      top: "769px",
      width: "432px",
      height: "418px",
      borderRadius: "20px",
      objectFit: "cover",
    },

    //  (left text block “Smart Health Insights”)
    insightHeading: {
      position: "absolute",
      left: "84px",
      top: "812px",
      width: "417px",
      height: "29px",
      display: "flex",
      alignItems: "center",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "40px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#000",
    },
    insightText: {
      position: "absolute",
      left: "84px",
      top: "892px",
      width: "508px",
      height: "116px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
    },

    // (left image with cyan rounded bg)
    blobLeft: {
      position: "absolute",
      left: "238px",
      top: "1433px",
      width: "432.16px",
      height: "450.7px",
      background: "#B3FAF7",
      borderRadius: "130px",
    },
    photoLeft: {
      position: "absolute",
      left: "100px",
      top: "1539px",
      width: "432px",
      height: "414px",
      borderRadius: "20px",
      objectFit: "cover",
    },

    //(right titles + paragraphs)
    expertHeading: {
      position: "absolute",
      left: "958px",
      top: "1461px",
      width: "377px",
      height: "29px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "40px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#000",
      display: "flex",
      alignItems: "center",
    },
    expertText: {
      position: "absolute",
      left: "827px",
      top: "1539px",
      width: "508px",
      height: "116px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
      textAlign: "right",
    },
    seamlessHeading: {
      position: "absolute",
      left: "924px",
      top: "1704px",
      width: "411px",
      height: "29px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "40px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#000",
      display: "flex",
      alignItems: "center",
    },
    seamlessText: {
      position: "absolute",
      left: "822px",
      top: "1784px",
      width: "508px",
      height: "116px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "-0.5px",
      color: "#131313",
      display: "flex",
      alignItems: "center",
      textAlign: "right",
    },

    //  three cards row
    cardLeft: {
      position: "absolute",
      left: "100px",
      top: "2185px",
      width: "398px",
      height: "395px",
      background: "#F5FFFF",
      borderRadius: "20px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    cardMid: {
      position: "absolute",
      left: "520px",
      top: "2185px",
      width: "398px",
      height: "395px",
      background: "#F5FFFF",
      borderRadius: "20px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    cardRight: {
      position: "absolute",
      left: "940px",
      top: "2185px",
      width: "398px",
      height: "395px",
      background: "#F5FFFF",
      borderRadius: "20px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },

    // Icons positions
    iconLeft: { position: "absolute", left: "274px", top: "2244px", width: "51px", height: "58px" },
    iconMid: { position: "absolute", left: "698px", top: "2244px", width: "43px", height: "58px" },
    iconRight: { position: "absolute", left: "1110px", top: "2244px", width: "58px", height: "58px" },

    // Card headings + text
    cardHeadLeft: {
      position: "absolute",
      left: "160px",
      top: "2338px",
      width: "279px",
      height: "29px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    cardTextLeft: {
      position: "absolute",
      left: "160px",
      top: "2390px",
      width: "279px",
      height: "145px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    cardHeadMid: {
      position: "absolute",
      left: "580px",
      top: "2338px",
      width: "279px",
      height: "29px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    cardTextMid: {
      position: "absolute",
      left: "580px",
      top: "2390px",
      width: "279px",
      height: "116px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    cardHeadRight: {
      position: "absolute",
      left: "999px",
      top: "2338px",
      width: "279px",
      height: "29px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    cardTextRight: {
      position: "absolute",
      left: "1000px",
      top: "2390px",
      width: "279px",
      height: "116px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },

    // CTA teal box with button
    ctaGroup: {
      position: "absolute",
      left: "419px",
      top: "2793px",
      width: "601px",
      height: "494.01px",
      filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))",
    },
    ctaRect: {
      position: "absolute",
      left: "419px",
      top: "2793px",
      width: "601px",
      height: "494.01px",
      background: "#38B2AC",
      borderRadius: "58px",
    },
    ctaTitle: {
      position: "absolute",
      left: "526px",
      top: "2857px",
      width: "372px",
      height: "71px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "30px",
      lineHeight: "41px",
      letterSpacing: "-0.5px",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    ctaText: {
      position: "absolute",
      left: "516px",
      top: "2985px",
      width: "415px",
      height: "125px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "29px",
      letterSpacing: "1px",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    ctaBtnWrap: {
      position: "absolute",
      left: "607px",
      top: "3167px",
      width: "210px",
      height: "66px",
    },
    ctaBtnRect: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "210px",
      height: "66px",
      background: "#FFFFFF",
      borderRadius: "30px",
    },
    ctaBtnText: {
      position: "absolute",
      left: "660px",
      top: "3182px",
      width: "119px",
      height: "35px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "96px",
      letterSpacing: "-0.5px",
      color: "#000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
    },
  };

  return (
    <div className="wrapper">
      {/* local scaling helper so smaller desktops don’t clip the right side */}
      <style>{`
        .figma-scale-wrap {
          --s: clamp(0.5, calc((100vw - 16px)/1439), 1);
          display: grid;
          place-items: start center;
          width: 100%;
          overflow-x: hidden;
        }
        .figma-scale-inner {
          width: 1439px;
          transform: scale(var(--s));
          transform-origin: top center;
        }
      `}</style>

      <Nav links={mainLinks} />

      <div className="figma-scale-wrap">
        <div className="figma-scale-inner">
          <div style={S.page}>
            {/* Soft band */}
            <div style={S.rect21} />

            {/* Headings */}
            <div style={S.bigHeadingWrap}>
              <h1 style={S.bigHeading}>Your Health, Your Control</h1>
            </div>
            <div style={S.rightIntro}>
              Access your medical records, track appointments, and manage your
              health in one easy-to-use platform, secure, simple, and personalized.
            </div>

            {/* Page Title */}
            <div style={S.featuresTitle}>Features</div>

            {/* Right image group */}
            <div style={S.blobRight} />
            <img src={doctorRight} alt="Feature visual" style={S.photoRight} />

            {/* Left text block */}
            <div style={S.insightHeading}>Smart Health Insights</div>
            <div style={S.insightText}>
              Track, understand, and improve your health with real-time insights. Our
              intuitive dashboards give you clear information, helping you make
              informed decisions and stay on top of your progress.
            </div>

            {/* Left image group */}
            <div style={S.blobLeft} />
            <img src={doctorLeft} alt="Patient using app" style={S.photoLeft} />

            {/* Right text blocks */}
            <div style={S.expertHeading}>Expert Connections</div>
            <div style={S.expertText}>
              Gain access to trusted medical professionals and resources when you
              need them most. We bridge the gap between patients and experts,
              ensuring you get the right care at the right time.
            </div>
            <div style={S.seamlessHeading}>Seamless Experience</div>
            <div style={S.seamlessText}>
              Enjoy a smooth, intuitive platform designed for ease of use. From
              booking consultations to managing records, everything works together
              to save you time and reduce stress.
            </div>

            {/* Three cards row */}
            <div style={S.cardLeft} />
            <div style={S.cardMid} />
            <div style={S.cardRight} />

            {/* Icons */}
            <img src={fileMedicalAlt} alt="Medical file alt" style={S.iconLeft} />
            <img src={fileMedical} alt="Medical file" style={S.iconMid} />
            <img src={medicalRibbon} alt="Medical ribbon" style={S.iconRight} />

            {/* Card texts */}
            <div style={S.cardHeadLeft}>Secure Health Data</div>
            <div style={S.cardTextLeft}>
              Your medical information is encrypted and stored securely, ensuring
              complete privacy and trust.
            </div>

            <div style={S.cardHeadMid}>Reliable Support</div>
            <div style={S.cardTextMid}>
              Access consistent, professional healthcare guidance whenever you need it.
            </div>

            <div style={S.cardHeadRight}>Patient-Centered Care</div>
            <div style={S.cardTextRight}>
              We prioritize your well-being with tools designed around your unique&nbsp;health&nbsp;journey.
            </div>

            {/* CTA Teal box */}
            <div style={S.ctaGroup} />
            <div style={S.ctaRect} />
            <div style={S.ctaTitle}>Any questions through out the process?</div>
            <div style={S.ctaText}>
              Any questions throughout the process? We’re here to help! Reach out
              anytime for support, guidance, or more information about using AltCare.
            </div>
            <div style={S.ctaBtnWrap}>
              <div style={S.ctaBtnRect} />
            </div>
            <a href="/contact" style={S.ctaBtnText}>Contact Us</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
