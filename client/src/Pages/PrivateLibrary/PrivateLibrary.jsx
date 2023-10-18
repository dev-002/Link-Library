import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrivateCollections } from "../../API_Endponits";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const PrivateLibrary = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);

  // States
  const [fetchState, setFetchState] = useState({
    loading: false,
    error: "",
    fetch: false,
  });
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    let status;
    try {
      setFetchState({ ...fetchState, loading: true });
      const response = await axios({
        method: "get",
        url: PrivateCollections.getCollections,
        headers: { Authorization: cookie.token },
      });
      if (response.status === 200) {
        setFetchState({ ...fetchState, loading: false, fetch: true });
        setCollections(response.data.privateCollections);
        status = response.status;
      }
    } catch (error) {
      setFetchState({ ...fetchState, loading: false, error: error.message });
      console.log(error);
      const state = {
        code: error.code,
        title: error.name,
        status,
        location: "in fetching User Private collections",
        message: error.message,
      };
      navigate("/error", { state });
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>
      <div className="container" style={{ minHeight: "60vh" }}>
        {/* Heading */}
        <section className="row d-flex justify-content-between my-5">
          <div className="col-8 fs-2 fw-bold">
            PrivateLibrary <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="col-2 fs-1">
            <i
              className="fa-solid fa-square-plus"
              onClick={() => navigate("/protected/private/create")}
            ></i>
          </div>
        </section>

        {/* Public Collections */}
        <section>
          {!fetchState.loading ? (
            fetchState.fetch ? (
              collections.map((collection) => (
                <Link
                  key={collection}
                  className="col-md-4 col-12 fs-5 p-3 btn btn-primary"
                  to={`/protected/private/${collection}`}
                >
                  {collection.toUpperCase()}
                </Link>
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
        </section>
      </div>
    </>
  );
};

export default PrivateLibrary;
