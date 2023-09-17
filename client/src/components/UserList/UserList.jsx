import React, { useEffect, useState } from "react";
import axios from "axios";
import { FetchUser, UserList } from "../../../API";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
            {userCategoryList && userCategoryList?.length > 0 ? (
              userCategoryList.map((el) => (
                <div className="lg-col-4 col-5" key={el}>
                  <div className="card">
                    <div className="card-body btn btn-info">
                      <div
                        className="card-title text-center"
                        onClick={(e) => handleCategoryClick(e, el)}
                        value={el}
                      >
                        {el.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-center"> No List Created </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
