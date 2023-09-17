import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import axios from "axios";
import { FetchUser } from "../../../API";

const Sidebar = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  const [user, setUser] = useState();

  const toggleSelect = (e) => {
    console.log(e);
  };

  const handleLogout = () => {
    removeCookies("token");
  };

  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: FetchUser,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("Fetching User:", error, error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className=" container-fluid " style={{ backgroundColor: "white" }}>
        <div className="row">
          <Navbar
            className="d-block d-sm-none border-1"
            expand="md"
            style={{
              border: "1px solid black",
            }}
          >
            <Container>
              <Navbar.Brand href="#home">Link Library</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/about">About Us</Nav.Link>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/link">User Library</Nav.Link>
                  <Nav.Link href="/public">Public Library</Nav.Link>

                  <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div
            className="d-none d-sm-block col-auto col-md-2 min-vh-100 d-flex flex-column"
            style={{ backgroundColor: "black" }}
          >
            <div className="mt-4">
              <a
                className="text-decolration-none text-white d-non d-sm-inline d-flex align-item-center  mt-4"
                style={{ textDecoration: "none" }}
              >
                <span className="ms-1 fs-4 d-none d-sm-inline text-white p-4 ">
                  <img
                    src="https://imgs.search.brave.com/EPsUi6c_Xvh25YkTXzchcYAltLRUVZofM4ufDE3Q9Fk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cm9zZWNpdHlzb2Z0/d2FyZS5jb20vaW1n/L2xzLXRpdGxlLmdp/Zg.jpeg"
                    alt="Logo"
                    className="rounded"
                  />
                </span>
              </a>
            </div>
            <div>
              <ul className="nav flex-column pt-4">
                {/* Home */}
                <li
                  className="nav-item text-light fs-4 p-1"
                  id="dashboard"
                  onClick={() => toggleSelect()}
                >
                  <Link
                    to="/"
                    className="nav-link text-light"
                    area-current="page"
                  >
                    <span className="ms-2 d-none d-sm-inline h5 text-light">
                      <i
                        className="fa fa-home me-3 bg-light p-2 rounded"
                        style={{ color: "#000000" }}
                      ></i>
                      Home
                    </span>
                  </Link>
                </li>

                {/* Dashboard */}
                <li
                  className="nav-item text-light fs-4 p-1"
                  id="dashboard"
                  onClick={() => toggleSelect()}
                >
                  <Link
                    to="/dashboard"
                    className="nav-link text-light"
                    area-current="page"
                  >
                    <span className="ms-2 d-none d-sm-inline h5 text-light">
                      <i
                        className="fa-solid fa-tachometer me-3 bg-light p-2 rounded"
                        style={{ color: "#000000" }}
                      ></i>
                      Dashboard
                    </span>
                  </Link>
                </li>

                {/* User Library */}
                <li
                  className="nav-item text-light fs-4 p-1"
                  id="userLibrary"
                  onClick={() => toggleSelect()}
                >
                  <Link
                    to="/link"
                    className="nav-link text-light"
                    area-current="page"
                  >
                    <span className="ms-2 d-none d-sm-inline h5 text-light">
                      <i
                        className="fa-solid fa-user me-3 bg-light p-2 rounded"
                        style={{ color: "#000000" }}
                      ></i>
                      User Library
                    </span>
                  </Link>
                </li>

                {/* Public Library */}
                <li
                  className="nav-item text-light fs-4 p-1"
                  id="publicLibrary"
                  onClick={() => toggleSelect()}
                >
                  <Link
                    to="/public"
                    className="nav-link text-light"
                    area-current="page"
                  >
                    <span className="ms-2 d-none d-sm-inline h5 text-light">
                      <i
                        className="fa-solid fa-list me-3 bg-light p-2 rounded"
                        style={{ color: "#000000" }}
                      ></i>
                      Public Library
                    </span>
                  </Link>
                </li>

                {/* About Us */}

                <li
                  className="nav-item text-light fs-4 p-1"
                  id="aboutUs"
                  onClick={() => toggleSelect()}
                >
                  <Link
                    to="/about"
                    className="nav-link text-light"
                    area-current="page"
                  >
                    <span className="ms-2 d-none d-sm-inline h5 text-light">
                      <i
                        className="fa-solid fa-info me-3 bg-light p-2 rounded fs-3xl"
                        style={{
                          color: "#000000",
                          minWidth: "2em",
                          textAlign: "center",
                        }}
                      ></i>
                      About Us
                    </span>
                  </Link>
                </li>

                {/* <ul className="col-md-6 nav flex-row flex-row-reverse pe-5 "> */}
                <li className="d-none d-sm-block nav-items text-light fs-4 pt-5 pb-3 ps-5 ">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg border-2 px-5"
                    style={{
                      border: "black solid ",
                      borderColor: "white",
                    }}
                    onClick={() => handleLogout()}
                  >
                    <p className="h5 " style={{ color: "white" }}>
                      Logout
                    </p>
                  </button>
                </li>
                {/* </ul> */}
              </ul>
            </div>
          </div>
          <div
            className="col-md-10 "
            style={{
              backgroundImage: "",
            }}
          >
            <div>
              <ul className="col-lg-6 nav pt-2">
                <li className="nav-items text-dark fs-4 pt-5 pb-3 ps-5 d-flex align-items-center justify-content-center">
                  <Link className="navbar-brand">
                    <img
                      src="https://www.pngitem.com/pimgs/m/24-248309_transparent-profile-clipart-font-awesome-user-circle-hd.png"
                      width="35"
                      height="35"
                      className="d-inline-block align-top rounded-circle m-1 me-3"
                      alt=""
                    />
                    {/* Hi, {!loading && data ? data.username : "Admin"} */}
                    Hi, {user ? user.name.split(" ")[0] : "User"}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="w-100 h-75">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
