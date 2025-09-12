// import React, { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// // Initialize state directly from localStorage for immediate access
// const getInitialState = () => {
//   try {
//     const storedUserData = localStorage.getItem("userData");
//     return storedUserData ? JSON.parse(storedUserData) : null;
//   } catch (error) {
//     console.error("Failed to parse user data", error);
//     return null;
//   }
// };

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(getInitialState());
//   const [loading, setLoading] = useState(true); // Still useful for initial load

//   useEffect(() => {
//     // This effect's only job is to turn off the loading flag
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("userData", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("userData");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
