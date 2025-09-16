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
          `https://worldwise-production-0b53.up.railway.app/api/auth/getUser`,
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
      const res = await fetch(
        `https://worldwise-production-0b53.up.railway.app/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
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
      const res = await fetch(
        `https://worldwise-production-0b53.up.railway.app/api/auth/signup
`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
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
