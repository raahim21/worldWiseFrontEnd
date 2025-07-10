import { useState } from "react";
import styles from "./Hamburger.module.css"; // if using plain CSS
import Proptypes from "prop-types";

export default function Hamburger({ onClick }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <div
      className={`${styles.hamburger} ${isOpen ? "open" : ""}`}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

Hamburger.propTypes = {
  onClick: Proptypes.any,
};
