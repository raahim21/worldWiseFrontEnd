// import styles from "./Login.module.css";
// import { useState } from "react";
// import PageNav from "../components/PageNav";

// import Spinner from "../components/Spinner";
// import { useAuth } from "../contexts/AuthContext";
// import Button from "../components/Button";

// export default function Login() {
//   const [isFormLoading, setIsFormLoading] = useState(false);
//   const { user, isLoading } = useAuth();
//   let expression = isLoading ? "Loading..." : user;
//   console.log(expression);

//   // PRE-FILL FOR DEV PURPOSES
//   const [email, setEmail] = useState("jack@example.com");
//   const [password, setPassword] = useState("qwerty");

//   async function handleLogin(e) {
//     e.preventDefault();

//     try {
//       setIsFormLoading(true);
//       const res = await fetch(
//         "https://worldwise-production-0b53.up.railway.app/api/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }
//       setIsFormLoading(false);
//       window.location.href = "/";
//     } catch (err) {
//       console.error("Login failed:", err.message);
//       alert("Invalid email or password");
//     }
//   }

//   return (
//     <main className={styles.login}>
//       <PageNav />

//       <form className={styles.form} onSubmit={handleLogin}>
//         <div className={styles.row}>
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             id="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
//         </div>

//         <div className={styles.row}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//         </div>

//         <div>
//           <Button type="primary">Login</Button>
//         </div>
//         {isFormLoading ? <Spinner /> : ""}
//       </form>
//     </main>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { user, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/app", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Pre-fill for dev only
  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV !== "production") {
      setEmail("jack@example.com");
      setPassword("qwerty");
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setIsFormLoading(true);
      await login(email, password);
      toast.success("Login successful!");
      navigate("/app", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsFormLoading(false);
    }
  }

  if (isLoading) return <Spinner />;

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
            disabled={isFormLoading}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isFormLoading}
          />
        </div>

        <div>
          <Button type="primary" disabled={isFormLoading}>
            {isFormLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        {isFormLoading && <Spinner />}
      </form>
    </main>
  );
}
