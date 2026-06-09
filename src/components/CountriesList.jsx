import styles from "./CountryList.module.css";
// import CityItem from "./CityItem";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import _ from "lodash";

function CountriesList({ cities, loading }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <ul className={styles.countryList}>
        <li>No cities yet</li>
      </ul>
    );
  const countries = _.uniqBy(cities, "country");
  return (
    <ul className={styles.countryList}>
      {Array.isArray(countries) &&
        countries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))}
    </ul>
  );
}

export default CountriesList;
