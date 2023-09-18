import React from "react";
import { Routes, Route } from "react-router-dom";
// Components
import Login from "./components/Auth/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
// PublicList Components
import PublicList from "./components/PublicList/PublicList";
import SpecificPublic from "./components/PublicList/SpecificPublic";
import Dashboard from "./components/Dashboard/Dashboard";
// UserList Components
import UserList from "./components/UserList/UserList";
import AddUserList from "./components/UserList/AddUserList";
import SpecificList from "./components/UserList/SpecificList";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Sidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/public" element={<PublicList />} />
          <Route path="/public/:categoryName" element={<SpecificPublic />} />
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/link" element={<UserList />} />
          <Route path="/link/createList" element={<AddUserList />} />
          <Route path="/link/:categoryName" element={<SpecificList />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
