import React from "react";
// Header and Footer imports are now completely gone
import MessagesHeader from "./MessagesHeader.jsx";
import MessageList from "./MessageList.jsx";
import "./SecureMessages.css";

function SecureMessagesPage() {
  // The component now returns ONLY the <main> content.
  // The wrapper div has been removed.
  return (
    <main className="main-content-area">
      <MessagesHeader />
      <MessageList />
    </main>
  );
}

export default SecureMessagesPage;
