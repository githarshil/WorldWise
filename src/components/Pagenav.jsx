import { NavLink } from "react-router-dom";
import styles from "./../components/PageNav.module.css";
import Logo from "./Logo";
function Pagenav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/HomePage">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctalink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Pagenav;
