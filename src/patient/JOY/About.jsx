"use client";
import React from "react";
import aboutHero from "../../assets/about-hero.png";
import Footer from "../../components/headfoot/Footer.jsx";
import Nav from "../../components/Nav1/Nav.jsx";

export default function About() {
  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <main className="bg-white text-gray-900 max-w-[1440px] mx-auto overflow-hidden relative">
      {/* --- HEADER --- */}
      <Nav links={mainLinks} />


      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[950px] overflow-hidden">
        {/* Background image */}
        <img
          src={aboutHero}
          alt="Healthcare professionals"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* --- HERO TEXT --- */}
        <div className="relative z-10 flex flex-col items-center text-center text-white px-6 pt-28">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            Your Health, Your{" "}
            <span className="text-teal-400 font-semibold">Control</span>
          </h1>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed">
            Welcome to Altcare, your personalized healthcare companion. We’re
            dedicated to empowering patients like you with seamless access to
            your medical information, streamlined communication with healthcare
            providers, and tools to track your health journey.
          </p>
        </div>

        {/* --- MISSION & VISION CARDS --- */}
        <div
          className="absolute w-full flex justify-between px-[52px] z-20"
          style={{ top: "500px" }}
        >
          {/* Mission */}
          <div className="w-[547px] h-[322px] rounded-[60px] border border-white bg-white/40 text-center flex flex-col justify-center items-center p-10 shadow-lg backdrop-blur-[1px]">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Our Mission
            </h3>
            <p className="text-gray-800 leading-relaxed max-w-[420px] text-[17px]">
              To provide patients with easy, secure access to their health
              records, faster transparent communication with healthcare
              professionals, and support proactive health decisions through
              technology.
            </p>
          </div>

          {/* Vision */}
          <div className="w-[547px] h-[322px] rounded-[60px] border border-white bg-white/40 text-center flex flex-col justify-center items-center p-10 shadow-lg backdrop-blur-[1px]">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Our Vision
            </h3>
            <p className="text-gray-800 leading-relaxed max-w-[420px] text-[17px]">
              To be the leading digital health companion, empowering individuals
              to take charge of their well-being through personalized,
              connected, and accessible healthcare solutions.
            </p>
          </div>
        </div>
      </section>




      {/* --- HEALTH MANAGEMENT SECTION --- */}

      {/* --- HEALTH MANAGEMENT SECTION --- */}
      <section className="text-center mt-[220px] md:mt-[260px] px-6 pb-24 relative">
        <h2 className="text-3xl font-semibold mb-16">
          Empowering Your Health <br />
          <span className="text-teal-500">Management</span>
        </h2>

        {/* What We Offer Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-[160px]">
          {/* Card 1 */}
          <div
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-[40px] shadow-md p-8 flex flex-col justify-center text-center"
            style={{ width: "404px", height: "342px" }}
          >
            <h4 className="font-semibold mb-4 text-gray-800 text-xl">
              What We Offer
            </h4>
            <p className="text-gray-700 leading-relaxed text-[17px]">
              Easy access to personal medical records anytime, anywhere. <br />
              Streamlined communication with healthcare providers. <br />
              Personalized health tracking and reminders.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-[40px] shadow-md p-8 flex flex-col justify-center text-center"
            style={{ width: "404px", height: "342px" }}
          >
            <h4 className="font-semibold mb-4 text-gray-800 text-xl">
              What We Offer
            </h4>
            <p className="text-gray-700 leading-relaxed text-[17px]">
              Secure data handling and privacy-first approach. <br />
              Seamless appointment scheduling. <br />
              Tools for medication management and wellness insights.
            </p>
          </div>
        </div>
      </section>


      <section className="flex items-center justify-center py-20 bg-white">
        <div className="bg-teal-50 p-10 rounded-2xl max-w-2xl mx-auto text-center">
          <p className="text-gray-700 font-medium leading-relaxed">
            Join Us<br></br>
            Take control of your health with us. Sign up today and experience a more streamlined, patient-focused approach to healthcare.
          </p>
        </div>
      </section>



      <Footer />
    </main>
  );
}


