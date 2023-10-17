import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Pages
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";
import HomePage from "./Pages/Home/Home";
import FeaturesPage from "./Pages/Features/Features";
import AboutPage from "./Pages/About/About";
import PublicCollectionsPage from "./Pages/PublicLibrary/PublicLibrary";
import PublicCollectionListPage from "./Pages/PublicLibrary/PublicCollectionList";
// Protected Routes
import DashboardPage from "./Pages/Dashboard/Dashboard";
import PrivateCollectionsPage from "./Pages/PrivateLibrary/PrivateLibrary";
import PrivateCollectionListPage from "./Pages/PrivateLibrary/PrivateCollectionList";
import PrivateListCreatePage from "./Pages/PrivateLibrary/PrivateListCreate";
// Components
import Navbar from "./Component/Navbar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // States
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

  if (
    auth &&
    (location.pathname == "/auth/login" ||
      location.pathname == "/auth/register")
  ) {
    navigate("/");
  }

  return (
    <div key="app">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        {/* Public Routes */}
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/public" element={<PublicCollectionsPage />} />
          <Route
            path="/public/:collectionQuery"
            element={<PublicCollectionListPage />}
          />
          {auth && (
            <>
              <Route path="/protected/dashboard" element={<DashboardPage />} />
              <Route
                path="/protected/private"
                element={<PrivateCollectionsPage />}
              />
              <Route
                path="/protected/private/:collectionQuery"
                element={<PrivateCollectionListPage />}
              />
              {/* Create Private list route */}
              <Route
                path="/protected/private/create"
                element={<PrivateListCreatePage />}
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
