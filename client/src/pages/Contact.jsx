import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Contact Form */}
      <div className="md:h-fit h-screen flex flex-col justify-center">
        <p className="text-xl font-bold text-center mb-4">Contact Us</p>
        <section className="my-5 text-white bg-secondary2 p-5">
          <div className="container">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-[33%]">
                <form
                  className="ps-5 max-w-[80%]"
                  onSubmit={(e) => handleSumbit(e)}
                >
                  <div className="my-4">
                    <label htmlFor="email" className="form-label">
                      Email:{" "}
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e)}
                      className="form-control text-black"
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
                      value={formData.subject}
                      onChange={(e) => handleChange(e)}
                      className="form-control text-black"
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
                      value={formData.message}
                      onChange={(e) => handleChange(e)}
                      rows={8}
                      cols={24}
                      style={{ resize: "none" }}
                      className="form-control text-black"
                    ></textarea>
                  </div>

                  <div className="my-4">
                    <button
                      type="submit"
                      className="rounded-xl border-primary p-5 bg-primary text-text text-xl"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="md:block hidden w-full text-center ms-5 max-w-[40%] bg-[url('./resources/Home_contact.jpg')] bg-auto bg-no-repeat"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
