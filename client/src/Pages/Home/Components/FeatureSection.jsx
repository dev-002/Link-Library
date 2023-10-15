import React from "react";

const FeatureCard = () => {
  const data = [
    {
      title: "Link Collection Creation:",
      body: "- Users can save web links under customizable categories or collections.<br/>- Add title, description, and tags to categorize and describe the collection.<br>- Set the privacy level of the collection: private, public, or shared.",
    },
    {
      title: "Sharing Collections:",
      body: "- **Private Collections:** Users can keep collections private for their own reference.<br/>**Public Collections:** Collections can be set to public, allowing everyone to view and access the links within.<br/>- **Shared Collections:** Users can share collections with specific individuals by providing their usernames or emails.",
    },
    {
      title: "Dashboard Analytics:",
      body: "- The dashboard provides users with analytical insights.<br/>- Users can see statistics, including the number of collections, links, and views.<br/>- Utilizes charts and graphs to visually represent data.",
    },
    {
      title: "Public Collection Library:",
      body: "- A public collection library allows users to discover and explore collections created by others.<br/>- Users can search, filter, and browse collections based on tags, categories, and popularity.<br/>- Like and upvote collections to indicate their popularity.",
    },
    {
      title: "User Profiles:",
      body: "- Users have profile pages that showcase their collections, favorites, and activity.<br/>- Users can follow each other, enhancing community engagement.",
    },
    {
      title: "Collection Management:",
      body: "- Within each collection, users can add, edit, or delete links.<br/>- Collections can be organized by changing the order of links, tags, and descriptions.",
    },
    {
      title: "Search and Filter:",
      body: "- Users can search for specific collections or links within collections using keywords, tags, or categories.<br/>- Filter collections based on privacy settings (private, public, shared) and popularity.",
    },
    {
      title: "Notification System:",
      body: "- Users receive notifications about collection activity, such as likes, comments, and new shared collections.",
    },
    {
      title: "User Interaction:",
      body: "- Users can like, comment, and share collections.<br/>- Commenting allows users to discuss links and provide insights.",
    },
    {
      title: "Mobile Responsiveness:",
      body: "- The web app is responsive and mobile-friendly for users to access and manage collections from various devices.",
    },
  ];

  return (
    <>
      {/* {data &&
        data.map((obj) => (
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{obj.title}</h5>
                <p className="card-text">{obj.body}</p>
                <a href="#">
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        ))} */}

      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Link Collection Creation:</h5>
            <p className="card-text">
              - Users can save web links under customizable categories or
              collections.
              <br />- Add title, description, and tags to categorize and
              describe the collection.
              <br />- Set the privacy level of the collection: private, public,
              or shared.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Sharing Collections:</h5>
            <p className="card-text">
              - **Private Collections:** Users can keep collections private for
              their own reference.
              <br />
              **Public Collections:** Collections can be set to public, allowing
              everyone to view and access the links within.
              <br />- **Shared Collections:** Users can share collections with
              specific individuals by providing their usernames or emails.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Dashboard Analytics:</h5>
            <p className="card-text">
              - The dashboard provides users with analytical insights.
              <br />- Users can see statistics, including the number of
              collections, links, and views.
              <br />- Utilizes charts and graphs to visually represent data.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Public Collection Library:</h5>
            <p className="card-text">
              - A public collection library allows users to discover and explore
              collections created by others.
              <br />- Users can search, filter, and browse collections based on
              tags, categories, and popularity.
              <br />- Like and upvote collections to indicate their popularity.{" "}
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Profiles:</h5>
            <p className="card-text">
              - Users have profile pages that showcase their collections,
              favorites, and activity.
              <br />- Users can follow each other, enhancing community
              engagement.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Collection Management:</h5>
            <p className="card-text">
              - Within each collection, users can add, edit, or delete links.
              <br />- Collections can be organized by changing the order of
              links, tags, and descriptions.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Search and Filter:</h5>
            <p className="card-text">
              - Users can search for specific collections or links within
              collections using keywords, tags, or categories.
              <br />- Filter collections based on privacy settings (private,
              public, shared) and popularity.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Interaction:</h5>
            <p className="card-text">
              - Users can like, comment, and share collections.
              <br />- Commenting allows users to discuss links and provide
              insights.
            </p>
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default FeatureCard;
