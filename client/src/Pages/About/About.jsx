import React from "react";

const About = () => {
  return (
    <>
      <div className="container my-5 mvh-100">
        <section className="row d-flex">
          <div className="col-md-6 py-5">
            <p
              className="display-4 fw-bolder py-4"
              style={{ fontFamily: "'Young Serif', serif" }}
            >
              "The need to Organize"
            </p>
            <p className="fs-4">
              <strong>Our Mission</strong> <br /> At LinkStash, our mission is
              to simplify your online life by providing a versatile web
              application that lets you efficiently manage, categorize, and
              share your favorite web links while ensuring your data's privacy.
            </p>
          </div>
          <div className="col-md-6 py-5 d-none d-md-block">
            <img
              src="./resources/About_vector.jpg"
              alt="About Us Vector"
              style={{ maxWidth: "80%", margin: "auto" }}
            />
          </div>
        </section>

        {/* Community And Story */}
        <section className="fs-4 py-4">
          <div className="row d-flex" style={{ minHeight: "max-content" }}>
            <div className="col-md-6 py-2">
              <strong>Our Community</strong> <br />
              We serve a diverse community of internet users, from students and
              professionals to researchers and hobbyists. Anyone who values an
              organized online experience can benefit from LinkStash.
              <br />
            </div>
            <div className="col-md-6 d-none d-md-block">
              <strong>Our Story</strong> <br />
              LinkStash started as a passion project by a group of tech
              enthusiasts who shared a common frustration - managing and
              organizing web links. Inspired by this challenge, we set out to
              create a solution that would make life easier for internet users.
              What began as a side project quickly evolved into LinkStash, the
              versatile web application you see today.
            </div>
          </div>
        </section>
      </div>
      {/* Call to Action */}
      <section
        className="text-center fw-bold fs-3 py-5"
        style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "white" }}
      >
        Join us on our journey to create a more organized, collaborative, and
        efficient online world with LinkStash!
        <div className="mt-3">
          <button className="btn btn-primary fs-5 px-3">Manage Now</button>
        </div>
      </section>

      <div className="container">
        {/* About the Developer */}
        <section>
          <div className="row d-flex py-4">
            <div className="col-md-6">
              <p className="display-4 fw-bold">Meet the Devlopers!</p>
              <div className="my-4 fs-5">
                The brains behind <strong>LinkStash</strong>,we are the
                mastermind of the code behind this. With a passion for both
                front-end and back-end technologies, we as a Fullstack Developer
                built the digital tapestry of LinkStash, ensuring a seamless and
                delightful experience for all users.
                <br />
                <br />
                From crafting user smooth interfaces to optimizing server-side
                performance, we are the driving force behind LinkStash's
                versatility and reliability.
                <br />
                <br />
                <div className="text-center d-flex justify-content-evenly">
                  {/* <!-- Twitter --> */}
                  <a
                    className="btn btn-floating m-1 fs-2"
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>

                  {/* <!-- Linkedin --> */}
                  <a
                    className="btn btn-floating m-1 fs-2"
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>

                  {/* <!-- Github --> */}
                  <a
                    className="btn btn-floating m-1 fs-2"
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img
                src="./resources/About_Meettheteam.webp"
                alt="Developer Image"
                style={{ minHeight: "20em" }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
