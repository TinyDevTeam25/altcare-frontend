import React, { useState, useEffect } from "react";
import "./Top.css";
import Card2 from "../Card2/Card2.jsx";
function Top() {
  const [name, setName] = useState("");
  const [welcomeText, setWelcomeText] = useState("Welcome");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser && storedUser.full_name) {
      setName(storedUser.full_name);
      setWelcomeText(storedUser.isNewUser ? "Welcome" : "Welcome back");
    }
  }, []);
  return (
    <Card2
      Headline={`${welcomeText}, ${name || "User"}!`}
      Textline="Your personalized health overview at a glance"
    />
  );
}
export default Top;
