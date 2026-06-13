import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000/cities";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        alert("There was an error fetching the cities");
      } finally {
        setLoading(false);
      }
    }
    loadCities();
  }, []);
  const getCity = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
      alert("There was an error fetching the cities");
    } finally {
      setLoading(false);
    }
  }, []);
  const postCity = useCallback(async (newCity) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.error("Error fetching cities:", err);
      alert("There was an error fetching the cities");
    } finally {
      setLoading(false);
    }
  }, []);
  const deleteCity = useCallback(async (id) => {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      console.error("Error deleting city:", err);
      alert("There was an error deleting the city");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        setCurrentCity,
        getCity,
        postCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("contect is defined outside the provider");
  return context;
}
export { CitiesProvider, useCities };
