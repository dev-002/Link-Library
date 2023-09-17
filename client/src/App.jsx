import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AppRoutes from "./AppRoutes";
import Login from "./components/Auth/Login";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [cookies] = useCookies(["token"]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (cookies.token) setAuth(true);
    else setAuth(false);
  });

  return <>{!auth ? <Login /> : <AppRoutes />}</>;
}

export default App;
