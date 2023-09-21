import React from "react";

const Home = () => {
  const features = [
    {
      title: "Organize Links",
      body: "Easily categorize your links into collections for quick access.",
    },
    {
      title: "Save Links",
      body: "Save links from the web with a single click.",
    },
    {
      title: "Search Links",
      body: "Find your links quickly with powerful search capabilities.",
    },
    {
      title: "Share Collections",
      body: "Share your curated collections with friends and the community.",
    },
    {
      title: "Public Collections",
      body: "Make your collections public for others to discover and explore.",
    },
    {
      title: "User-Friendly Interface",
      body: "Enjoy a user-friendly and intuitive interface for seamless navigation.",
    },
  ];
  return (
    <div
      style={{
        minHeight: "85vh",
      }}
    >
      {/* Header Section */}
      <div
        className="py-5"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,1),rgba(0,0,0,0)),url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80)",
          minHeight: "30em",
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="row">
          <div className="lg-col-6 my-auto text-white ps-5">
            <p className="lg-display-4 display-6">
              Welcome to <span className="fw-bold">LinkStash</span> <br />{" "}
              <span className="lg-h2 h5">Your Personal Link Library! </span>
            </p>

            <p className="lg-h5">
              Organize, Save, and Share Your Favorite Links
            </p>

            <button
              className="btn btn-primary mx-auto w-lg-25 w-50 mt-5 fw-bold fs-3"
              style={{ minHeight: "3em" }}
              onClick={() => console.log("Get Started")}
            >
              Get Started <i className="fa-solid fa-arrow-right fa-lg ms-3"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Features Section */}
        <div className="my-5">
          <p className="fw-bold display-4 text-center">Features</p>

          <div className="row">
            {features.map((el) => (
              <div
                className="card col-lg-3 col-6 m-lg-5 mx-auto py-3 h-auto"
                key={el.title}
              >
                {/* <img
                  className="bg-danger card-img-top"
                  style={{ minHeight: "20%" }}
                /> */}
                {/* <img
                  src="https://imgs.search.brave.com/jPHHl5wIw-zUcSg6OKOjgn9X_xj3q6bP0P-k91f4dcQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvc2VvLWFuZC13/ZWJzaXRlLzEwMC9T/RU9fc2VjdXJpdHlf/ZmVhdHVyZV93ZWJz/aXRlLTUxMi5wbmc"
                  className="card-img-top"
                  alt="Features Card"
                  style={{
                    maxHeight: "25vh",
                  }}
                /> */}
                <div className="card-body">
                  <h5 className="card-title text-center fs-lg-4 fs-6 fw-bold my-4">
                    {el.title}
                  </h5>
                  <p className="card-text">{el.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div
        className="text-center py-5"
        style={{
          background:
            // "linear-gradient(to bottom right, rgba(0,0,0,1),rgba(0,0,0,0),rgba(0,0,0,1))",
            "rgba(0,0,0,0.7)",
          color: "white",
          width: "100%",
        }}
      >
        <p className="fw-bold fs-3">Join LinkStach Today !</p>
        <p className="fs-lg-5">
          Start organizing your links like never before. Sign up now and create
          your first collection.
        </p>
        <button
          className="btn btn-info fw-bold fs-4 py-2"
          style={{
            width: "30%",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
