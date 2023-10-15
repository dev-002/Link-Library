import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import DashboardPage from "./Pages/Dashboard/Dashboard";
import UserList from "./Pages/PrivateLibrary/PrivateLibrary";
// Components
import Navbar from "./Component/Navbar";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
