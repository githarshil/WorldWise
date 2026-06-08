// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
// import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Product" element={<Product />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
