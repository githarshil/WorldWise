// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import useUrlPosition from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  if (!countryCode) return "";

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { postCity } = useCities();
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [GeoLoading, setGeoLoading] = useState(false);
  // const [emoji, setemoji] = useState();

  useEffect(() => {
    async function fetchCityData() {
      if (!lat || !lng) return <Message message="No lat/lng" />;

      try {
        setGeoLoading(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { "Accept-Language": "en" } },
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        console.log(data);

        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.hamlet ||
          "";
        const country = data.address?.country || "";
        // const countryCode = data.address?.country_code?.toUpperCase() || "";

        setCityName(city);
        setCountry(country);
        // setemoji(convertToEmoji(countryCode));
      } catch (error) {
        console.error("Not able to reverse geocode", error);
      } finally {
        setGeoLoading(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);
  function OnSubmitHandle(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      // emoji,
      date,
      notes,
      position: { lat, lng },
    };
    postCity(newCity);
  }

  return (
    <form className={styles.form} onSubmit={OnSubmitHandle}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd / MM / yy"
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
        <button>Add</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Form;
