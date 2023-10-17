import React, { useState, useEffect } from "react";
import axios from "axios";
import { PublicCollections } from "../../API_Endponits";
import { Link } from "react-router-dom";

const PublicLibrary = () => {
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
        url: PublicCollections.getCollections,
      });
      if (response.status === 200) {
        setFetchState({ ...fetchState, loading: false, fetch: true });
        setCollections(response.data.categories);
      }
    } catch (error) {
      setFetchState({ ...fetchState, loading: false, error: error.message });
      console.log("Error: ", {
        location: "in fetching public collections",
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
            PublicLibrary <i className="fa-solid fa-arrow-right"></i>
          </div>
        </section>

        {/* Public Collections */}
        <section>
          {!fetchState.loading ? (
            fetchState.fetch ? (
              collections.map((collection) => (
                <Link
                  key={collection}
                  to={`/public/${collection}`}
                  className="col-md-4 col-12 fs-5 p-3 btn btn-primary"
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

export default PublicLibrary;
