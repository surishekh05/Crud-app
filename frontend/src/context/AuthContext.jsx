import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await API.get("/me");
      setUser(res.data);
    } catch {
      setLoading(false); // Always stop loading
    }
  };

  useEffect(() => {
     const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}



// import { createContext, useEffect, useState } from "react";
// import API from "../utils/api";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // <- NEW

//   // Load user if token exists
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     API.get("/auth/me")
//       .then((res) => setUser(res.data.user))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false)); // <- IMPORTANT
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
