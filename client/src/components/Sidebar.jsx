import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Linkpath from "./Sidebar/Linkpath";
import { useCookies } from "react-cookie";
import { User } from "../API_Endponits";
import axios from "axios";

export default function Sidebar() {
  const [cookie, setCookie] = useCookies(["auth_token"]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();

  async function fetchUsername() {
    try {
      const response = await axios({
        method: "get",
        url: User.getUsername,
        withCredentials: true,
      });
      if (response.status === 200) {
        setUsername(response.data.username);
      }
    } catch (error) {
      setCookie("auth_token", "");
      setUsername();
      if (error.response) {
        let response = error.response.data;
        console.log("Error: ", response.message);
      } else console.log("Error: ", error.message);
    }
  }

  useEffect(() => {
    fetchUsername();
  }, [cookie]);

  return (
    <>
      {/* Hamburger */}
      <div
        // ${ !open && "hidden" }
        className={`absolute flex flex-col w-full items-center justify-between md:hidden`}
      >
        <button
          onClick={() => setOpen(!open)}
          id="navbarToggler"
          className={` ${
            open && "navbarTogglerActive"
          } absolute right-2 top-2 block rounded-lg px-3 py-[6px] ring-primary bg-primary focus:ring-2 lg:hidden z-[1]`}
        >
          <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary dark:bg-white"></span>
          <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary dark:bg-white"></span>
          <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary dark:bg-white"></span>
        </button>
        <nav
          id="navbarCollapse"
          className={`transition-all ease-in-out duration-300 absolute w-full rounded-t-none rounded-lg bg-secondary2 px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
            !open && "hidden"
          } `}
        >
          <ul className="block lg:hidden pt-6 text-lg">
            <ListItem NavLink="/">Home</ListItem>
            <ListItem NavLink="/about">About</ListItem>
            <ListItem NavLink="/public">Public Collection</ListItem>
            {cookie.auth_token && (
              <>
                <ListItem NavLink="/private">Collections</ListItem>
                <ListItem NavLink="/profile">Profile</ListItem>
              </>
            )}
            <ListItem NavLink="/contact">Contact</ListItem>
            <ListItem NavLink="/setting">Setting</ListItem>

            <li>
              <a
                href={"/auth"}
                className="flex py-2 text-xl font-bold hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
              >
                Log In
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar */}
      <div className="bg-primary md:flex flex-col w-[25%] h-screen px-4 py-8 overflow-auto border-r hidden">
        <h2 className="text-3xl font-semibold text-center text-secondary">
          {username ? "@" + username : "LinkStash"}
        </h2>
        <div className="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <Linkpath
                TO={"/"}
                name={"Home"}
                icon={<i className="fa-solid fa-house"></i>}
              />
              <Linkpath
                TO={"/about"}
                name={"About"}
                icon={<i className="fa-solid fa-address-card"></i>}
              />
              <Linkpath
                TO={"/public"}
                name={"Public Collections"}
                icon={<i className="fa-solid fa-book-open"></i>}
              />

              {cookie.auth_token && (
                <>
                  <Linkpath
                    TO={"/private"}
                    name={"Private Collections"}
                    icon={<i className="fa-solid fa-book"></i>}
                  />

                  <Linkpath
                    TO={"/dashboard"}
                    name={"Dashboard"}
                    icon={<i className="fa-solid fa-user"></i>}
                  />
                </>
              )}

              <Linkpath
                TO={"/contact"}
                name={"Contact"}
                icon={<i className="fa-solid fa-phone"></i>}
              />

              <Linkpath
                TO={"/setting"}
                name={"Setting"}
                icon={<i className="fa-solid fa-gear"></i>}
              />

              {!cookie.auth_token && (
                <>
                  <li className="my-3">
                    <Link
                      to={"/auth"}
                      type="button"
                      className="w-full cursor-pointer text-center rounded-md border border-text bg-secondary px-5 py-3 text-xl font-bold text-primary transition hover:bg-opacity-90"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li className="my-3">
                    <Link
                      to={"/auth"}
                      type="button"
                      className="w-full cursor-pointer text-center rounded-md border border-text bg-secondary px-5 py-3 text-xl font-bold text-primary transition hover:bg-opacity-90"
                    >
                      Log In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </aside>
        </div>
      </div>

      <div className="w-full md:h-screen md:p-4 p-0 mx-8 overflow-auto">
        <Outlet />
      </div>
    </>
  );
}

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li className="border-b-black border-b-2 w-full">
        <a
          href={NavLink}
          className="flex py-2 font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
