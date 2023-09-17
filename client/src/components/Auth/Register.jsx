import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Auth } from "../../../API";

const Register = ({ setRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [cookies, setCookies] = useCookies(["token"]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: Auth.register,
        data: formData,
      });
      console.log("Logged In:", response);
      if (response.status === 201) {
        setCookies("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error Occured:", error, error.response);
    }
  };

  return (
    <>
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
                <div className="col-lg-8">
                  <p className="fw-bold fs-1 mb-5">Create an Account</p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    {/*UserName */}
                    <div className="form-outline mb-4 d-flex justify-content-between">
                      <label htmlFor="name" className="form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        className="form-control w-75 border-1 border-black"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

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
                        Have an Account?{" "}
                        <a
                          href="#"
                          onClick={() => setRegister(false)}
                          className="text-primary"
                          style={{ textDecoration: "none" }}
                        >
                          Login
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
    </>
  );
};

export default Register;
