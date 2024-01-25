import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utility/axiosInstance";
import { PrivateCollections as collectionLink } from "../../../API_Endponits";

export default function CreateLinkModel({ setCreateLinkModel, collection }) {
  return (
    <>
      <div className="container max-w-[60%] my-5 mx-auto">
        {/* Heading Section */}
        <section className="my-3">
          <p className="font-bold text-xl">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => setCreateLinkModel(false)}
            ></i>{" "}
            Update collection list
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full mx-auto py-5 border-2 border-black rounded">
          <Form
            setCreateLinkModel={setCreateLinkModel}
            collection={collection}
          />
        </section>
      </div>
    </>
  );
}

const Form = ({ setCreateLinkModel, collection }) => {
  const [formData, setFormData] = useState(collection);

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
    };
    try {
      const response = await axiosInstance.post(
        collectionLink.createCollection,
        {
          data,
        },
        { withCredentials: true }
      );

      if (response.status == 201) setCreateLinkModel(false);
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

  function handleDelete(index) {
    let temp = formData.filter((link, link_index) => link_index != index);
    console.log("Updated to", temp);
    setFormData(temp);
  }

  //   function addLinkBox() {
  //     const LinkBox = ({ index, data, handleChange, handleDelete }) => {
  //       return (
  //         <div key={index} className="my-4 p-3 border border-black rounded">
  //           {/* Link Name */}
  //           <div className="my-2">
  //             <label htmlFor="linkname" className="form-label">
  //               Link Name:{" "}
  //             </label>
  //             <input
  //               type="text"
  //               name="link.name"
  //               id="linkname"
  //               className="w-full border-2 border-blue-800 rounded"
  //               onChange={(e) => handleChange(e)}
  //               value={(data && data.name) || ""}
  //             />
  //           </div>

  //           {/* Link */}
  //           <div className="my-2">
  //             <label htmlFor="link" className="form-label">
  //               Link:{" "}
  //             </label>
  //             <input
  //               type="text"
  //               name="link.link"
  //               id="link"
  //               className="w-full border-2 border-blue-800 rounded"
  //               onChange={(e) => handleChange(e)}
  //               value={(data && data.link) || ""}
  //             />
  //             <div className="text-sm font-light">
  //               Please enter the exact link
  //             </div>
  //           </div>

  //           {/* Link Description */}
  //           <div className="my-2">
  //             <label htmlFor="linkdescription" className="form-label">
  //               Link Description:{" "}
  //             </label>
  //             <br />
  //             <textarea
  //               name="link.description"
  //               id="linkdescription"
  //               rows={2}
  //               style={{ resize: "none" }}
  //               className="w-full border-2 border-blue-800 rounded"
  //               onChange={(e) => handleChange(e)}
  //               value={(data && data.description) || ""}
  //             />
  //           </div>
  //           <button
  //             className="my-2 py-1 px-3 bg-red-600 text-white rounded"
  //             onClick={() => handleDelete(index)}
  //           >
  //             <i className="me-1 fa-solid fa-trash"></i> Delete
  //           </button>
  //         </div>
  //       );
  //     };

  //     const LinkList = document.getElementById("link-list");
  //     const index = formData.length;
  //     const data = {};
  //     setFormData((prev) => {
  //       return [...prev, []];
  //     });

  //     const linkBoxElement = React.createElement(LinkBox, {
  //       index,
  //       data,
  //       handleChange,
  //       handleDelete,
  //     });

  //     LinkList.appendChild(linkBoxElement);
  //   }

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key == "Escape") {
        setCreateLinkModel(false);
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="py-3 px-5">
      <div id="link-list">
        {formData &&
          formData.map((data, index) => (
            <div key={index} className="my-4 p-3 border border-black rounded">
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
                  value={data.name}
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
                  value={data.link}
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
                  name="link.description"
                  id="linkdescription"
                  rows={2}
                  style={{ resize: "none" }}
                  className="w-full border-2 border-blue-800 rounded"
                  onChange={(e) => handleChange(e)}
                  value={data.description}
                />
              </div>
              <button
                className="my-2 py-1 px-3 bg-red-600 text-white rounded"
                onClick={() => handleDelete(index)}
              >
                <i className="me-1 fa-solid fa-trash"></i> Delete
              </button>
            </div>
          ))}
      </div>

      <div
        className="my-4"
        onClick={() => {
          //   addLinkBox()
          console.log("Add new Element");
        }}
      >
        <i
          className="fa-solid fa-square-plus text-3xl"
          onClick={() => setCreateLinkModel(true)}
        />
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
