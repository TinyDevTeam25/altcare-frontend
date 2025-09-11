import React, { createContext, useState, useContext } from "react";

// 1. We need a way to get the initial state synchronously
const getInitialState = () => {
  try {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  } catch (error) {
    console.error("Failed to parse user data", error);
    localStorage.removeItem("userData");
    return null;
  }
};

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // 2. Initialize the state DIRECTLY with the data from localStorage
  const [user, setUser] = useState(getInitialState());

  // We no longer need the useEffect or the loading state for this problem.

  const login = (userData) => {
    // 3. When we log in, we update BOTH localStorage and the state
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
