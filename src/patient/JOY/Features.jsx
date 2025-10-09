"use client";
import React from "react";
import doctor1 from "../../assets/doctor1.png";
import doctor2 from "../../assets/doctor2.png";
import Footer from "../../components/headfoot/Footer.jsx";
import Nav from "../../components/Nav1/Nav.jsx";

export default function Features() {
  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="wrapper bg-white font-[Poppins]">
      {/* --- HEADER --- */}
      <Nav links={mainLinks} />

      {/* --- MAIN HEADING + DESCRIPTION --- */}
      <section className="relative px-[100px] pt-[140px] pb-[200px]">
        <div className="flex items-start justify-between">
          <div className="w-[556px]">
            <h2 className="text-[64px] font-semibold leading-[90px] tracking-[-0.5px] text-[#000]">
              Your Health,<br />
              <span className="text-[#00ADEF]">Your Control</span>
            </h2>
          </div>
          <div className="w-[508px]">
            <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
              Access your medical records, track appointments, and manage your
              health in one easy-to-use platform — secure, simple, and personalized.
            </p>
          </div>
        </div>
      </section>

      {/* --- DOCTOR 1 + TEXT SEGMENT --- */}
      <section className="relative flex justify-between items-center px-[100px] pt-[140px] pb-[200px]">
        <div className="max-w-[520px]">
          <p className="text-[40px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313] mb-[16px]">
            Features
          </p>
          <h3 className="text-[55px] font-semibold leading-[96px] tracking-[-0.5px] text-[#000] mb-[24px]">
            Smart Health Insights
          </h3>
          <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
            Track, understand, and improve your health with real-time insights.
            Our intuitive dashboards give you clear information, helping you
            make informed decisions and stay on top of your progress.
          </p>
        </div>

        <div className="relative w-[570px] h-[553px]">
          <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-[102px] left-[-138px]" />
          <img
            src={doctor1}
            alt="Doctor 1"
            className="absolute w-[432px] h-[418px] top-0 left-[138px] rounded-[20px] object-cover"
          />
        </div>
      </section>

      {/* --- DOCTOR 2 + TEXT SEGMENT --- */}
      <section className="relative flex justify-between items-center px-[100px] pt-[140px] pb-[200px]">
        <div className="relative w-[570px] h-[520px]">
          <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-0 left-[138px]" />
          <img
            src={doctor2}
            alt="Doctor 2"
            className="absolute w-[432px] h-[414px] top-[106px] left-0 rounded-[20px] object-cover"
          />
        </div>

        <div className="w-[513px]">
          <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
            Expert Connection
          </h3>
          <p className="text-[20px] leading-[32px] text-[#333] mb-[40px]">
            Gain access to trusted medical professionals and resources when you
            need them most. We bridge the gap between patients and experts,
            ensuring you get the right care at the right time.
          </p>
          <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
            Seamless Experience
          </h3>
          <p className="text-[20px] leading-[32px] text-[#333]">
            Enjoy a smooth, intuitive platform designed for ease of use. From booking consultations to managing records, everything works together to save you time and reduce stress.
          </p>
        </div>
      </section>

      {/* --- THREE BOTTOM CARDS --- */}
      <section className="relative flex justify-between gap-[20px] px-[100px] pt-[300px] pb-[300px]">
        {[
          {
            title: "Secure Health Data",
            text: "We ensure your medical data remains private, secure, and accessible only to you and trusted professionals.",
          },
          {
            title: "Reliable Support",
            text: "Get consistent and professional assistance from our network of qualified healthcare specialists.",
          },
          {
            title: "Patient Shared Care",
            text: "Collaborate with healthcare providers and share important updates to enhance treatment outcomes.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="w-[398px] h-[395px] bg-[#F5FFFF] shadow-md rounded-[20px] flex flex-col justify-center items-center text-center px-6"
          >
            <h4 className="text-[28px] font-semibold text-[#000] mb-3">
              {card.title}
            </h4>
            <p className="text-[18px] text-[#333]">{card.text}</p>
          </div>
        ))}
      </section>

      {/* --- QUIZ SECTION --- */}
      <section className="relative flex justify-center px-[100px] pt-[140px] pb-[200px]">
        <div className="w-[601px] h-[394px] flex flex-col items-center justify-center text-center bg-[#E5FAFF] rounded-[30px] shadow-lg p-[40px]">
          <h4 className="text-[32px] font-semibold text-[#000] mb-3">
            Any questions through out the process?
          </h4>
          <p className="text-[18px] text-[#333] mb-6">
            Any questions throughout the process?
            We’re here to help! Reach out anytime for support, guidance, or more information about using AltCare.
          </p>
          <button className="bg-[background: #FFFFFF;
] text-white text-[18px] px-[40px] py-[16px] rounded-[8px] hover:bg-[#0090cf] transition radius-[30px] bg-[background: #FFFFFF;
]">
            Contact Us
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}






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

//       {/* --- MAIN FEATURES SECTION --- */}
//       <section className="relative px-[100px] pt-[140px] pb-[300px]">
//         {/* --- MAIN HEADING + DESCRIPTION --- */}
//         <div className="flex items-start justify-between mb-[120px]">
//           {/* Left side heading */}
//           <div className="w-[556px]">
//             <h2 className="text-[64px] font-semibold leading-[90px] tracking-[-0.5px] text-[#000]">
//               Your Health,<br />
//               <span className="text-[#00ADEF]">Your Control</span>
//             </h2>
//           </div>

//           {/* Right side paragraph */}
//           <div className="w-[508px]">
//             <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
//               Access your medical records, track appointments, and manage your
//               health in one easy-to-use platform — secure, simple, and personalized.
//             </p>
//           </div>
//         </div>

//         {/* --- DOCTOR 1 + TEXT SEGMENT (Smart Health Insights) --- */}
//         <div className="flex justify-between items-center mb-[200px]">
//           {/* Text Section */}
//           <div className="max-w-[520px]">
//             <p className="text-[40px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313] mb-[16px]">
//               Features
//             </p>
//             <h3 className="text-[55px] font-semibold leading-[96px] tracking-[-0.5px] text-[#000] mb-[24px]">
//               Smart Health Insights
//             </h3>
//             <p className="text-[20px] font-normal leading-[29px] tracking-[-0.5px] text-[#131313]">
//               Track, understand, and improve your health with real-time insights.
//               Our intuitive dashboards give you clear information, helping you
//               make informed decisions and stay on top of your progress.
//             </p>
//           </div>

//           {/* Doctor 1 Image */}
//           <div className="relative w-[570px] h-[553px]">
//             <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-[102px] left-[-138px]" />
//             <img
//               src={doctor1}
//               alt="Doctor 1"
//               className="absolute w-[432px] h-[418px] top-0 left-[138px] rounded-[20px] object-cover"
//             />
//           </div>
//         </div>

//         {/* --- DOCTOR 2 + TEXT SEGMENT --- */}
//         <div className="flex justify-between items-center mb-[200px]">
//           <div className="relative w-[570px] h-[520px]">
//             <div className="absolute w-[432.15px] h-[450.7px] bg-[#E5FAFF] rounded-[130px] top-0 left-[138px]" />
//             <img
//               src={doctor2}
//               alt="Doctor 2"
//               className="absolute w-[432px] h-[414px] top-[106px] left-0 rounded-[20px] object-cover"
//             />
//           </div>

//           <div className="w-[513px]">
//             <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
//               Expert Connection
//             </h3>
//             <p className="text-[20px] leading-[32px] text-[#333] mb-[40px]">
//               Gain access to trusted medical professionals and resources when you
//               need them most. We bridge the gap between patients and experts,
//               ensuring you get the right care at the right time.
//             </p>
//             <h3 className="text-[48px] font-semibold text-[#000] leading-[64px] mb-[20px]">
//               Seamless Experience
//             </h3>
//             <p className="text-[20px] leading-[32px] text-[#333] mb-[40px]">
//               Enjoy a smooth, intuitive platform designed for ease of use. From booking consultations to managing records, everything works together to save you time and reduce stress.
//             </p>


//           </div>
//         </div>

//         {/* --- THREE BOTTOM CARDS --- */}
//         <div className="flex justify-between gap-[20px] mt-[500px] mb-[200px]">
//           {[
//             {
//               title: "Secure Health Data",
//               text: "We ensure your medical data remains private, secure, and accessible only to you and trusted professionals.",
//             },
//             {
//               title: "Reliable Support",
//               text: "Get consistent and professional assistance from our network of qualified healthcare specialists.",
//             },
//             {
//               title: "Patient Shared Care",
//               text: "Collaborate with healthcare providers and share important updates to enhance treatment outcomes.",
//             },
//           ].map((card, index) => (
//             <div
//               key={index}
//               className="w-[398px] h-[395px] bg-[#F5FFFF] shadow-md rounded-[20px] flex flex-col justify-center items-center text-center px-6"
//             >
//               <h4 className="text-[28px] font-semibold text-[#000] mb-3">
//                 {card.title}
//               </h4>
//               <p className="text-[18px] text-[#333]">{card.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* --- QUIZ SECTION --- */}
//         <div className="mx-auto w-[601px] h-[394px] flex flex-col items-center justify-center text-center bg-[#E5FAFF] rounded-[30px] shadow-lg p-[40px]">
//           <h4 className="text-[32px] font-semibold text-[#000] mb-3">
//             Take Health Quizzes
//           </h4>
//           <p className="text-[18px] text-[#333] mb-6">
//             Test your knowledge and improve your health awareness through fun,
//             interactive quizzes.
//           </p>
//           <button className="bg-[#00ADEF] text-white text-[18px] px-[40px] py-[16px] rounded-[8px] hover:bg-[#0090cf] transition">
//             Start Quiz
//           </button>
//         </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <Footer />
//     </div>
//   );
// }





