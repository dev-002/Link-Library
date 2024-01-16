import React, { useState } from "react";
import axios from "axios";
// API
import { Auth } from "../../API_Endponits";
// Sub Components
import Icon from "./Sub-Component/Icon";

export default function RegisterComp({ setRegisterOpen }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    if (e.target.name == "repeatPassword") {
      if (user.password === e.target.value) setDisabled(false);
      else setDisabled(true);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios({
        method: "post",
        url: Auth.login,
        data: user,
      });
      if (response.status === 200) navigate("/");
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section>
        {/* <!-- Jumbotron --> */}
        <div className="px-4 py-5 md:px-5 text-center lg:text-start bg-[hsl(0, 0%, 96%)] min-h-screen">
          <div className="container">
            <div className="flex lg:mx-5 items-center py-[10%]">
              {/* Form */}
              <div className="lg:w-fit mx-auto mb-5 lg:mb-0 p-5 border-2 border-secondary2 rounded">
                <div className="card max-w-full p-2">
                  <div className="card-body py-5 mx-auto">
                    <form>
                      <div className="row">
                        <div className="form-outline mb-4 md:w-10/12">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={user.username}
                            onChange={(e) => handleChange(e)}
                            className="form-control border-b-2 border-black"
                            placeholder="Username"
                          />
                        </div>
                      </div>

                      {/* <!-- Email input --> */}
                      <div className="form-outline mb-4 md:w-10/12">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={user.email}
                          onChange={(e) => handleChange(e)}
                          className="form-control border-b-2 border-black"
                          placeholder="Email Address"
                        />
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4 md:w-10/12">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={user.password}
                          onChange={(e) => handleChange(e)}
                          className="form-control border-b-2 border-black"
                          placeholder="Password"
                        />
                      </div>
                      {/* Repeat verify Password */}
                      <div className="form-outline mb-4 md:w-10/12">
                        <input
                          type="password"
                          name="repeatPassword"
                          id="repeatpassword"
                          value={user.repeatPassword}
                          onChange={(e) => handleChange(e)}
                          className="form-control border-b-2 border-black"
                          placeholder="Repeat Password"
                        />
                      </div>

                      {/* <!-- Submit button --> */}
                      <div className="mb-4">
                        <button
                          className={`${
                            disabled
                              ? "rounded pointer-events-none opacity-50"
                              : ""
                          } p-2 w-full rounded bg-primary text-white text-lg mx-auto cursor-pointer`}
                          onClick={(e) => handleSubmit(e)}
                          disabled={disabled}
                        >
                          Register
                        </button>
                      </div>

                      <div className="mb-4 md:w-10/12 mx-auto text-lg">
                        Already have an account?{" "}
                        <span
                          className="text-blue-400 cursor-pointer"
                          onClick={() => setRegisterOpen(false)}
                        >
                          Login
                        </span>
                      </div>

                      {/* <!-- Register Button Icons--> */}
                      <div className="text-center md:text-lg">
                        <p>
                          or <b>Register</b> with:
                        </p>
                        <Icon class={"fab fa-instagram"} />
                        <Icon class={"fab fa-google"} />
                        <Icon class={"fab fa-twitter"} />
                        <Icon class={"fab fa-github"} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Side Text */}
              <div className="lg:w-1/2 mb-5 lg:mb-0">
                <h1 className="my-5 text-lg font-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p className="text-[hsl(217, 10%, 50.8%)]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
