import React, { useEffect, useState } from "react";
import axios from "axios";
import { FetchUser, UserList } from "../../../API";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserGet } from "../../tempUtility";

const List = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [userCategoryList, setUserCategoryList] = useState([]);

  const handleCategoryClick = (e, el) => {
    navigate(`/link/${el}`);
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: FetchUser.getUser,
        headers: {
          Authorization: cookies.token,
        },
      });
      console.log("Response: ", response.data.user.categories);
      if (response.status === 200) {
        setUserCategoryList(response.data.user.categories);
      }
    } catch (error) {
      console.log("Fetching User:", error, error.response);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handleDeleteCollection = async (el) => {
    try {
      const user_id = await UserGet(cookies);
      const response = await axios({
        method: "delete",
        url: UserList.deleteCollection,
        headers: {
          Authorization: cookies.token,
        },
        data: { user_id, category: el },
      });
      if (response.status === 200) {
        setUserCategoryList(response.data.list);
      }
    } catch (error) {
      console.log("Fetching User:", error, error.response);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <p className="display-4 fw-bold text-center">User List</p>
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
            {userCategoryList ? (
              <>
                {userCategoryList && userCategoryList?.length > 0 ? (
                  userCategoryList.map((el) => (
                    <div className="lg-col-4 col-5 col-12 mb-4" key={el}>
                      <div className="card">
                        <div className="card-body btn btn-info d-flex">
                          <div className="card-title text-center fw-bold col-11">
                            <span
                              onClick={(e) => handleCategoryClick(e, el)}
                              value={el}
                            >
                              {el.toUpperCase()}
                            </span>
                          </div>
                          <div className="col-1">
                            <i
                              className="fa-solid fa-trash fa-lg-2xl fa-xl "
                              style={{ color: "#d90d0d", right: "5%" }}
                              onClick={() => handleDeleteCollection(el)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="align-items-center d-flex justify-content-center ">
                    <div className="display-4 fw-normal">
                      No Collections Created
                    </div>
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

export default List;
