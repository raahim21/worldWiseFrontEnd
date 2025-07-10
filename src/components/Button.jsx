import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, type, onClick }) {
  return (
    <button
      type=""
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.any,
  onClick: PropTypes.any,
};
export default Button;
