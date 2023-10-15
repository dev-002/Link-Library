import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route } from "react-router-dom";

import AppRoutes from "./AppRoutes";
// Pages
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";
import HomePage from "./Pages/Home/Home";
import AboutPage from "./Pages/About/About";
import PublicCollectionsPage from "./Pages/PublicLibrary/PublicLibrary";
// Components
import Navbar from "./Component/Navbar";

function App() {
  const [cookie] = useCookies(["token"]);
  const [load, setLoad] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setLoad(true);
    if (!cookie.token) {
      setAuth(false);
      setLoad(false);
    } else {
      setAuth(true);
      setLoad(false);
    }
  }, [cookie]);

  if (load) {
    return (
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem", color: "white" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div key="app">
      {!auth ? (
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          {/* Public Routes */}
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/public" element={<PublicCollectionsPage />}></Route>
          </Route>
        </Routes>
      ) : (
        <div key="Protected Routes">
          <AppRoutes />
        </div>
      )}
    </div>
  );
}

export default App;
