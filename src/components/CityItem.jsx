import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/citiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, fetchCities } = useCities();
  const { cityName, emoji, date, _id, position } = city;

  async function deleteCity(e, cityID) {
    e.preventDefault();
    e.stopPropagation();
    let req = await fetch(
      `https://worldwise-production-0b53.up.railway.app/delete-city/${cityID}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let res = await req.json();

    if (!res.ok) {
      console.log("error here");
    }
    fetchCities();
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          _id === currentCity._id ? styles["cityItem--active"] : ""
        }`}
        to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button
          onClick={(e) => deleteCity(e, _id)}
          className={styles.deleteBtn}
        >
          x
        </button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  city: PropTypes.object,
};
export default CityItem;
