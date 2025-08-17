import React, { useState } from "react";
import SignInForm from "./SignIn.jsx";
import SignUpForm from "./SignUp.jsx";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      {isSignIn ? (
        <SignInForm switchToSignUp={() => setIsSignIn(false)} />
      ) : (
        <SignUpForm switchToSignIn={() => setIsSignIn(true)} />
      )}
    </div>
  );
}