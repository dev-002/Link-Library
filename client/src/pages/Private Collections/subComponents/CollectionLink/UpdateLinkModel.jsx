import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utility/axiosInstance";
import { PrivateCollections as collectionLink } from "../../../../API_Endponits";

export default function UpdateLinkModel({
  setUpdateLinkModal,
  updateLinkModal,
  collectionName,
}) {
  return (
    <>
      <div className="container max-w-[60%] my-5 mx-auto">
        {/* Heading Section */}
        <section className="my-3">
          <p className="font-bold text-xl">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => setUpdateLinkModal(false)}
            ></i>{" "}
            Update collection link
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full mx-auto py-5 border-2 border-black rounded">
          <Form
            updateLinkModal={updateLinkModal}
            setUpdateLinkModal={setUpdateLinkModal}
            collectionName={collectionName}
          />
        </section>
      </div>
    </>
  );
}

const Form = ({ updateLinkModal, setUpdateLinkModal, collectionName }) => {
  const [formData, setFormData] = useState(updateLinkModal.link.link);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        collectionLink.updateCollectionList + `/${collectionName}/update`,
        {
          updatedLink: formData,
          collectionName,
        },
        { withCredentials: true }
      );

      console.log("Response", response);
      if (response.status == 200) {
        setUpdateLinkModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        let response = error.response.data;
        console.log("Error: ", response.error);
      } else
        console.log("Error: ", {
          location: "in update collection link/Form Submit",
          message: error.message,
          error,
        });
    }
  };

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key == "Escape") {
        setFormData({});
        setUpdateLinkModal(false);
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="py-3 px-5">
      <div id="link-list">
        <div className="my-4 p-3 border border-black rounded">
          {/* Link Name */}
          <div className="my-2">
            <label htmlFor="linkname" className="form-label">
              Link Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              id="linkname"
              className="w-full border-2 border-blue-800 rounded"
              onChange={(e) => handleChange(e)}
              value={formData.name}
            />
          </div>

          {/* Link */}
          <div className="my-2">
            <label htmlFor="link" className="form-label">
              Link:{" "}
            </label>
            <input
              type="text"
              name="link"
              id="link"
              className="w-full border-2 border-blue-800 rounded"
              onChange={(e) => handleChange(e)}
              value={formData.link}
            />
            <div className="text-sm font-light">
              Please enter the exact link
            </div>
          </div>

          {/* Link Description */}
          <div className="my-2">
            <label htmlFor="linkdescription" className="form-label">
              Link Description:{" "}
            </label>
            <br />
            <textarea
              name="description"
              id="linkdescription"
              rows={4}
              style={{ resize: "none" }}
              className="w-full border-2 border-blue-800 rounded"
              onChange={(e) => handleChange(e)}
              value={formData.description}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="my-4">
        <button
          type="submit"
          className="w-full mx-auto py-2 bg-primary text-xl text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
