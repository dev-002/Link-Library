import React from "react";
import { useCookies } from "react-cookie";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Footer from "./Footer";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const handleLogout = (e) => {
    removeCookie("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid fs-4">
          <a className="navbar-brand fs-3 fw-bolder" href="#">
            LinkStash
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="/"> */}
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                {/* </a> */}
              </li>
              {/* Protected Routes */}
              {cookie.token && (
                <>
                  <li className="nav-item">
                    <NavLink to="/protected/dashboard" className="nav-link">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/protected/private" className="nav-link">
                      Private Collections
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/public" className="nav-link">
                  Public Collections
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About us
                </NavLink>
              </li>
            </ul>
            <div className="d-flex me-4" role="Auth">
              {cookie.token ? (
                <div className="fw-bold">
                  <i className="fa-solid fa-user me-2"></i> Admin
                  <i
                    className="fa-solid fa-arrow-right-from-bracket ms-5"
                    onClick={(e) => handleLogout(e)}
                  ></i>
                </div>
              ) : (
                <li className="navbar-nav nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Auth
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to="/auth/login"
                        className="dropdown-item mx-2 fw-bold"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink
                        to="/auth/regiter"
                        className="dropdown-item mx-2 fw-bold"
                      >
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Navbar;
