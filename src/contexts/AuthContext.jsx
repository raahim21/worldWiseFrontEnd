import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchUser() {
      try {
        let res = await fetch(
          "https://worldwise-production-0b53.up.railway.app/getUser",
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Not authenticated!");
        }
        let data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export function useAuth() {
  return useContext(AuthContext);
}
