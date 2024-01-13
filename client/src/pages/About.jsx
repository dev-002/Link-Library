import React from "react";

export default function About() {
  return (
    <>
      <div className="container my-5 min-h-screen">
        <section className="row flex">
          <div className="col-md-6 py-5">
            <p
              className="text-3xl font-bold py-4"
              style={{ fontFamily: "'Young Serif', serif" }}
            >
              "The need to Organize"
            </p>
            <p className="text-2xl">
              <strong>Our Mission</strong> <br /> At LinkStash, our mission is
              to simplify your online life by providing a versatile web
              application that lets you efficiently manage, categorize, and
              share your favorite web links while ensuring your data's privacy.
            </p>
          </div>
          <div className="col-md-6 py-5 hidden md:block">
            <img
              src="./resources/About_vector.jpg"
              alt="About Us Vector"
              className="max-w-[80%] m-auto"
            />
          </div>
        </section>

        {/* Community And Story */}
        <section className="text-2xl py-4">
          <div className="row flex min-h-max">
            <div className="md:col-6 py-2">
              <strong>Our Community</strong> <br />
              We serve a diverse community of internet users, from students and
              professionals to researchers and hobbyists. Anyone who values an
              organized online experience can benefit from LinkStash.
              <br />
            </div>
            <div className="md:col-6 hidden md:block">
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
      <section className="text-center font-bold text-xl py-5 text-white bg-secondary2">
        Join us on our journey to create a more organized, collaborative, and
        efficient online world with LinkStash!
        <div className="mt-3">
          <button className="btn bg-primary text-2xl p-3 rounded-xl">
            Manage Now
          </button>
        </div>
      </section>

      {/* About the Developer */}
      <div className="container mt-5">
        <section>
          <div className="flex py-4">
            <div className="md:w-1/2 px-2">
              <p className="text-3xl font-bold">Meet the Devlopers!</p>
              <div className="my-4 text-2xl">
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
              </div>
            </div>
            <div className="md:w-1/2 hidden md:block">
              <img
                className="min-h-[20em] rounded-full"
                src="./resources/About_Meettheteam.webp"
                alt="Developer Image"
              />
            </div>
          </div>
          <div className="text-center flex justify-evenly text-4xl mb-5">
            {/* <!-- Twitter --> */}
            <a className="btn btn-floating m-1" href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </a>

            {/* <!-- Linkedin --> */}
            <a className="btn btn-floating m-1" href="#!" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>

            {/* <!-- Github --> */}
            <a className="btn btn-floating m-1" href="#!" role="button">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
