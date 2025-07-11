import styles from "./Login.module.css";
import { useState } from "react";
import PageNav from "../components/PageNav";

import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function Login() {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { user, isLoading } = useAuth();
  let expression = isLoading ? "Loading..." : user;
  console.log(expression);

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setIsFormLoading(true);
      const res = await fetch(
        "https://worldwise-production-0b53.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      setIsFormLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Invalid email or password");
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
        {isFormLoading ? <Spinner /> : ""}
      </form>
    </main>
  );
}
