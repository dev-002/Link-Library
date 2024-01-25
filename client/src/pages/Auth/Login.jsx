import React, { useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Icon from "./Sub-Component/Icon";
import { Auth } from "../../API_Endponits";
import RegisterComp from "./RegisterComp";

export default function Login() {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <div
        className="absolute top-5 left-6 text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <i className="fa-solid fa-house" />
      </div>

      {registerOpen ? (
        <RegisterComp
          setRegisterOpen={setRegisterOpen}
          setCookie={setCookie}
          navigate={navigate}
        />
      ) : (
        <LoginComp
          setRegisterOpen={setRegisterOpen}
          setCookie={setCookie}
          navigate={navigate}
        />
      )}
    </>
  );
}

const LoginComp = ({ setRegisterOpen, setCookie, navigate }) => {
  const [user, setUser] = useState({ usernameoremail: "", password: "" });
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleChange = (e) => {
    if (emailRef.current == "" || passwordRef.current == "") setDisabled(true);
    else setDisabled(false);
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
        console.log(response.data);
        setCookie("auth_token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        let response = error.response.data;
        console.log("Error: ", response.error);
        console.log(response.saveError.keyPattern);
      } else console.log("Error: ", error.message);
    }
  };

  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section>
        {/* <!-- Jumbotron --> */}
        <div className="px-4 py-5 md:px-5 text-center text-lg-start min-h-screen bg-[hsl(0, 0%, 96%)]">
          <div className="container">
            <div className="flex lg:mx-5 items-center py-[10%]">
              {/* Side Text */}
              <div className="lg:w-1/2 mb-5 lg:mb-0">
                <h1 className="my-5 text-lg font-bold ls-tight">
                  The best way <br />
                  <span className="text-primary">to Organize Online</span>
                </h1>
                <p className="text-[hsl(217, 10%, 50.8%)]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              {/* Form */}
              <div className="lg:w-fit mx-auto mb-5 lg:mb-0 border-2 border-secondary2 p-5">
                <div className="card">
                  <div className="card-body py-5 mx-auto">
                    <form>
                      {/* <!-- Email input --> */}
                      <div className="form-outline mb-4">
                        <input
                          ref={emailRef}
                          type="text"
                          name="usernameoremail"
                          id="usernameoremail"
                          value={user.usernameoremail}
                          onChange={(e) => handleChange(e)}
                          className="p-1 block border-b-2 border-black"
                          placeholder="Username or Email"
                        />
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4">
                        <input
                          ref={passwordRef}
                          type="password"
                          name="password"
                          id="password"
                          value={user.password}
                          onChange={(e) => handleChange(e)}
                          className="p-1 block border-b-2 border-black"
                          placeholder="Password"
                        />
                      </div>

                      {/* <!-- Submit button --> */}
                      <div className="mb-4">
                        <button
                          className={`${
                            disabled
                              ? "rounded pointer-events-none opacity-50"
                              : ""
                          } p-2 rounded bg-primary text-white text-lg mx-auto cursor-pointer`}
                          style={{ minWidth: "100%" }}
                          onClick={(e) => handleSubmit(e)}
                          disabled={disabled}
                        >
                          Login
                        </button>
                      </div>

                      <div className="mb-4 md:w-10/12 mx-auto text-lg">
                        Don't have an account?{" "}
                        <span
                          className="text-blue-400 cursor-pointer"
                          onClick={() => setRegisterOpen(true)}
                        >
                          Register
                        </span>
                      </div>

                      {/* <!-- Register Button Icons--> */}
                      <div className="text-center md:text-lg">
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
