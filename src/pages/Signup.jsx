// import styles from "./Login.module.css";
// import { useState } from "react";
// import PageNav from "../components/PageNav";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Spinner from "../components/Spinner";

// export default function Login() {
//   // PRE-FILL FOR DEV PURPOSES
//   let [isFormLoading, setIsFormLoading] = useState(false);
//   const [email, setEmail] = useState("jack@example.com");
//   const [password, setPassword] = useState("qwerty");
//   const [passwordAgain, setPasswordAgain] = useState("qwerty");

//   const navigate = useNavigate();
//   async function handleSignUp(e) {
//     e.preventDefault();

//     try {
//       setIsFormLoading(true);
//       const res = await fetch(
//         "https://worldwise-production-0b53.up.railway.app/api/auth/signup",

//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password, passwordAgain }),
//         }
//       );
//       const data = await res.json();
//       setIsFormLoading(false);
//       navigate("/login");
//       if (!res.ok) {
//         throw new Error(data.message);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <main className={styles.login}>
//       <PageNav />

//       <form className={styles.form} onSubmit={handleSignUp}>
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
//           <label htmlFor="password-again">Re-enter Password</label>
//           <input
//             type="password"
//             id="password-again"
//             onChange={(e) => setPasswordAgain(e.target.value)}
//             value={passwordAgain}
//           />
//         </div>

//         <div>
//           <Button type="primary">Sign up</Button>
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

export default function Signup() {
  const { user, isLoading, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    console.log("HEY NEY NEY");
    console.log("HEY NEY NEY");
    console.log("HEY NEY NEY");

    toast.info("Toast debug test!");
  }, []);

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
      setPasswordAgain("qwerty");
    }
  }, []);

  async function handleSignUp(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password || !passwordAgain) {
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
    if (password !== passwordAgain) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsFormLoading(true);
      await signup(email, password);
      toast.success("Account created successfully!");
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
      <form className={styles.form} onSubmit={handleSignUp}>
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

        <div className={styles.row}>
          <label htmlFor="passwordAgain">Re-enter Password</label>
          <input
            type="password"
            id="passwordAgain"
            onChange={(e) => setPasswordAgain(e.target.value)}
            value={passwordAgain}
            disabled={isFormLoading}
          />
        </div>

        <div>
          <Button type="primary" disabled={isFormLoading}>
            {isFormLoading ? "Signing up..." : "Sign up"}
          </Button>
        </div>
        {isFormLoading && <Spinner />}
      </form>
    </main>
  );
}
