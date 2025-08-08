import React from 'react'
import "./MyRecordTest.css";
import Nav2 from '../../components/PeterComponents/Nav2/Nav2';
import Footer2 from '../../components/PeterComponents/Footer2/Footer2';
import Card2 from '../../components/PeterComponents/Card2/Card2';
import { Link } from 'react-router';
import Card3 from "../../components/PeterComponents/Card3/card3"
import Document from "../../assets/document-text .png"
function MyRecordTest() {
  return (
    <>
      <Nav2 />
      <main className="dashboard">
        <Card2
          Headline="My Health Records"
          Textline="Access your comprehensive medical history, test results, and prescriptions."
        />

        <section className="ls">
          <ul>
            <li>
              <Link to="">All records</Link>
            </li>
            <li>
              <Link to="">Test Result</Link>
            </li>
            <li>
              <Link to="">Prescription</Link>
            </li>
            <li>
              <Link to="">Medical History</Link>
            </li>
            <li>
              <Link to="">Immunization</Link>
            </li>
          </ul>
        </section>

        <div className="resultss-container">
          <Card3
            pix={Document}
            topic="Test Results"
            tn="TEST NAME"
            da="DATE"
            re="RESULT"
            pr="PROVIDER"
            cbc="Complete Blood Count (CBC)"
            date1="2025-06-28"
            nor1="Normal"
            nor2="Normal"
            Dr1="Dr. Emily White"
            vd1="View Details"
            vd2="View Details"
            vd3="View Details"
            cp="Cholesterol Panel"
            date2="2025-05-10"
            ldl="Elevated LDL"
            Dr2="Dr. Robert Green"
            Dr3="Dr. Emily White"
            color1="#008000"
            color2="#FFA500"
            color3="#0000FF"
            ur="Urinalysis"
            date3="2025-04-01"
            vw="View All Results"
            arrow="→"
          />
        </div>

        <div className="resultss-container">
          <Card3
            pix={Document}
            topic="Current Prescriptions"
            tn="MEDICATION"
            da="DOSAGE"
            re="REFILLS LEFT"
            pr="PRESCRIBED BY"
            cbc="Medication x"
            date1="10mg, once daily"
            nor1="3"
            Dr1="Dr. Emily White"
            vd1="Request Refill"
            vd2="Contact Prescriber"
            cp="Medication y"
            date2="250mg, twice daily"
            ldl="0"
            Dr2="Dr. Robert Green"
            color1="#008000"
            color2="#FFA500"
            color3="#0000FF"
            vw="View All prescriptions"
            arrow="→"
          />
        </div>
      </main>

      <Footer2 />
    </>
  );
}
export default MyRecordTest;
