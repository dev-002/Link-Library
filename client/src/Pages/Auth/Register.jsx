import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import { Auth } from "../../API_Endponits";
// Sub Components
import Icon from "./Sub-Component/Icon";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    // try {
    //   const response = await axios({
    //     method: "post",
    //     url: Auth.login,
    //     data: user,
    //   });
    //   if (response.status === 200) navigate("/");
    // } catch (error) {
    //   console.log("Error: " + error.message);
    // }
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
              {/* Form */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card" style={{ maxWidth: "70%" }}>
                  <div className="card-body py-5 px-md-5">
                    <form>
                      <div className="row">
                        <div className="form-outline mb-4 col-md-10">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={user.username}
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="username">
                            Username
                          </label>
                        </div>
                      </div>

                      {/* <!-- Email input --> */}
                      <div className="form-outline mb-4 col-md-10">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={user.email}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4 col-md-10">
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
                      {/* Repeat verify Password */}
                      <div className="form-outline mb-4 col-md-10">
                        <input
                          type="password"
                          name="password"
                          id="repeatpassword"
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="repeatpassword">
                          Repeat Password
                        </label>
                      </div>

                      {/* <!-- Submit button --> */}
                      <div className="mb-4">
                        <button
                          className="btn btn-primary btn-block fs-5"
                          style={{ minWidth: "90%" }}
                          onClick={(e) => handleSubmit(e)}
                          disabled={user.password !== repeatPassword}
                        >
                          Register
                        </button>
                      </div>

                      <div className="mb-4 col-md-10 text-center">
                        Already have an account? <a href="/auth/login">Login</a>
                      </div>

                      {/* <!-- Register Button Icons--> */}
                      <div className="text-center fs-md-4">
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
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
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
};

export default Register;
