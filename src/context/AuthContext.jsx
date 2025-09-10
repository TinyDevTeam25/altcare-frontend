import React, { createContext, useState, useEffect, useContext } from "react";

// The context is created here but is NOT exported directly.
const AuthContext = createContext(null);

// This is the new, clean way to use the context.
// Any component can import and call this custom hook.
export const useAuth = () => {
  return useContext(AuthContext);
};

// The AuthProvider component is now the single default export from this file.
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On initial application load, check if user data already exists in localStorage.
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem("userData");
    }
  }, []);

  // Function to handle logging in a user.
  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  // Function to handle logging out a user.
  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  // Provide the user data and the login/logout functions to all child components.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
