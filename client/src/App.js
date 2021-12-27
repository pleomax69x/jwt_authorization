import { createContext, useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import AuthService from "./services/AuthService";

export const Context = createContext();
const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const res = await AuthService.checkAuth();
    localStorage.setItem("token", res.accessToken);
    setAuth(true);
    setUser(res.user);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  return (
    <>
      <Context.Provider value={([auth, setAuth], [user, setUser])}>
        {
          <h1>
            {auth ? `User ${user?.email} is Authorized` : "Need Authorization"}
          </h1>
        }
        <LoginForm />
      </Context.Provider>
    </>
  );
};

export default App;
