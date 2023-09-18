import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PublicList } from "../../../API";

const SpecificPublic = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { categoryName } = useParams();
  const [publicList, setPublicList] = useState([]);

  const fetchPublicList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: PublicList,
        params: {
          category: categoryName,
        },
      });
      if (response.status === 200)
        return setPublicList(response.data.publicList);
    } catch (error) {
      console.log("Specific List Error:", error, error.response);
    }
  };

  useEffect(() => {
    fetchPublicList();
  }, []);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-start">
          <div
            className="fs-1 fw-bold mx-3"
            onClick={() => navigate("/public")}
          >
            <i class="fa fa-arrow-left"></i>
          </div>
          <p className="display-4 fw-bold text-center">
            Public List <span className="fs-5"> &gt; {categoryName} List</span>
          </p>
        </div>

        <div className="categoryList my-4">
          <div className="row">
            {publicList && publicList?.length > 0 ? (
              publicList.map((el) => (
                <div className="col-lg-4 col-12" key={el.name}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{el.name.toUpperCase()}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary d-flex justify-content-between">
                        <span>category: {el.category}</span>
                        <span className="position-absolute end-0 top-0 m-3 fs-4">
                          {el.shared ? (
                            <i class="fa-solid fa-lock-open"></i>
                          ) : (
                            <i class="fa-solid fa-lock"></i>
                          )}
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

export default SpecificPublic;
