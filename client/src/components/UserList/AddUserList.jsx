import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FetchUser, UserList } from "../../../API";
import { useCookies } from "react-cookie";

const AddUserList = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // UserList Data State
  const [userList, setUserList] = useState({
    name: "",
    link: "",
    description: "",
    category: "",
  });

  const [userID, setUserID] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(false);
  const [checkedCategory, setCheckedCategory] = useState(false);

  const fetchCategory = async () => {
    try {
      const response = await axios({
        method: "get",
        url: FetchUser.getUser,
        headers: {
          Authorization: cookies.token,
        },
      });
      console.log(response.data.user._id);
      if (response.status === 200) {
        setUserID(response.data.user._id);
        setCategory(response.data.user.categories);
      }
    } catch (error) {
      console.log("Fetching User:", error, error.response);
    }
  };

  // Handle Form Change in Add Category
  const handleChange = (e) => {
    setUserList({
      ...userList,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  // Handle True/False Option Change
  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value === "true" ? true : false); // Update the selected option when a radio button is clicked
  };

  // Handle New Category Checked
  const handleChecked = (e) => {
    setCheckedCategory(!checkedCategory);
  };

  // Handle Complete Category Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to the API
    try {
      const response = await axios({
        method: "post",
        url: UserList.createList,
        headers: {
          Authorization: cookies.token,
        },
        data: { ...userList, user_id: userID, shared: selectedOption },
      });

      // Set the values to default and navigate to the Manage Puzzle
      setUserList({
        ...userList,
        name: "",
        link: "",
        description: "",
        category: "",
      });
      if (response.status === 201) return navigate("/link");
    } catch (e) {
      console.log(e, e.response);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="dashboard container mb-5 vh-100">
        <div className="nav-items fs-4 pb-3">
          <span className="d-none text-sm text-dark fs-1 d-sm-inline h5">
            Add List
          </span>
        </div>
        <div className="flex-row ">
          <div
            className="flex-row col-sm card border shadow-lg p-5 h-100"
            style={{ borderRadius: "20px" }}
          >
            {/* <form onSubmit={handleSubmit}> */}
            <div className="col-md-6  align-items-center d-flex justify-content-center overflow-hidden">
              <form className="p-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="">
                  {/* Name */}
                  <div className=" form-outline mb-3 ">
                    <label className="form-label h5" htmlFor="listName">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="listName"
                      className="form-control form-control-lg border-1 border-dark"
                      maxLength="256"
                      style={{ fontSize: "15px", borderRadius: "15px" }}
                      value={userList.name}
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                  {/* Link */}
                  <div className="form-outline mb-3 ">
                    <label className="form-label h5" htmlFor="listLink">
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      id="listLink"
                      className="form-control form-control-lg border-1 border-dark"
                      minLength="8"
                      style={{ fontSize: "15px", borderRadius: "15px" }}
                      value={userList.link}
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                  {/* Description */}
                  <div className="form-outline mb-3 ">
                    <label className="form-label h5" htmlFor="listDescription">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="listDescription"
                      value={userList.description}
                      onChange={(e) => handleChange(e)}
                      className="form-control form-control-lg border-1 border-dark"
                      style={{ fontSize: "15px", borderRadius: "15px" }}
                      cols="1"
                      rows="1"
                    ></textarea>
                  </div>

                  {/* Category */}
                  <div className="form-outline mb-3 ">
                    <label className="form-label h5" htmlFor="listCategory">
                      Category
                    </label>
                    {!checkedCategory && (
                      <div className="w-100">
                        <select
                          id="listCategory"
                          className="w-100 p-2 border-dark bg-light"
                          style={{ borderRadius: "15px", color: "black" }}
                          name="category"
                          value={userList.category}
                          onChange={(e) => handleChange(e)}
                        >
                          <option> Select an option </option>
                          {/* Map all the category recieved from the Category API */}
                          {category.length !== 0 && (
                            <>
                              {category.map((el) => (
                                <option value={el} key={el}>
                                  {el}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    )}
                    {/* New Category */}
                    <div className="mt-3">
                      <input
                        type="checkbox"
                        id="SelectNewCategory"
                        checked={checkedCategory}
                        onChange={(e) => handleChecked(e)}
                      />
                      <span className="ms-1">
                        <label
                          className="form-label h5"
                          htmlFor="newListCategory"
                        >
                          New Category
                        </label>
                        {checkedCategory && (
                          <input
                            type="text"
                            name="category"
                            id="newListCategory"
                            className="form-control form-control-lg border-1 border-dark"
                            style={{ fontSize: "15px", borderRadius: "15px" }}
                            value={userList.category}
                            onChange={(e) => handleChange(e)}
                            required={true}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  {/* Shared */}
                  <div className="form-outline mb-3 ">
                    <label className="form-label h5" htmlFor="listShared">
                      Shared
                    </label>
                    <div className="d-flex w-full justify-content-between fs-3">
                      <label>
                        <input
                          type="radio"
                          value={true}
                          checked={selectedOption === true}
                          onChange={handleOptionChange}
                          className="me-1"
                        />
                        True
                      </label>
                      <label>
                        <input
                          type="radio"
                          value={false}
                          checked={selectedOption === false}
                          onChange={handleOptionChange}
                          className="me-1"
                        />
                        False
                      </label>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div className="text-center text-lg-start mt-4 pt-2 w-100">
                    <button
                      type="submit"
                      className="btn  btn-lg w-100"
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                        borderRadius: "20px",
                        backgroundColor: "#3C8C7E",
                      }}
                    >
                      <p className="h4 text-light">Submit</p>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              className=" col-md-6  align-items-center d-flex justify-content-center "
              style={{
                borderRadius: "20px",
                height: "50vh",
              }}
            >
              <img
                src="https://i.pinimg.com/564x/6d/6b/c9/6d6bc96fe77fe56477df38bc3993c6dc.jpg"
                className="w-75 d-none d-sm-block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserList;
