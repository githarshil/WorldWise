import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <Link to={"/HomePage"}>HomePage</Link>
      <Link to={"/Product"}>Products</Link>
      <Link to={"/Pricing"}>Pricing</Link>
    </div>
  );
}

export default NavBar;
