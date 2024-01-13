import React from "react";

export default function FeatureSection() {
  const data = [
    {
      title: "Link Collection Creation:",
      body: [
        "- Users can save web links under customizable categories or collections.",
        "- Add title, description, and tags to categorize and describe the collection.",
        "- Set the privacy level of the collection: private, public, or shared.",
      ],
    },
    {
      title: "Sharing Collections:",
      body: [
        "- Private Collections: Users can keep collections private for their own reference.",
        "- Public Collections: Collections can be set to public, allowing everyone to view and access the links within.",
        "- Shared Collections: Users can share collections with specific individuals by providing their usernames or emails.",
      ],
    },
    {
      title: "Public Collection Library:",
      body: [
        "- A public collection library allows users to discover and explore collections created by others.",
        "- Users can search, filter, and browse collections based on tags, categories, and popularity.",
        "- Like and upvote collections to indicate their popularity.",
      ],
    },
    {
      title: "Dashboard Analytics:",
      body: [
        "- The dashboard provides users with analytical insights.",
        "- Users can see statistics, including the number of collections, links, and views.",
        "- Utilizes charts and graphs to visually represent data.",
      ],
    },
    {
      title: "User Profiles:",
      body: [
        "- Users have profile pages that showcase their collections, favorites, and activity.",
        "- Users can follow each other, enhancing community engagement.",
      ],
    },
    {
      title: "Collection Management:",
      body: [
        "- Within each collection, users can add, edit, or delete links.",
        "- Collections can be organized by changing the order of links, tags, and descriptions.",
      ],
    },
    {
      title: "Search and Filter:",
      body: [
        "- Users can search for specific collections or links within collections using keywords, tags, or categories.",
        "- Filter collections based on privacy settings (private, public, shared) and popularity.",
      ],
    },
    {
      title: "Notification System:",
      body: [
        "- Users receive notifications about collection activity, such as likes, comments, and new shared collections.",
      ],
    },
    {
      title: "User Interaction:",
      body: [
        "- Users can like, comment, and share collections.",
        "- Commenting allows users to discuss links and provide insights.",
      ],
    },
    {
      title: "Mobile Responsiveness:",
      body: [
        "- The web app is responsive and mobile-friendly for users to access and manage collections from various devices.",
      ],
    },
  ];

  return (
    <>
      <div className="container">
        {/* <section className="fs-2 fw-bold my-4">
          <i
            className="fa-solid fa-arrow-left me-2"
            onClick={() => navigate("/")}
          ></i>{" "}
          More Featuers
        </section> */}

        {/* Feature Card */}
        <section>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
            {data.map((obj) => (
              <div
                className="my-3 p-4 border border-black rounded min-h-fit"
                key={obj.title}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title font-bold overflow-clip">
                      {obj.title}
                    </h5>
                    <hr />
                    <p className="card-text md:inline hidden">
                      {obj.body.map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* More About the Featueres */}
        {/* <section className="my-5">
          <strong className="fs-3">
            Analysis of Collections on Dashboard:
          </strong>
          <br />
          The dashboard analytics feature provides users with an at-a-glance
          view of their collections' performance. It includes:
          <ul>
            <li className="my-2">
              <strong>Total Collections:</strong> The total number of
              collections created by the user.
            </li>
            <li className="my-2">
              <strong>Total Links:</strong> The cumulative count of links saved
              across all collections.
            </li>
            <li className="my-2">
              <strong>Total Views:</strong> The number of times the user's
              collections have been viewed.
            </li>
            <li className="my-2">
              <strong>Collection Categories:</strong> A breakdown of collections
              by their categories.
            </li>
            <li className="my-2">
              <strong>Collection Popularity:</strong> Indicated by likes,
              upvotes, and comments.
            </li>
            <li className="my-2">
              The analytics help users track the engagement and popularity of
              their collections, enabling them to fine-tune their content
              curation strategy.
            </li>
            <li className="my-2">
              <strong>Public Collection Library:</strong>
              The public collection library is a key community feature,
              enhancing user engagement and discovery. Users can:
            </li>

            <li className="my-2">
              <strong>Browse Public Collections:</strong> Explore collections
              created by other users based on various criteria.
            </li>

            <li className="my-2">
              <strong>Like and Upvote:</strong> Express appreciation for
              collections by liking and upvoting.
            </li>
            <li className="my-2">
              <strong>Discover New Interests:</strong> Find collections related
              to their interests, allowing for knowledge sharing and content
              curation.
            </li>
            <li className="my-2">
              <strong>Contribute to the Community:</strong> Share their own
              public collections for others to benefit from. This feature
              fosters a sense of community and encourages users to share
              valuable content while discovering new sources of information and
              inspiration.
            </li>
          </ul>
        </section> */}
      </div>
    </>
  );
}
