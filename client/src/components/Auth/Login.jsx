import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Register from "./Register";
import { Auth } from "../../../API";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: Auth.login,
        data: formData,
      });
      if (response.status === 200) {
        setCookies("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error Occured:", error, error.response);
    }
  };

  if (register) return <Register setRegister={setRegister} />;
  else
    return (
      <div className="container">
        {/* <!-- Section: Design Block --> */}
        <section className="text-center">
          {/* <!-- Background image --> */}
          <div
            className="p-5 bg-image"
            style={{
              backgroundImage:
                "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
              height: "40vh",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
            }}
          />

          <div
            className="card mx-4 mx-md-5 shadow-5-strong fs-4"
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className="card-body py-5 px-md-5">
              <div className="row d-flex justify-content-center">
                <div
                  className="position-absolute"
                  style={{
                    left: "-40%",
                  }}
                  onClick={() => navigate("/")}
                >
                  <i
                    className="fa fa-home me-3 p-2 rounded fs-2"
                    style={{ color: "#000000" }}
                  ></i>
                </div>
                <div className="col-lg-8">
                  <p className="fw-bold fs-1 mb-5">Login now</p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    {/* <!-- Email input --> */}

                    <div className="form-outline mb-4 d-flex justify-content-between">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        className="form-control w-75 border-1 border-black"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4 d-flex justify-content-between">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        className="form-control w-75 border-1 border-black"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    {/* <!-- Submit button --> */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block my-4 fs-4 w-lg-25"
                    >
                      Sign up
                    </button>

                    {/* <!-- Login Button --> */}
                    <div className="text-center h5">
                      <p>
                        New to Link-Library?{" "}
                        <a
                          href="#"
                          onClick={() => setRegister(true)}
                          className="text-primary"
                          style={{ textDecoration: "none" }}
                        >
                          Create an account
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Login;
