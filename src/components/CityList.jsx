import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";

function CityList({ cities, loading }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <ul className={styles.cityList}>
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
