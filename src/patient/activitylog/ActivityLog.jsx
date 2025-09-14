import React from "react";
import leftArrow from "../../assets/arrow-left-icon.svg";
import rightArrow from "../../assets/arrow-right-icon.svg"
import calenderIcon from "../../assets/calendar.svg";
import clock from "../../assets/clock.png"
import documentText from "../../assets/document-text.png"
import userIcon from "../../assets/user.svg"
import messages from "../../assets/messages.png"

export default function ActivityLog() {
  const activities = [
    {
      id: 1,
      title: "New Test available",
      highlight: "Complete Blood Count (CBC)",
      color : "text-blue-800",
      description:
        "You have a new test result from your recent blood work. Result: Normal",
      category: "Category : Test Result",
      date: "July 18, 2025 at 10:30AM",
      img: documentText,
      activity : "View Result"
    },
    {
      id: 2,
      title: "Appointment Confirmed",
      highlight: "Dental Check-up",
      color : "text-yellow-400",
      description:
        "Your appointment with Dr. Emily White on July 25, 2025, at 2:00pm has been confirmed",
      category: "Prescription",
      date: "July 17, 2025 at 09:00PM",
      img: calenderIcon,
      activity : "View Appiontment"
    },
    {
      id: 3,
      title: "Profile Updated",
      highlight: "Emergency Contact",
      description:
        "Your sucessfully updated your emergency contact details in your profile.",
      category: "Profile",
      color : "text-green-900",
      date: "July 16, 2025 at 11:15 AM",
      img: userIcon,
      activity : "View Profile"
    },
        {
      id: 4,
      title: "New secure message",
      highlight: "From Dr.Smith",
      description:
        "You received a new message regarding your recent blood test results.",
      category: "Message",
      color : "text-red-700",
      date: "July 16, 2025 at 11:15 AM",
          img: messages,
      activity : "View Message"
    }
  ];

  return (
    <section className="bg-blue-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="bg-gray-100 p-6  rounded-lg mb-8">
          <h1 className="text-3xl font-bold py-2">My Activity Log</h1>
          <p className="">
            A chronological record of Altcare activities
          </p>
          <div className="flex items-center gap-4 text-blue-600 cursor-pointer mt-2">
            <img src={leftArrow} alt="Back" className="" />
            <p className=" text-[#38B2AC]">Back to dashboard</p>
          </div>
        </div>

        {/* Activity List */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <img src={clock} alt="" />
            <h2 className="font-bold text-2xl">Recent Activities</h2>
          </div>

          {activities.map((activity, index) => (
            <div key={activity.id}>
              {/* Title */}
              <div className="flex items-start gap-2">
                <span>
                  <img src={activity.img} alt="icon" className="w-4 h-4 mt-1" />
                </span>
                <h2 className="font-bold text-xl">
                  {activity.title}:{" "}
                  <span className={activity.color}>{activity.highlight}</span>
                </h2>
              </div>

              {/* Description */}
              <div className="pl-6 mt-1">
                <p>{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {activity.category} - {activity.date}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[#38B2AC] cursor-pointer">
                  <p>{activity.activity}</p>
                  <span>
                    <img src={rightArrow} alt="arrow" className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Divider */}
              {index < activities.length - 1 && (
                <hr className="my-4 border-gray-300" />
              )}
            </div>
          ))}

          {/* Pagination Buttons */}
          <p className="text-center mt-8">Displaying Recent Activities</p>
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="px-3 py-1 bg-white border rounded hover:bg-gray-200 text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-[#38B2AC] text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 bg-white border rounded hover:bg-gray-200 text-sm">
              2
            </button>
            <button className="px-3 py-1 bg-white border rounded hover:bg-gray-200 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
