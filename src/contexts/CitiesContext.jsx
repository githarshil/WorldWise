import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
};
const BASE_URL = "http://localhost:9000/cities";
function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, loading: true };
    }
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };

    case "city/loaded": {
      return { ...state, loading: false, currentCity: action.payload };
    }
    case "cities/created": {
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };
    }
    case "city/deleted": {
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    }
    case "error": {
      return { ...state, error: action.payload };
    }
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});
  // const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function loadCities() {
      try {
        dispatch({ type: "loading" });
        // setLoading(true);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        console.log(data);
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "error",
          payload: "there was an error fetching the cities",
        });
      }
    }
    loadCities();
  }, []);
  const getCity = useCallback(async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "error", payload: "cannot fetch the city" });
    }
  }, []);
  const postCity = useCallback(async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "there was an error creating this city",
      });
    }
  }, []);
  const deleteCity = useCallback(async (id) => {
    try {
      dispatch({ type: "loading" });

      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "error",
        payload: "there was an error deleting this city",
      });
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities: state.cities,
        loading: state.loading,
        currentCity: state.currentCity,
        CitiesProvider,
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
