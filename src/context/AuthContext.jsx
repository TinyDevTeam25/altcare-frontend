import React, { createContext, useState, useEffect, useContext } from "react";

// The context is created here but is NOT exported directly.
const AuthContext = createContext(null);

// This is the clean way to use the context.
export const useAuth = () => {
  return useContext(AuthContext);
};

// The AuthProvider component is the single default export.
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 1. ADD a new 'loading' state. It starts as true.
  const [loading, setLoading] = useState(true);

  // On initial application load, check if user data exists in localStorage.
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem("userData");
    } finally {
      // 2. CRITICAL: After the check is complete (whether successful or not),
      //    set loading to false.
      setLoading(false);
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

  // 3. Provide the new 'loading' state to all child components.
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
