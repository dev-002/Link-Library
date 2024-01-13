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
import Profile from "./pages/Profile";
import Setting from "./pages/Settings";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

const App = () => {
  const [auth] = useCookies(["auth_token"]);

  return (
    <>
      <div className="flex overflow-hidden">
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/public" element={<PublicCollections />} />
            <Route path="/public/:collectionQuery" element={<PubilcList />} />
            {auth.auth_token && (
              <>
                <Route path="/private" element={<PrivateCollections />} />
                <Route
                  path="/private/:collectionQuery"
                  element={<PrivateList />}
                />

                <Route path="/profile" element={<Profile />} />
              </>
            )}
            <Route path="/setting" element={<Setting />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/auth" element={<Login />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
