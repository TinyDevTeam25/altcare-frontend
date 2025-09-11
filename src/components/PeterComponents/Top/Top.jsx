import React from "react";
import "./Top.css";
import Card2 from "../Card2/Card2.jsx";

function Top({ userName, isNewUser }) {
  const welcomeText = isNewUser ? "Welcome" : "Welcome back";

  return (
    <Card2
      Headline={`${welcomeText}, ${userName || "User"}!`}
      Textline="Your personalized health overview at a glance"
    />
  );
}
export default Top;

//   const [welcomeText, setWelcomeText] = useState("Welcome");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("userData"));
//     if (storedUser && storedUser.full_name) {
//       setName(storedUser.full_name);
//       setWelcomeText(storedUser.isNewUser ? "Welcome" : "Welcome back");
//     }
//   }, []);
//   return (
//     <Card2
//       Headline={`${welcomeText}, ${name || "User"}!`}
//       Textline="Your personalized health overview at a glance"
//     />
//   );
// }
// export default Top;
