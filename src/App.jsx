import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import PageNotfound from "./pages/PageNotFound";
import { CitiesProvider } from "./contexts/CitiesContext";
// import City from "./components/City";
// import Countryitem from "./components/CountryItem";
// import NavBar from "./components/NavBar";

function App() {
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   async function loadCities() {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`${BASE_URL}`);
  //       const data = await res.json();
  //       console.log(data);
  //       setCities(data);
  //     } catch (err) {
  //       console.error("Error fetching cities:", err);
  //       alert("There was an error fetching the cities");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadCities();
  // }, []);
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountriesList />} />
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="*" element={<PageNotfound />}></Route>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
