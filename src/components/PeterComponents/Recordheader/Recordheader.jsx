import React from 'react'
import { Link } from "react-router";
import "./Recordheader.css"
function Recordheader() {
  return (
    <section className="ls">
      <ul>
        <li>
          <Link
            to="/patient/MyRecordTest/MyRecordTest"
            className="title-record"
          >
            All records
          </Link>
        </li>
        <li>
          <Link to="/patient/TestResult/result">Test Result</Link>
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
  );
}
export default Recordheader;