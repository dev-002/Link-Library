import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PublicList } from "../../../API";

const PublicListCategory = () => {
  const navigate = useNavigate();
  const [publicCategoryList, setUserCategoryList] = useState([]);

  const handleCategoryClick = (e, el) => {
    navigate(`/public/${el}`);
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: PublicList,
      });

      if (response.status === 200) {
        setUserCategoryList(response.data.publicCategories);
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
          <p className="display-4 fw-bold text-center">Public List</p>
        </div>
        <div className="categoryList my-4">
          <div className="row">
            {publicCategoryList && publicCategoryList?.length > 0 ? (
              publicCategoryList.map((el) => (
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
                <div className="text-center"> No Public List Available </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicListCategory;
