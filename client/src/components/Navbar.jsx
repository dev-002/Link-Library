import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="absolute navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid flex justify-between px-5">
          <a href="#">NavBar Logo</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/link"
                >
                  Public Library
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
