import { React, useState } from "react";

const Footer = () => {
  const [subscribeEmail, setSubscribe] = useState("");

  const handleChange = (e) => {
    setSubscribe(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(subscribeEmail);
  };

  return (
    <>
      {/* <!-- Remove the container if you want to extend the Footer to full width. --> */}
      <div className="mt-5">
        <footer className="bg-dark text-center text-white">
          {/* <!-- Grid container --> */}
          <div className="container p-4 pb-0">
            {/* <!-- Section: Social media --> */}
            <section className="mb-4">
              {/* <!-- Twitter --> */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              {/* <!-- Instagram --> */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* <!-- Linkedin --> */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              {/* <!-- Github --> */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
            </section>
            {/* <!-- Section: Social media --> */}
          </div>
          {/* <!-- Grid container --> */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row d-flex justify-content-center fs-5">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for newsletter</strong>
                </p>
              </div>
              <div className="col-md-5 col-10">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example2"
                    className="form-control"
                    placeholder="email"
                    value={subscribeEmail}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>

          {/* <!-- Copyright --> */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright:
            <a className="text-white" href="#">
              Devansh.dev-002
            </a>
          </div>
          {/* <!-- Copyright --> */}
        </footer>
      </div>
      {/* <!-- End of .container --> */}
    </>
  );
};

export default Footer;
