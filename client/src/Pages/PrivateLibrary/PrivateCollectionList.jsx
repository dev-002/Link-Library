import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrivateCollections } from "../../API_Endponits";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const PrivateCollectionList = () => {
  const [cookie, setCookie] = useCookies(["token"]);
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
        method: "post",
        url: PrivateCollections.getCategoryList,
        headers: { Authorization: cookie.token },
        params: {
          collectionQuery,
        },
      });
      console.log("Response", response);
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
            {collectionQuery.toUpperCase()} Collection{" "}
            <i className="fa-solid fa-arrow-right"></i>
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
                      <p className="card-text">{list.description}</p>
                      <p className="card-link">
                        <a href={list.link}>{list.link}</a>
                      </p>
                    </div>
                    <hr />
                    <div className="card-body row d-flex justify-content-evenly">
                      <button className="col-5 btn btn-warning m-1">
                        Edit <i className="fa-solid fa-pen-to-square mx-1"></i>
                      </button>
                      <button className="col-5 btn btn-danger m-1">
                        Delete <i className="fa-solid fa-trash mx-1"></i>
                      </button>
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

export default PrivateCollectionList;
