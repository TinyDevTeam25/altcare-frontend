import React from "react";
import PatientHeader from "../../components/headfoot/PatientHeader.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import MessagesHeader from "./MessagesHeader.jsx";
import MessageList from "./MessageList.jsx";
import "./SecureMessages.css";

function SecureMessagesPage() {
  return (
    <div className="patient-page-body">
      <main className="main-content-area">
        <MessagesHeader />
        <MessageList />
      </main>
      <Footer />
    </div>
  );
}

export default SecureMessagesPage;
