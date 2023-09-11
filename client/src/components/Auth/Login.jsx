import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="m-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="user[email]"
              id="email"
              className="d-block"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="m-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="user[password]"
              id="password"
              className="d-block"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="m-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
