import React from "react";

const About = () => {
  return (
    <>
      <div className="conatiner mx-5">
        <div>
          <p className="display-4 fw-bolder">
            Welcome to LinkStash <br />{" "}
            <span className="display-6">
              {" "}
              Your Personal Link Organizer and Sharing Platform!
            </span>
          </p>
          <p className="fs-5">
            At LinkStash, we believe that the internet is a vast treasure trove
            of valuable information, resources, and inspiration. But keeping
            track of all those web links and organizing them efficiently can be
            a daunting task. That's where LinkStash comes in! We provide you
            with a simple yet powerful tool to manage your favorite links,
            categorize them, and even share them with the world if you wish.
          </p>
        </div>

        {/* Our Mission */}
        <div className="d-flex row mx-auto justify-content-around">
          <div className="col-lg-5">
            <h2 className="display-4 mb-4">Our Mission</h2>

            <p className="text-justify fs-5">
              Our mission is to simplify your online life by offering a
              feature-rich platform that helps you keep your digital resources
              organized, accessible, and shareable. Whether you're a student, a
              professional, or just an internet enthusiast, LinkStash is
              designed to make your web browsing experience more productive and
              enjoyable.
            </p>
          </div>
          <div className="col-lg-5">
            <img
              src="https://cdn.shopify.com/s/files/1/0070/7032/files/how-to-write-an-about-us-wip1.png?format=webp&v=1618511825&width=1024"
              alt="aboutus"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "5%",
              }}
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <h1>Key Features</h1>

          <ol type="1">
            <li>
              Link Organization: LinkStash allows you to create custom
              categories for your links. Whether it's work-related research,
              personal interests, or travel planning, you can organize your
              links into neat and easily navigable categories.
            </li>
            <li>
              Privacy Control: We understand that not all links are meant to be
              shared with the world. With LinkStash, you have the power to
              choose whether a category or link is public or private. Keep your
              personal links private and share your professional resources with
              colleagues or the public effortlessly.
            </li>

            <li>
              User-Friendly Interface: Our intuitive and user-friendly interface
              makes it a breeze to add, edit, and manage your links. We've
              designed LinkStash to be accessible to users of all technical
              backgrounds.
            </li>
            <li>
              Seamless Sharing: Sharing your curated collections of links is as
              simple as a click. Share a category with a specific group of
              people or make it public for anyone to access. LinkStash also
              generates shareable links for individual links within a category.
            </li>
            <li>
              Mobile Accessibility: Access your link collections anytime,
              anywhere, on any device. LinkStash is fully responsive, ensuring a
              seamless experience on both desktop and mobile.
            </li>
            <li>
              Search and Tagging: Quickly find the link you're looking for with
              our robust search and tagging features. Tags help you further
              categorize your links for easy retrieval.
            </li>

            <li>
              Collaboration: Collaborate with others by sharing your categories.
              Great for team projects, research, and collaborative learning.
            </li>
          </ol>
        </div>

        <div>
          {/* Why LinkStash */}
          <h1>Why LinkStash?</h1>

          <p>
            Efficiency: Save time and frustration by having all your important
            links organized in one place.
          </p>
          <p>
            Security: Your privacy is important to us. Keep your personal links
            personal.
          </p>
          <p>
            Collaboration: Easily work on projects with colleagues or share
            valuable resources with friends and followers.
          </p>
          <p>
            Accessibility: Access your links from anywhere, whether you're at
            home, at work, or on the go.
          </p>
        </div>

        <div>
          Get Started Today Join the LinkStash community and simplify your
          online life. Start organizing your links, creating categories, and
          sharing knowledge with LinkStash. Experience the convenience and power
          of effortless link management and sharing. Explore LinkStash, and turn
          your scattered web links into a well-organized treasure trove of
          knowledge!
        </div>
      </div>
    </>
  );
};

export default About;
