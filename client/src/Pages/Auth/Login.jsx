import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Icon from "./Sub-Component/Icon";
import { Auth } from "../../API_Endponits";

const Login = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [user, setUser] = useState({ usernameoremail: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: Auth.login,
        data: { email: user.usernameoremail, password: user.password },
      });
      if (response.status === 200) {
        setCookie("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section>
        {/* <!-- Jumbotron --> */}
        <div
          className="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)", minHeight: "100vh" }}
        >
          <div className="container">
            <div
              className="row gx-lg-5 align-items-center"
              style={{ padding: "10% 0" }}
            >
              {/* Side Text */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best way <br />
                  <span className="text-primary">to Organize Online</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              {/* Form */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 mx-auto">
                    <form>
                      {/* <!-- Email input --> */}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="usernameoremail"
                          id="usernameoremail"
                          value={user.usernameoremail}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="usernameoremail">
                          Username or Email
                        </label>
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={user.password}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      {/* <!-- Submit button --> */}
                      <div className="mb-4">
                        <button
                          className="btn btn-primary btn-block fs-5 mx-auto"
                          style={{ minWidth: "100%" }}
                          onClick={(e) => handleSubmit(e)}
                          disabled={
                            user.password === "" || user.usernameoremail === ""
                          }
                        >
                          Login
                        </button>
                      </div>

                      <div className="mb-4 col-md-10 text-center fs-5">
                        Don't have an account?{" "}
                        <a href="/auth/register">Register</a>
                      </div>

                      {/* <!-- Register Button Icons--> */}
                      <div className="text-center fs-md-4">
                        <p>
                          or <b>Login</b> with:
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
