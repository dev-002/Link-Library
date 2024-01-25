import React, { useState, useEffect } from "react";
import axiosInstance from "../../utility/axiosInstance";
import { PublicCollections as collectionLink } from "../../API_Endponits";
import { Link, useNavigate } from "react-router-dom";

export default function PublicCollections() {
  const navigate = useNavigate();
  const [fetchState, setFetchState] = useState({
    loading: false,
    error: "",
    fetch: false,
  });
  const [collection, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setFetchState({ ...fetchState, loading: true });
        const response = await axiosInstance.get(collectionLink.getCollections);

        if (response.status === 200 && response.data) {
          setFetchState({ ...fetchState, loading: false, fetch: true });
          setCollections(response.data.collections);
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
              collection.length > 0 ? (
                collection.map((collection) => (
                  <div
                    key={collection.name}
                    className="box md:w-fit w-full text-xl py-3 border-2 border-secondary2 rounded"
                  >
                    <div className="w-full px-3 pb-3 flex justify-between border-b-2 border-black">
                      <span className="text-xl font-medium">
                        {collection.name.toUpperCase()}
                      </span>
                      <Link
                        key={collection.name}
                        to={`/public/${collection.name}`}
                        className="text-lg"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </Link>
                    </div>

                    <div className="body mt-3 px-2">
                      <div className="mb-3 text-lg">
                        {collection.description}
                      </div>

                      <div className="flex text-sm font-light text-blue-500">
                        {collection.tags.map((tag) => (
                          <span key={tag} className="me-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xl pt-8">
                  No Public Collection Available
                </div>
              )
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
