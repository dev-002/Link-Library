import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Form = () => {
  const [cookie] = useCookies(["token"]);
  const [formData, setFormData] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios({
        method: "post",
        url,
        data: formData,
        headers: { Authorization: cookie.token },
      });
    } catch (error) {
      console.log("Error:", {
        location: "in create link/Form Submit",
        message: error.message,
        error,
      });
    }
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axios({
        method: "get",
        url,
        headers: {
          Authorization: cookie.token,
        },
      });
      console.log("Response: ", response);
      if (response.status === 200) {
        setCategoryList(response.data.list);
      }
    } catch (error) {
      console.log("Error: ", {
        location: "in create new list/Fetching Category",
        message: error.message,
        error,
      });
    }
  };

  useEffect(() => {
    // fetchCategoryList;
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="border p-3">
      {/* Name */}
      <div className="my-2">
        <label htmlFor="name" className="form-label">
          Name:{" "}
        </label>
        <input type="text" name="name" id="name" className="form-control" />
      </div>

      {/* Link */}
      <div className="my-2">
        <label htmlFor="link" className="form-label">
          Link:{" "}
        </label>
        <input type="text" name="link" id="link" className="form-control" />
        <div className="form-text">Please enter the exact link</div>
      </div>

      {/* Desctiption */}
      <div className="my-2">
        <label htmlFor="description" className="form-label">
          Description:{" "}
        </label>
        <br />
        <textarea
          name="description"
          id="description"
          rows={4}
          style={{ resize: "none" }}
          className="col-12"
        />
      </div>

      {/* Category */}
      <div className="my-2">
        <label htmlFor="category" className="form-label">
          Choose Category:{" "}
        </label>
        <select
          name="category"
          id="category"
          className="form-select form-select-lg mb-3"
        >
          <option value="">Select a category</option>
          {categoryList &&
            categoryList.map((category) => (
              <option value={category}>{category}</option>
            ))}
        </select>
      </div>

      {/* Tags */}
      {/* <div className="my-2 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
      />
      <label className="form-check-label" for="exampleCheck1">
        Check me out
      </label>
    </div> */}

      {/* Shared */}
      <div className="my-2 row">
        <label htmlFor="shared" className="form-label col-md-3">
          Shared:{" "}
        </label>
        <div className="d-flex justify-content-evenly">
          <label htmlFor="shared" className="form-check-label fs-4">
            Public
            <input
              type="radio"
              name="shared"
              id="shared1"
              value="public"
              className="ms-1 me-2 form-check-input"
            />
          </label>
          <label htmlFor="shared" className="form-check-label fs-4">
            Shared
            <input
              type="radio"
              name="shared"
              id="shared2"
              value="shared"
              className="ms-1 me-2"
            />
          </label>
          <label htmlFor="shared" className="form-check-label fs-4">
            Private{" "}
            <input
              type="radio"
              name="shared"
              id="shared3"
              value="private"
              className="ms-1 me-2"
            />
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="my-4">
        <button type="submit" className="btn btn-primary fs-4 col-12 mx-auto">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
