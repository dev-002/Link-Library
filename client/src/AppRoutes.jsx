import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Link from "./components/LinkList/Link";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/link" element={<Link />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
