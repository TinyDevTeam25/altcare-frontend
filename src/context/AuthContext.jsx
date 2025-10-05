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
// import React, { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const storedUserData = localStorage.getItem("userData");
//       if (storedUserData) {
//         setUser(JSON.parse(storedUserData));
//       }
//     } catch (error) {
//       console.error("Failed to parse user data from localStorage", error);
//       localStorage.removeItem("userData");
//     } finally {
//       setLoading(false);
//     }
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
// import React, { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const storedUserData = localStorage.getItem("userData");
//       if (storedUserData) {
//         setUser(JSON.parse(storedUserData));
//       }
//     } catch (error) {
//       console.error("Failed to parse user data from localStorage", error);
//       localStorage.removeItem("userData");
//     } finally {
//       setLoading(false);
//     }
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
// AuthContext.jsx
// import React, { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("userData");
//       if (stored) {
//         setUser(JSON.parse(stored));
//       }
//     } catch (err) {
//       console.error("Failed to load user", err);
//       localStorage.removeItem("userData");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = (data) => {
//     if (!data?.token || !data?.patient) {
//       console.error("Invalid login data:", data);
//       return;
//     }

//     // standardize
//     const formattedUser = {
//       token: data.token,
//       profile: data.patient, // always keep in profile
//     };

//     localStorage.setItem("userData", JSON.stringify(formattedUser));
//     setUser(formattedUser);
//     console.log("User saved to context:", formattedUser);
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
import React, { createContext, useState, useEffect, useContext, useRef } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const SESSION_TIMEOUT_MINUTES = 2;
const WARNING_BEFORE_EXPIRY_MS = 1 * 60 * 1000; // 1 minute

function getExpiryTimestamp() {
  return Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000;
}

function getStoredUser() {
  try {
    const stored = localStorage.getItem("userData");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed.expiry || parsed.expiry < Date.now()) {
      localStorage.removeItem("userData");
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem("userData");
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const timeoutRef = useRef();
  const warningRef = useRef();

  const clearSessionTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
  };

  useEffect(() => {
    clearSessionTimers();
    setShowTimeoutWarning(false);

    if (user && user.expiry) {
      const timeLeft = user.expiry - Date.now();

      // Set warning timer
      if (timeLeft > WARNING_BEFORE_EXPIRY_MS) {
        warningRef.current = setTimeout(() => {
          setShowTimeoutWarning(true);
        }, timeLeft - WARNING_BEFORE_EXPIRY_MS);
      } else if (timeLeft > 0) {
        setShowTimeoutWarning(true);
      }

      // Set logout timer
      if (timeLeft > 0) {
        timeoutRef.current = setTimeout(() => {
          logout();
        }, timeLeft);
      } else {
        logout();
      }
    }
    return clearSessionTimers;
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const refreshSession = () => {
      setShowTimeoutWarning(false);
      const updatedUser = { ...user, expiry: getExpiryTimestamp() };
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);
    };
    events.forEach((event) => window.addEventListener(event, refreshSession));
    return () => events.forEach((event) => window.removeEventListener(event, refreshSession));

  }, [user]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (data) => {
    if (!data?.token || !data?.patient) {
      console.error("Invalid login data:", data);
      return;
    }
    const formattedUser = {
      token: data.token,
      profile: data.patient,
      expiry: getExpiryTimestamp(),
    };
    localStorage.setItem("userData", JSON.stringify(formattedUser));
    setUser(formattedUser);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setShowTimeoutWarning(false);
    clearSessionTimers();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, showTimeoutWarning }}>
      {children}
    </AuthContext.Provider>
  );
}