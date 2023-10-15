import React from "react";
// Components
import FeatureSection from "./Components/FeatureSection";

const Home = () => {
  return (
    <>
      {/* First Intro Section */}
      <section>
        <div
          className="mh-100"
          style={{
            color: "white",
            minHeight: "90vh",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80')",
          }}
        >
          <div
            className="text-center mx-auto"
            style={{ paddingTop: "15%", maxWidth: "60%" }}
          >
            <div>
              <h2 className="display-2 fw-bold mb-5">LinkStash</h2>
              <p className="fs-4 mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt, cupiditate ducimus enim esse sunt culpa. Dolorem
                quisquam recusandae, unde, labore quo consequuntur nesciunt
                officiis dignissimos, sint nobis provident possimus. Ex!
              </p>
            </div>
            <button
              className="btn rounded fs-5 border border-2 p-3"
              style={{ color: "white", minWidth: "30%", borderRadius: "100px" }}
            >
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="my-5 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="text-center fs-1 fw-bolder mb-2">Features</div>
        <hr
          className="mx-auto my-4"
          style={{
            maxWidth: "80%",
          }}
        />
        <div className="d-flex row">
          <FeatureSection />
        </div>
      </section>

      {/* Meet The Developer */}
      <section className="my-5">
        <div className="fs-1 fw-bolder mb-4 text-center">
          Meet The Developer
        </div>
      </section>

      {/* Contact Form */}
      <p className="fs-1 fw-bolder text-center mb-4">Contact Us</p>
      <section
        className="my-5"
        style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "white" }}
      >
        <div className="container">
          <div className="row">
            <form className="col-md-6" style={{ maxWidth: "40%" }}>
              <div className="my-4">
                <label htmlFor="email" className="form-label">
                  Email:{" "}
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>

              <div className="my-4">
                <label htmlFor="subject" className="form-label">
                  Subject:{" "}
                </label>
                <br />
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="form-control"
                />
              </div>

              <div className="my-4">
                <label htmlFor="message" className="form-label">
                  Message:{" "}
                </label>
                <br />
                <textarea
                  name="message"
                  id="message"
                  rows={8}
                  cols={24}
                  style={{ resize: "none" }}
                  className="form-control"
                ></textarea>
              </div>
            </form>
            <div
              className="col-md-6 text-center ms-5"
              style={{
                backgroundImage:
                  "url('https://media.gettyimages.com/id/1383529600/photo/contact-us-symbol-on-paper-note.jpg?s=612x612&w=0&k=20&c=F4gzQj-HvB6C7CDmRxK_znvNjt0kxLo5T66JAWGcraY=')",
                backgroundSize: "contain",
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
