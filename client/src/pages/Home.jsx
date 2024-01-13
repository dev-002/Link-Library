import React from "react";
import FeatureSection from "../components/Home/FeatureSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* First Intro Section */}
        <section>
          <div className="h-screen flex flex-col items-center text-center mx-auto max-w-[60%] md:pt-72 pt-20">
            <div>
              <p className="text-3xl font-extrabold mb-5">LinkStash</p>
              <p className="text-2xl mb-5 font-[Young Serif]">
                "LinkStash is your personal web link organizer, simplifying link
                management with ease.
                <br />
                <br />
                Organize, share, and rediscover your web links like never
                before."
              </p>
            </div>
            <button className="btn mt-12 text-xl rounded-full border-2 p-3 border-black min-w-[30%]">
              <a href="/about">Explore Now</a>
            </button>
          </div>
        </section>

        {/* Our Aim */}
        <section className="container my-[10em] max-w-[90%]">
          <div className="text-xl">
            <p className="text-3xl font-bold">Our Aim</p>
            <hr className="mx-auto my-4 w-full border-b-2 border-red-500" />
            <p>
              {" "}
              LinkStash is your ultimate solution for tidying up your digital
              life. This platform provides a streamlined approach to organizing,
              managing, and sharing web links. Say goodbye to cluttered
              bookmarks and hello to a user-friendly system that allows you to
              categorize, customize privacy settings, and curate your online
              resources with ease. It's perfect for individuals, researchers,
              and teams seeking an efficient way to stay organized and share
              valuable web links.
              <br />
              <br />
              Join LinkStash today to embark on a journey of seamless link
              management. With LinkStash, you'll effortlessly organize your
              online world and simplify your web interactions. Discover the joy
              of intelligent link sharing and take control of your digital life.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="my-5 mx-auto w-[90%]">
          <div className="text-center text-3xl font-bold mb-2">Features</div>
          <hr className="mx-auto my-4 border-b-2 border-red-500" />
          <div className="d-flex row">
            <FeatureSection />
          </div>
        </section>
      </div>
    </>
  );
}
