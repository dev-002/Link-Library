import React from "react";
import FeatureCard from "../Home/Components/FeatureSection";

const Features = () => {
  return (
    <>
      <FeatureCard />

      <section>
        <div className="container">
          <strong>Analysis of Collections on Dashboard:</strong>
          <br />
          The dashboard analytics feature provides users with an at-a-glance
          view of their collections' performance. It includes:
          <br />- <strong>Total Collections:</strong> The total number of
          collections created by the user. <br />- <strong>Total Links:</strong>{" "}
          The cumulative count of links saved across all collections. <br />-{" "}
          <strong>Total Views:</strong> The number of times the user's
          collections have been viewed. <br />-{" "}
          <strong>Collection Categories:</strong> A breakdown of collections by
          their categories. <br />- <strong>Collection Popularity:</strong>{" "}
          Indicated by likes, upvotes, and comments.
          <br />
          The analytics help users track the engagement and popularity of their
          collections, enabling them to fine-tune their content curation
          strategy.
          <br />
          <strong>Public Collection Library:</strong>
          <br />
          The public collection library is a key community feature, enhancing
          user engagement and discovery. Users can:
          <br />- <strong>Browse Public Collections:</strong> Explore
          collections created by other users based on various criteria. <br />-{" "}
          <strong>Like and Upvote:</strong> Express appreciation for collections
          by liking and upvoting. <br />-{" "}
          <strong>Discover New Interests:</strong> Find collections related to
          their interests, allowing for knowledge sharing and content curation.{" "}
          <br />- <strong>Contribute to the Community:</strong> Share their own
          public collections for others to benefit from.
          <br />
          This feature fosters a sense of community and encourages users to
          share valuable content while discovering new sources of information
          and inspiration.{" "}
        </div>
      </section>
    </>
  );
};

export default Features;
