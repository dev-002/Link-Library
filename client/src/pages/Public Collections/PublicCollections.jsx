import React, { useState, useEffect } from "react";
import axios from "axios";
import { PublicCollections as collectionLink } from "../../API_Endponits";
import { Link, useNavigate } from "react-router-dom";

export default function PublicCollections() {
  const navigate = useNavigate();
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
        url: collectionLink.getCollections,
      });
      if (response.status === 200) {
        setFetchState({ ...fetchState, loading: false, fetch: true });
        setCollections(response.data.categories);
      }
    } catch (error) {
      setFetchState({ ...fetchState, loading: false, error: error.message });
      const state = {
        code: error.code,
        title: error.name,
        location: "in fetching public collections",
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
      <div className="container min-h-fit">
        {/* Heading */}
        <section className="my-5">
          <div className="text-2xl font-bold">
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
                  className="md:w-fit w-full text-xl p-3 border-2 border-secondary2 rounded"
                >
                  {collection.toUpperCase()}
                </Link>
              ))
            ) : (
              <div>
                <p className="text-lg font-bold">Error: </p>
                <p className="text-xl">{fetchState.error}</p>
                <p className="text-xl my-4">Please Refresh</p>
              </div>
            )
          ) : (
            <> Loading... </>
          )}
        </section>
      </div>
    </>
  );
}
