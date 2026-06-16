import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const state = {
  User: null,
  IsAuthenticated: false,
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reducer(state, action) {
  switch (action.type) {
    case "login": {
      return { ...state, User: action.payload, IsAuthenticated: true };
    }
    case "logout": {
      return {
        ...state,
        User: null,
        IsAuthenticated: false,
      };
    }
    default:
      throw new Error("unknown type ");
  }
}
function AuthProvider({ children }) {
  const [{ User, IsAuthenticated }, dispatch] = useReducer(reducer, state);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user: User, IsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the Auth Provider");
  return context;
}
export { AuthProvider, useAuth };
