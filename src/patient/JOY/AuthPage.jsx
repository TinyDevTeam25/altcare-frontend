import React, { useState } from "react";
import SignInForm from "./SignIn.jsx";
import SignUpForm from "./SignUp.jsx";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      {isSignIn ? (
         <SignInForm
          formData={signInData}
          setFormData={setSignInData}
          switchToSignUp={() => setIsSignIn(false)}
        />
      ) : (
        <SignUpForm
          formData={signUpData}
          setFormData={setSignUpData}
          switchToSignIn={() => setIsSignIn(true)}
        />
      )}
    </div>
  );
}