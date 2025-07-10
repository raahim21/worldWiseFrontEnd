import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const CitiesContext = createContext();

let BASE_URL = `https://worldwise-production-0b53.up.railway.app`;

function ProvideCities({ children }) {
  let [currentCity, setCurrentCity] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCities() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/cities/user-cities`, {
        credentials: "include", // include cookie,
        method: "GET",
      });
      const data = await res.json();

      setCities(data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);

      alert("There was an error");
    }
  }
  useEffect(function () {
    fetchCities();
  }, []);

  function getCity(id) {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/api/cities/${id}`, {
          credentials: "include",
          method: "GET",
        });
        const data = await res.json();
        setCurrentCity(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);

        alert("There was an error");
      }
    }
    fetchCities();
  }

  return (
    <CitiesContext.Provider
      value={{
        currentCity,
        cities,
        fetchCities,
        getCity,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a ProvideCities");
  return context;
}

ProvideCities.propTypes = {
  children: PropTypes.any,
};

export { ProvideCities, useCities };
