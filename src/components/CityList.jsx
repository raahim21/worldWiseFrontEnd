import PropTypes from "prop-types";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/citiesContext";

function CityList() {
  let { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) return <Message message="Add your city please" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((item, index) => {
        return <CityItem city={item} key={index} />;
      })}
    </ul>
  );
}

CityList.propTypes = {
  isLoading: PropTypes.bool,
  cities: PropTypes.array,
};

export default CityList;
