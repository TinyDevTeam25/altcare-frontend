import React from "react";
import book from "../../assets/book.png"

export default function HealthRecords() {
  return (
    <div className="w-full bg-[#F2FAFC] min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="bg-white rounded p-3">
          <h1 className="text-2xl font-bold">My Health Records</h1>
          <p className=" text-md mt-1">
            Access your comprehensive medical history, test results, and prescriptions.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 md:gap-10 mt-6 md:mt-10 text-sm font-medium justify-center">
          {["All Records", "Test Results", "Prescriptions", "Medical History", "Immunizations"].map(
            (tab) => (
              <button
                key={tab}
                className={`pb-2 ${
                  tab === "Medical History"
                    ? "text-[#38B2AC] border-b-2 border-[#38B2AC]"
                    : "text-black "
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Medical History Highlights Card */}
        <div className="mt-8 md:mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="flex items-center gap-2  font-bold text-lg mb-4">
            <span><img src={book} alt="" /></span> Medical History Highlights
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-4">
              <span className="text-green-500">•</span> Diagnosed with Type 2 Diabetes (2020)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-500">•</span> Appendectomy surgery (2018)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> Allergy to Penicillin (Severe)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> Annual Physicals completed regularly
            </li>
          </ul>
          <div className="mt-4">
            <a href="#" className="text-[#38B2AC] text-sm font-medium hover:underline">
              View Full Medical History →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
