import React from 'react'
import "./MyRecordTest.css";
import Nav2 from '../../components/PeterComponents/Nav2/Nav2';
import Footer2 from '../../components/PeterComponents/Footer2/Footer2';
import Card2 from '../../components/PeterComponents/Card2/Card2';
import { Link } from "react-router";
import Card3 from "../../components/PeterComponents/Card3/card3"
import Document from "../../assets/document-text.png"
import book from "../../assets/book.png"
import Recordheader from '../../components/PeterComponents/Recordheader/Recordheader';

function MyRecordTest() {
  // Alt text for the book image in the Medical History Highlights section
  const bookAltText = "Open book icon representing medical history highlights section";

  return (
    <>
      
      <main className="dashboard">
        <Card2
          Headline="My Health Records"
          Textline="Access your comprehensive medical history, test results, and prescriptions."
        />
        

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

        <div className="containerRecord">
          <div className="Recordcontainer">
            <div className="Record-header">
              <img src={book} alt={bookAltText} />
              <p>Medical History Highlights</p>
            </div>

            <ul className="Record-list">
              <li className="Record-item">
                <span className="dot green"></span>
                Diagnosed with Type 2 Diabetes (2020)
              </li>
              <li className="Record-item">
                <span className="dot red"></span>
                Appendectomy surgery (2018)
              </li>
              <li className="Record-item">
                <span className="dot blue"></span>
                Allergy to Penicillin (Severe)
              </li>
              <li className="Record-item">
                <span className="dot brown"></span>
                Annual Physicals completed regularly
              </li>
            </ul>

            <Link to="/Activitylog" className="view-History">
              View Full Medical History &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer2 />
    </>
  );
}
export default MyRecordTest;
