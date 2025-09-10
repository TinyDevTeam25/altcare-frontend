import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the "Provider" component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 3. On initial load, check if user data exists in localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  // 4. Create login and logout functions to manage the user state and localStorage
  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  // 5. Provide the user data and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
