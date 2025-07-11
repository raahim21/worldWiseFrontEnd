import styles from "./Login.module.css";
import { useState } from "react";
import PageNav from "../components/PageNav";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  let [isFormLoading, setIsFormLoading] = useState(false);
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [passwordAgain, setPasswordAgain] = useState("qwerty");

  const navigate = useNavigate();
  async function handleSignUp(e) {
    e.preventDefault();

    try {
      setIsFormLoading(true);
      const res = await fetch(
        "https://worldwise-production-0b53.up.railway.app/api/auth/signup",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, passwordAgain }),
        }
      );
      const data = await res.json();
      setIsFormLoading(false);
      navigate("/login");
      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSignUp}>
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
          <label htmlFor="password-again">Re-enter Password</label>
          <input
            type="password"
            id="password-again"
            onChange={(e) => setPasswordAgain(e.target.value)}
            value={passwordAgain}
          />
        </div>

        <div>
          <Button type="primary">Sign up</Button>
        </div>
        {isFormLoading ? <Spinner /> : ""}
      </form>
    </main>
  );
}
