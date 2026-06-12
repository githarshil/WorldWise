import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, loading, currentCity } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <ul className={`${styles.cityList} `}>
        <li>No cities yet</li>
      </ul>
    );
  return (
    <ul className={styles.cityList}>
      {Array.isArray(cities) &&
        cities.map((city) => <CityItem city={city} key={city.id} />)}
    </ul>
  );
}

export default CityList;
