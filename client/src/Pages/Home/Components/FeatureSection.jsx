import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = () => {
  const navigate = useNavigate();

  const data = [
    {
      title: "Link Collection Creation:",
      body: [
        "Users can save web links under customizable categories or collections.",
        "Add title, description, and tags to categorize and describe the collection.",
        "Set the privacy level of the collection: private, public, or shared.",
      ],
    },
    {
      title: "Sharing Collections:",
      body: [
        "Private Collections: Users can keep collections private for their own reference and use.",
        "Public Collections: Collections can be set to public, allowing everyone to view and access the links within.",
        "Shared Collections: Users can share collections with specific individuals by providing their usernames or emails.",
      ],
    },
    {
      title: "Public Collection Library:",
      body: [
        "A public collection library allows users to discover and explore collections created by others.",
        "Users can search, filter, and browse collections based on tags, categories, and popularity.",
        "Like and upvote collections to indicate their popularity.",
      ],
    },
    {
      title: "Dashboard Analytics:",
      body: [
        "The dashboard provides users with analytical insights.",
        "Users can see statistics, including the number of collections, links, and views.",
        "Utilizes charts and graphs to visually represent data.",
      ],
    },
  ];

  return (
    <>
      {data.map((obj) => (
        <div
          className="col-md-4 my-3"
          key={obj.title}
          style={{ minHeight: "fit-content" }}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-bold">{obj.title}</h5>
              <hr />
              <p className="card-text">
                {obj.body.map((line, index) => (
                  <li
                    key={index}
                    className="my-1"
                    style={{ minHeight: "4.5em" }}
                  >
                    {line}
                    <br />
                  </li>
                ))}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="col-md-4 my-3">
        <div className="card p-4 fs-1">
          <p>More Featuers</p>
          <i
            className="fa-solid fa-arrow-right-long mx-2 text-center"
            onClick={() => navigate("/features")}
          ></i>
        </div>
      </div>
    </>
  );
};
export default FeatureCard;
