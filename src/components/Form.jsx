// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import { useCities } from "../contexts/citiesContext";

export function convertToEmoji(countryCode) {
  if (!countryCode) return;
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

let BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [date, setDate] = useState(new Date());
  let { fetchCities } = useCities();
  const [notes, setNotes] = useState("");

  let city = {
    cityName,
    country,
    emoji,
    position: {
      lat: mapLat,
      lng: mapLng,
    },
    date,
    notes,
  };

  function resetFormState() {
    setCityName("");
    setCountry("");
    setEmoji("");
    setNotes("");
  }
  async function handleSubmit(e, city) {
    e.preventDefault();
    setIsFormLoading(true);
    let req = await fetch(
      // change
      `https://worldwise-production-0b53.up.railway.app/api/cities/`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      }
    );

    let res = await req.json();

    if (res) {
      toast.success("City Added!");

      resetFormState();
      setIsFormLoading(false);

      fetchCities();
    } else {
      toast.error("Unable to Add City!");
    }
  }
  useEffect(
    function () {
      if (!mapLat && !mapLng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );

          const data = await res.json();
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          let emoji = convertToEmoji(data.countryCode || null);
          setEmoji(emoji);
        } catch {
          console.log("hi");
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [mapLat, mapLng]
  );

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, city)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add </Button>
        <BackButton />
        {isFormLoading || isLoadingGeocoding ? <Spinner /> : ""}
      </div>
    </form>
  );
}

export default Form;

// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Button from "./Button";
// import BackButton from "./BackButton";
// import Spinner from "./Spinner";
// import styles from "./Form.module.css";
// import { useCities } from "../contexts/citiesContext";
// import useUrlPosition from "../hooks/useUrlPosition";

// export function convertToEmoji(countryCode) {
//   if (!countryCode) return "";
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

// function Form() {
//   const [cityName, setCityName] = useState("");
//   const [country, setCountry] = useState("");
//   const [emoji, setEmoji] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [notes, setNotes] = useState("");
//   const [isFormLoading, setIsFormLoading] = useState(false);
//   const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
//   const [mapLat, mapLng] = useUrlPosition();
//   const { createCity } = useCities();

//   const city = {
//     cityName,
//     country,
//     emoji,
//     position: { lat: mapLat, lng: mapLng },
//     date,
//     notes,
//   };

//   function resetFormState() {
//     setCityName("");
//     setCountry("");
//     setEmoji("");
//     setNotes("");
//     setDate(new Date());
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!cityName || !country) {
//       toast.error("Please provide city name and country");
//       return;
//     }
//     if (!mapLat || !mapLng) {
//       toast.error("Please select a location on the map");
//       return;
//     }

//     try {
//       setIsFormLoading(true);
//       await createCity(city);
//       toast.success("City added successfully!");
//       resetFormState();
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsFormLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (!mapLat || !mapLng) return;

//     async function fetchCityData() {
//       try {
//         setIsLoadingGeocoding(true);
//         const res = await fetch(
//           `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
//         );
//         if (!res.ok) throw new Error("Failed to fetch city data");
//         const data = await res.json();
//         if (!data.countryCode)
//           throw new Error("Invalid location. Please select a valid city.");
//         setCityName(data.city || data.locality || "");
//         setCountry(data.countryName);
//         setEmoji(convertToEmoji(data.countryCode));
//       } catch (err) {
//         toast.error(err.message);
//       } finally {
//         setIsLoadingGeocoding(false);
//       }
//     }
//     fetchCityData();
//   }, [mapLat, mapLng]);

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <div className={styles.row}>
//         <label htmlFor="cityName">City name</label>
//         <input
//           id="cityName"
//           onChange={(e) => setCityName(e.target.value)}
//           value={cityName}
//           disabled={isFormLoading || isLoadingGeocoding}
//         />
//         <span className={styles.flag}>{emoji}</span>
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="date">
//           When did you go to {cityName || "this city"}?
//         </label>
//         <DatePicker
//           id="date"
//           onChange={(date) => setDate(date)}
//           selected={date}
//           dateFormat="dd/MM/yyyy"
//           maxDate={new Date()} // Prevent future dates
//           placeholderText="Select a date"
//           disabled={isFormLoading || isLoadingGeocoding}
//         />
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="notes">
//           Notes about your trip to {cityName || "this city"}
//         </label>
//         <textarea
//           id="notes"
//           onChange={(e) => setNotes(e.target.value)}
//           value={notes}
//           disabled={isFormLoading || isLoadingGeocoding}
//         />
//       </div>

//       <div className={styles.buttons}>
//         <Button type="primary" disabled={isFormLoading || isLoadingGeocoding}>
//           {isFormLoading ? "Adding..." : "Add"}
//         </Button>
//         <BackButton />
//         {(isFormLoading || isLoadingGeocoding) && <Spinner />}
//       </div>
//     </form>
//   );
// }

// export default Form;
