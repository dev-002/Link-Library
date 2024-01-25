import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../../utility/axiosInstance";
import { PrivateCollections as collectionLink } from "../../../API_Endponits";

const PrivateListCreate = ({ setCreateModel }) => {
  return (
    <>
      <div className="container max-w-[60%] my-5 mx-auto">
        {/* Heading Section */}
        <section className="my-3">
          <p className="font-bold text-xl">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => setCreateModel(false)}
            ></i>{" "}
            Create new list
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full mx-auto py-5 border-2 border-black rounded">
          <Form setCreateModel={setCreateModel} />
        </section>
      </div>
    </>
  );
};

const Form = ({ setCreateModel }) => {
  const tagRef = useRef();
  const sharedWithRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    link: {
      name: "",
      link: "",
      description: "",
    },
    description: "",
  });
  const [sharedWith, setSharedWith] = useState([]);
  const [tags, setTags] = useState([]);
  const [shared, setShared] = useState("public");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData };
    const propertyPath = name.split(".");

    if (propertyPath.length == 1) {
      updatedFormData[propertyPath[0]] = value;
    } else if (propertyPath.length == 2) {
      updatedFormData[propertyPath[0]][[propertyPath[1]]] = value;
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ...formData,
      sharedWith,
      tags,
      shared,
    };
    try {
      const response = await axiosInstance.post(
        collectionLink.createCollection,
        {
          data,
        },
        { withCredentials: true }
      );

      if (response.status == 201) setCreateModel(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        let response = error.response.data;
        console.log("Error: ", response.message, response.error);
      } else
        console.log("Error: ", {
          location: "in create link/Form Submit",
          message: error.message,
          error,
        });
    }
  };

  function handleKeyPress(e) {
    if (e.key == "Escape") {
      setCreateModel(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="py-3 px-5">
      {/* Name */}
      <div className="my-2">
        <label htmlFor="name" className="form-label">
          Collection Name:{" "}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full border-2 border-blue-800 rounded"
          onChange={(e) => handleChange(e)}
          value={formData.name}
        />
      </div>

      {/* Link Form */}
      <div className="p-1 border border-black rounded">
        {/* Link Name */}
        <div className="my-2">
          <label htmlFor="linkname" className="form-label">
            Link Name:{" "}
          </label>
          <input
            type="text"
            name="link.name"
            id="linkname"
            className="w-full border-2 border-blue-800 rounded"
            onChange={(e) => handleChange(e)}
            value={formData.link.name}
          />
        </div>

        {/* Link */}
        <div className="my-2">
          <label htmlFor="link" className="form-label">
            Link:{" "}
          </label>
          <input
            type="text"
            name="link.link"
            id="link"
            className="w-full border-2 border-blue-800 rounded"
            onChange={(e) => handleChange(e)}
            value={formData.link.link}
          />
          <div className="text-sm font-light">Please enter the exact link</div>
        </div>

        {/* Link Description */}
        <div className="my-2">
          <label htmlFor="linkdescription" className="form-label">
            Link Description:{" "}
          </label>
          <br />
          <textarea
            name="link.description"
            id="linkdescription"
            rows={2}
            style={{ resize: "none" }}
            className="w-full border-2 border-blue-800 rounded"
            onChange={(e) => handleChange(e)}
            value={formData.link.description}
          />
        </div>
      </div>

      {/* Desctiption */}
      <div className="my-2">
        <label htmlFor="description" className="form-label">
          Collection Description:
        </label>
        <br />
        <textarea
          name="description"
          id="description"
          rows={4}
          style={{ resize: "none" }}
          className="w-full border-2 border-blue-800 rounded"
          onChange={(e) => handleChange(e)}
          value={formData.description}
        />
      </div>

      {/* Tags */}
      <div className="my-2">
        <label htmlFor="tags" className="form-label">
          Choose Tags:{" "}
        </label>

        <input
          type="text"
          name="tags"
          id="tags"
          ref={tagRef}
          className="border-2 border-blue-800 rounded"
        />
        <button
          type="button"
          className="ms-2 px-2 bg-secondary2 rounded text-white  font-bold text-lg"
          onClick={() => {
            setTags((prevTags) => {
              const tagValue = tagRef.current.value;
              return [...prevTags, tagValue];
            });
          }}
        >
          Add
        </button>
        <div className="m-1 flex justify-center text-normal font-light text-blue-500">
          {tags.map((tag) => (
            <span
              key={tag}
              className="mx-2"
              onClick={() => {
                setTags((prevTag) => {
                  return prevTag.filter((tag_temp) => tag_temp != tag);
                });
              }}
            >
              #{tag}
            </span>
          ))}{" "}
        </div>
      </div>

      {/* Shared */}
      <div className="my-2 row">
        <label htmlFor="shared" className="form-label md:w-3/12">
          Shared Type:{" "}
        </label>
        <div className="flex justify-evenly border-2 border-blue-800 rounded">
          <span>
            <input
              type="radio"
              name="shared"
              id="shared1"
              value="public"
              className="ms-1 me-2 form-check-input"
              onChange={() => {
                setShared("public");
              }}
              checked={shared == "public"}
            />
            <label htmlFor="shared1" className="form-check-label text-normal">
              Public
            </label>
          </span>
          <span>
            <input
              type="radio"
              name="shared"
              id="shared2"
              value="shared"
              className="ms-1 me-2"
              onChange={() => {
                setShared("shared");
              }}
              checked={shared == "shared"}
            />
            <label htmlFor="shared2" className="form-check-label text-normal">
              Shared
            </label>
          </span>
          <span>
            <input
              type="radio"
              name="shared"
              id="shared3"
              value="private"
              className="ms-1 me-2"
              onChange={() => {
                setShared("private");
              }}
              checked={shared == "private"}
            />
            <label htmlFor="shared3" className="form-check-label text-normal">
              Private{" "}
            </label>
          </span>
        </div>
      </div>

      {/* Shared With */}
      <div className="my-2">
        <label htmlFor="sharedWith" className="form-label">
          Shared With:{" "}
        </label>

        <input
          type="text"
          name="sharedWith"
          id="sharedWith"
          className="border-2 border-blue-800 rounded"
          ref={sharedWithRef}
        />

        <button
          type="button"
          className="ms-2 px-2 bg-secondary2 rounded text-white  font-bold text-lg"
          onClick={() => {
            setSharedWith((prevSharedWith) => {
              const sharedValue = sharedWithRef.current.value;
              return [...prevSharedWith, sharedValue];
            });
          }}
        >
          Add
        </button>

        <div className="m-1 flex justify-center text-normal font-light text-blue-500">
          {sharedWith.map((id) => (
            <span
              key={id}
              className="mx-2"
              onClick={() => {
                setSharedWith((prevSharedWith) => {
                  return prevSharedWith.filter(
                    (share_temp) => share_temp != id
                  );
                });
              }}
            >
              @{id}
            </span>
          ))}
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

export default PrivateListCreate;
