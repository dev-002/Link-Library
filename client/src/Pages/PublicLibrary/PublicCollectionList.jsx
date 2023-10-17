import React, { useState, useEffect } from "react";
import axios from "axios";
import { PublicCollections } from "../../API_Endponits";
import { useNavigate, useParams } from "react-router-dom";

const PublicCollectionList = () => {
  const navigate = useNavigate();
  const collectionQuery = useParams().collectionQuery;
  // States
  const [fetchState, setFetchState] = useState({
    loading: false,
    error: "",
    fetch: false,
  });
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      setFetchState({ ...fetchState, loading: true });

      const response = await axios({
        method: "get",
        url: PublicCollections.getCategoryList,
        params: {
          collectionQuery,
        },
      });
      if (response.status === 200) {
        setFetchState({ ...fetchState, loading: false, fetch: true });
        setCollections(response.data.list);
      }
    } catch (error) {
      setFetchState({ ...fetchState, loading: false, error: error.message });
      console.log("Error: ", {
        location: "in fetching User Private collections",
        message: error.message,
        error,
      });
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>
      <div className="container" style={{ minHeight: "60vh" }}>
        {/* Heading */}
        <section className="my-5">
          <div className="fs-2 fw-bold">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => navigate("/public")}
            ></i>
            {collectionQuery.toUpperCase()} Collection{" "}
          </div>
        </section>

        {/* Public Collections */}
        <section>
          <div className="row fs-5">
            {!fetchState.loading ? (
              fetchState.fetch ? (
                collections.map((list) => (
                  <div className="card col-md-4 p-3 m-3" key={list.name}>
                    <div className="row d-flex mt-2 justify-content-between">
                      <div className="col-8 card-heading fw-bold text-justify">
                        {list.name.toUpperCase()}
                      </div>
                      <div className="col-2">
                        {list.shared ? (
                          <i className="fa-regular fa-user"></i>
                        ) : (
                          <i className="fa-solid fa-lock"></i>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="card-text">
                        <p>
                          {list.description}
                          <br />
                          <span className="fw-bold mt-2">Owner: Admin</span>
                        </p>
                      </div>
                      <p className="card-link">
                        <a href={list.link}>{list.link}</a>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p className="fs-4 fw-bold">Error: </p>
                  <p className="fs-5">{fetchState.error}</p>
                  <p className="fs-5 my-4">Please Refresh</p>
                </div>
              )
            ) : (
              <> Loading... </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PublicCollectionList;
