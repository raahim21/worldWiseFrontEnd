import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/citiesContext";

function CountriesList() {
  let { isLoading, cities } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) return <Message message="Add your city please" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((item, index) => {
        return <CountryItem country={item} key={index} />;
      })}
    </ul>
  );
}

CountriesList.propTypes = {
  isLoading: PropTypes.bool,
  cities: PropTypes.array,
};

export default CountriesList;
