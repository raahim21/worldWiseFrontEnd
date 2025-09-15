// import { useState, useEffect, useContext, createContext } from "react";
// import PropTypes from "prop-types";
// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(function () {
//     async function fetchUser() {
//       try {
//         let res = await fetch(
//           "https://worldwise-production-0b53.up.railway.app/api/auth/getUser",
//           {
//             credentials: "include",
//           }
//         );
//         if (!res.ok) {
//           throw new Error("Not authenticated!");
//         }
//         let data = await res.json();
//         setUser(data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// AuthProvider.propTypes = {
//   children: PropTypes.any,
// };

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/getUser`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setUser(data.user || { email });
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setUser(data.user || { email });
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, error, login, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
