// import React from "react";
// import "./Top.css";
// import Card2 from "../Card2/Card2.jsx";

// // This component is now simple. It receives userName and isNewUser as props.
// // It no longer has its own state or useEffect.
// function Top({ userName, isNewUser }) {
//   // Determine the welcome message based on the prop.
//   const welcomeText = isNewUser ? "Welcome" : "Welcome back";

//   return (
//     <Card2
//       Headline={`${welcomeText}, ${userName}!`}
//       Textline="Your personalized health overview at a glance"
//     />
//   );
// }

// export default Top;
import React from "react";
import "./Top.css";
import Card2 from "../Card2/Card2.jsx";

// This component is now simple. It receives userName and isNewUser as props.
// It no longer has its own state or useEffect.
function Top({ userName, isNewUser }) {
  // Determine the welcome message based on the prop.
  const welcomeText = isNewUser ? "Welcome" : "Welcome back";
  const subText = isNewUser
    ? "Thanks for joining! Your personalized health overview is ready."
    : "Your personalized health overview at a glance.";

  return (
    <Card2
      Headline={`${welcomeText}, ${userName}!`}
      Textline={subText}
    />
  );
}

export default Top;
