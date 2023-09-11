import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AppRoutes from "./AppRoutes";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbar";

function App() {
  const [cookies] = useCookies(["token"]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (cookies.token) setAuth(true);
    else setAuth(false);
  });

  return (
    <>
      <Navbar />
      <div key="app">
        {!auth ? (
          <div key="login">
            <Login />
          </div>
        ) : (
          <div key="routes">
            <AppRoutes />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
