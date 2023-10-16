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
            minHeight: "110vh",
            backgroundImage: "url('./resources/Home_header.avif')",
          }}
        >
          <div
            className="text-center mx-auto"
            style={{ paddingTop: "15%", maxWidth: "60%" }}
          >
            <div>
              <h2 className="display-2 fw-bold mb-5">LinkStash</h2>
              <p
                className="fs-4 mb-5"
                style={{ fontFamily: "'Young Serif', serif" }}
              >
                "LinkStash is your personal web link organizer, simplifying link
                management with ease. <br />
                <br />
                Organize, share, and rediscover your web links like never
                before."
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

      {/* Our Aim */}
      <section className="container my-5">
        <div className="fs-4">
          <p className="display-3 fw-bold">Our Aim</p>
          <p>
            {" "}
            LinkStash is your ultimate solution for tidying up your digital
            life. This platform provides a streamlined approach to organizing,
            managing, and sharing web links. Say goodbye to cluttered bookmarks
            and hello to a user-friendly system that allows you to categorize,
            customize privacy settings, and curate your online resources with
            ease. It's perfect for individuals, researchers, and teams seeking
            an efficient way to stay organized and share valuable web links.
            <br />
            <br />
            Join LinkStash today to embark on a journey of seamless link
            management. With LinkStash, you'll effortlessly organize your online
            world and simplify your web interactions. Discover the joy of
            intelligent link sharing and take control of your digital life.
          </p>
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
            <form className="col-md-6 ps-5" style={{ maxWidth: "80%" }}>
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
                backgroundImage: "url('./resources/Home_contact.jpg')",
                backgroundSize: "contain",
                maxWidth: "40%",
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
