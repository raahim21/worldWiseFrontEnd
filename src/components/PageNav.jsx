import { NavLink, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Button from "./Button";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function PageNav() {
  const [isLogoutLoading, setisLogoutLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useAuth();

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <Logo />
        </ul>

        <div className={`${styles.list_items} ${styles.Hamburger_list_items}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>

          {isLoading ? (
            <Spinner />
          ) : !user ? (
            <>
              <li>
                <NavLink className={styles.ctaLink} to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.ctaLink} to="/signup">
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <Button
                type="primary"
                onClick={async () => {
                  setisLogoutLoading(true);
                  await fetch(
                    "https://worldwise-production-0b53.up.railway.app/api/auth/logout",
                    {
                      method: "POST",
                      credentials: "include",
                    }
                  );
                  setisLogoutLoading(false);
                  window.location.href = "/";
                }}
              >
                {isLogoutLoading ? <Spinner /> : "Logout"}
              </Button>
            </li>
          )}
        </div>

        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </nav>

      {isOpen && (
        <div className={`${styles.list_items}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>

          {isLoading ? (
            <Spinner />
          ) : !user ? (
            <>
              <li>
                <NavLink className={styles.ctaLink} to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.ctaLink} to="/signup">
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <Button
                type="primary"
                onClick={async () => {
                  setisLogoutLoading(true);
                  await fetch(
                    "https://worldwise-production-0b53.up.railway.app/api/auth/logout",
                    {
                      method: "POST",
                      credentials: "include",
                    }
                  );
                  setisLogoutLoading(false);
                  window.location.href = "/";
                }}
              >
                {isLogoutLoading ? <Spinner /> : "Logout"}
              </Button>
            </li>
          )}
        </div>
      )}
    </>
  );
}

export default PageNav;
