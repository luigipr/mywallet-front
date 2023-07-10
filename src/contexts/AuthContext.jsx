import { createContext, useState } from "react";

const AuthContext = createContext();
//const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(persistedAuth);
  const [user, setUser] = useState("")

  function login(authData) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  return (
    <AuthContext.Provider value={{ auth, login, user, setUser, login}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
