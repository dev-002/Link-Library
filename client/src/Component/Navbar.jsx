import React from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";

const Navbar = () => {
  const [cookie] = useCookies(["token"]);

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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {/* Protected Routes */}
              {cookie.token && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link disabled"
                      href="/protected/dashboard"
                      aria-disabled="true"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link disabled"
                      href="/protected/collections"
                      aria-disabled="true"
                    >
                      Private Collections
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a className="nav-link" href="/public">
                  Public Collections
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About us
                </a>
              </li>
            </ul>
            <div className="d-flex me-4" role="Auth">
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
                    <a
                      className="dropdown-item mx-2 fw-bold"
                      href="/auth/login"
                    >
                      Loign
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item mx-2 fw-bold"
                      href="/auth/regiter"
                    >
                      Register
                    </a>
                  </li>
                </ul>
              </li>
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
