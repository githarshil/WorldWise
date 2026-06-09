// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
// import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Product" element={<Product />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
