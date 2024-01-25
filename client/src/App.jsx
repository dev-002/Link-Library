import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/Auth/Login";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import PublicCollections from "./pages/Public Collections/PublicCollections";
import PubilcList from "./pages/Public Collections/PublicList";
import PrivateCollections from "./pages/Private Collections/PrivateCollection";
import PrivateList from "./pages/Private Collections/PrivateList";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Settings";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

const App = () => {
  const [cookie] = useCookies(["auth_token"]);

  return (
    <>
      <div className="flex overflow-hidden">
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/public" element={<PublicCollections />} />
            <Route path="/public/:collectionQuery" element={<PubilcList />} />
            {cookie.auth_token && (
              <>
                <Route path="/private" element={<PrivateCollections />} />
                <Route
                  path="/private/:collectionQuery"
                  element={<PrivateList />}
                />

                <Route path="/dashboard" element={<Dashboard />} />
              </>
            )}
            <Route path="/setting" element={<Setting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/error/*" element={<Error />} />
          </Route>
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
