// import React, { useContext, useState } from "react";
import { useContext, useState } from "react";
import AuthService from "../services/AuthService";
import { Context } from "../App";
// import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useContext(Context);
  const [user, setUser] = useContext(Context);

  const handleLogin = async () => {
    const res = await AuthService.login(email, password);
    localStorage.setItem("token", res.accessToken);
    console.log(res);
    setAuth(true);
    setUser(res.user);
    console.log(user);
  };

  const handleRegistration = async () => {
    const res = await AuthService.registration(email, password);
    localStorage.setItem("token", res.accessToken);
    console.log(res);
    setAuth(true);
    setUser(res.user);
  };

  const handleLogout = async () => {
    const res = await AuthService.logout();
    localStorage.removeItem("token");
    console.log(res);
    setAuth(false);
    setUser(null);
  };

  if (auth) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <p>{user.email} </p>
        <p>{user.id} </p>
        <p>{user.isActivated} </p>
      </div>
    );
  }

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegistration}>Registration</button>
    </div>
  );
};

export default LoginForm;
