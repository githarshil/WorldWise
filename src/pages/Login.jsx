import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Pagenav from "../components/Pagenav";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { IsAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
    console.log("submitted", email, password);
  }
  useEffect(() => {
    if (IsAuthenticated === true) navigate(`/app`, { replace: true });
    console.log(IsAuthenticated);
  }, [IsAuthenticated, navigate]);
  return (
    <>
      <Pagenav />
      <main className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <button>Login</button>
          </div>
        </form>
      </main>
    </>
  );
}
