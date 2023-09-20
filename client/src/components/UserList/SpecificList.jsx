import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserList } from "../../../API";
import { UserGet } from "../../tempUtility";

const SpecificList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { categoryName } = useParams();
  const [userList, setUserList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: UserList.specificCategoryList,
        headers: {
          Authorization: cookies.token,
        },
        params: {
          category: categoryName,
        },
      });
      if (response.status === 200) return setUserList(response.data.list);
    } catch (error) {
      console.log("Specific List Error:", error, error.response);
    }
  };

  // Delete Function
  const handleDelete = async (el) => {
    try {
      const user_id = await UserGet(cookies);
      const response = await axios({
        method: "delete",
        url: UserList.deleteList,
        headers: {
          Authorization: cookies.token,
        },
        data: { user_id, link_id: el._id },
      });
      if (response.status === 200) {
        setUserList(response.data.list);
      }
    } catch (error) {
      console.log(error, error.response);
    }
  };

  // Edit Function
  const handleEdit = async (el) => {
    navigate(`/link/${el.category}/edit`, { state: el });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="d-flex ">
            <div
              className="fs-1 fw-bold mx-3"
              onClick={() => navigate("/link")}
            >
              <i className="fa fa-arrow-left"></i>
            </div>
            <p className="display-4 fw-bold text-center">
              User List
              <span className="fs-5"> &gt; {categoryName} List</span>
            </p>
          </div>
          <button
            className="btn border-4 border-black"
            style={{ height: "2.5em", width: "5em" }}
            onClick={() => navigate("/link/createList")}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="categoryList my-4">
          <div className="row">
            {userList ? (
              <>
                {userList && userList?.length > 0 ? (
                  userList.map((el) => (
                    <div className="col-lg-4 col-12" key={el.name}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            {el.name.toUpperCase()}
                          </h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary d-flex justify-content-between">
                            <span>category: {el.category}</span>
                            <span className="position-absolute end-0 top-0 m-3 fs-4">
                              {el.shared ? (
                                <i className="fa-solid fa-lock-open"></i>
                              ) : (
                                <i className="fa-solid fa-lock"></i>
                              )}
                              <i
                                className="ms-3 fa-solid fa-trash"
                                style={{ color: "#d90d0d" }}
                                onClick={() => handleDelete(el)}
                              ></i>
                              <i
                                className="ms-3 fa-solid fa-pen-to-square"
                                onClick={() => handleEdit(el)}
                              ></i>
                            </span>
                          </h6>
                          <p className="card-text">{el.description}</p>
                          <a href={el.link} className="card-link">
                            {el.link}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="align-items-center d-flex justify-content-center ">
                    <div className="display-4 fw-normal">No Link Added</div>
                  </div>
                )}
              </>
            ) : (
              <div className="align-items-center d-flex justify-content-center vh-100">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificList;
