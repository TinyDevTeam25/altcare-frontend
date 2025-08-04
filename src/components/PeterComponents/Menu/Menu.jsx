import React from "react";
import "./Menu.css";
import calendar from "../../../assets/calendar2.png";
import clock from "../../../assets/clock.png";
import result from "../../../assets/result.png";
import message from "../../../assets/messages.png";
import Card from "../../PeterComponents/Card/Card";
function Menu() {
  return (
    <section className="Menu">
      <Card
        Image={calendar}
        Title="Upcoming Appointments"
        Parameter1="Dental Check-up"
        Parameter2="Dr Emily White"
        color="#0000FF"
        bgColor="#CDE6FF"
        date1="July  15 2025"
        Parameter3="Cardiology Follow-up"
        Parameter4="Dr. Robert Green"
        date2="July 15 2025"
        text="No more upcoming appointments for this month"
        btn="View all appointment"
      />
      <Card
        Image={result}
        Title="Latest Test Results"
        Parameter1="Blood Work (complete)"
        Parameter2="Lab ID:#7890"
        color="#2C7A7B"
        bgColor="#CDFFFD"
        date1="New!"
        Parameter3="X-Ray (Chest)"
        Parameter4="Date:June 20,2025"
        date2="Reviewed"
        btn="View all Results"
      />
      <Card
        Image={clock}
        Title="Medication Reminders"
        Parameter1="Medication A"
        Parameter2="1 tablet, twice daily"
        color="#FFA500"
        bgColor="#FFF4CD"
        date1="Due: 08:00am"
        Parameter3="Medication B"
        Parameter4="200mg, once a day"
        date2="Due:09:00pm"
        btn="Manage Medications"
      />
      <Card
        Image={message}
        Title="Secure Messages"
        Parameter1="New message from  Dr,Smith"
        Parameter2="Regarding your recent blood test"
        color="#FF0000"
        bgColor="#FDD1D4"
        date1="Due: 08:00am"
        Parameter3="Medication B"
        Parameter4="200mg, once a day"
        date2="Due:09:00pm"
        btn="view All Messages"
      />
      {/* <div className="card1">
        <h3 className="heading">
          <img src={result} alt="" /> Latest Test Results{" "}
        </h3>
        <div className="appointment">
          <p>
            Blood Work <br />
            (Complete) <br /> <span className="name">Lab ID: #7890</span>
            <span className="test">New!</span>
          </p>
          <p>
            X-Ray (Chest)
            <br />
            <span className="name">Date: June 20, 2025</span>{" "}
            <span className="test">Reviewed</span>
          </p>

          <Link to="" className="appoint">
            View All Results &rarr;
          </Link>
        </div>
      </div>
      <div className="card1">
        <h3 className="heading">Medication Reminders</h3>
        <div className="appointment">
          <p>
            Medication A <br />
            <span className="name">1 tablet, twice daily</span>
            <span className="medication">Due: 08:00 AM</span>
          </p>
          <p>
            Medication B
            <br />
            <span className="name">200mg, once a day</span>
            <span className="medication">Due: 09:00 PM</span>
          </p>

          <Link to="" className="appoint">
            Manage Medications &rarr;
          </Link>
        </div>
      </div>
      <div className="card1">
        <h3 className="heading">Secure Messages</h3>
        <div className="securemessage">
          <p>
            New message
            <br /> from Dr. Smith <br />
            <span className="name">
              Regarding <br /> your recent blood test.
            </span>
            <span className="securetime">Due: 08:00 AM</span>
          </p>
          <p>
            Reply from <br />
            Admin
            <br />
            <span className="name">
              Your profile update <br /> has been processed
            </span>
            <span className="securetime">Due: 09:00 PM</span>
          </p>

          <Link to="" className="appoint">
            View All Messages &rarr;
          </Link>
        </div>
      </div> */}
    </section>
  );
}
export default Menu;
