import React, { useState, useEffect } from "react";
import axiosInstance from "../../utility/axiosInstance";
import { PublicCollections as collectionLink } from "../../API_Endponits";
import { useNavigate, useParams } from "react-router-dom";

export default function PublicList() {
  const navigate = useNavigate();
  const collectionQuery = useParams().collectionQuery;
  // States
  const [fetchState, setFetchState] = useState({
    loading: false,
    error: "",
    fetch: false,
  });
  const [collection, setCollections] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setFetchState({ ...fetchState, loading: true });
        const api = collectionLink.getCollectionList + `/${collectionQuery}`;

        const response = await axiosInstance.get(api);

        console.log(response.data);
        if (response.status === 200) {
          setFetchState({ ...fetchState, loading: false, fetch: true });
          setCollections(response.data.collection);
        }
      } catch (error) {
        setFetchState({ ...fetchState, loading: false, error: error.message });
        const state = {
          code: error.code,
          title: error.name,
          location: "in fetching Public Collection List",
          message: error.message,
        };
        // navigate("/error", { state });
      }
    };
    fetchCollections();
  }, []);

  return (
    <>
      <div className="container" style={{ minHeight: "60vh" }}>
        {/* Heading */}
        <section className="my-5">
          <div className="text-xl font-bold">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => navigate("/public")}
            ></i>
            {collectionQuery.toUpperCase()} Collection{" "}
          </div>
        </section>

        <section className="my-5">
          <div className="text-lg">
            <span className="font-semibold">Description: </span>
            {collection.description}
          </div>

          <div className="text-lg">
            <span className="font-semibold">Shared: </span>
            <span className="text-xl me-2">
              {collection?.shared == "public" ? (
                <i className="fa-solid fa-bullhorn" />
              ) : collection.shared == "shared" ? (
                <i className="fa-regular fa-user"></i>
              ) : (
                <i className="fa-solid fa-lock"></i>
              )}
            </span>
            {collection?.shared?.toUpperCase()}
          </div>

          <div className="text-lg">
            <span className="font-semibold">Owner: </span>@
            {collection?.owner?.username}
          </div>

          <div className="text-lg">
            <span className="font-semibold">Tags: </span>
            {collection?.tags?.map((tag) => (
              <span key={tag} className="mx-1 text-base text-blue-400">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Public Collections */}
        <section>
          <div className="flex text-lg">
            {!fetchState.loading ? (
              fetchState.fetch ? (
                collection?.link.map((list) => (
                  <div
                    className="card md:w-1/3 p-3 m-3 border-2 border-secondary2 rounded-lg"
                    key={list.name}
                  >
                    <div className="flex mt-2 justify-between">
                      <div className="w-2/3 card-heading font-bold text-justify">
                        {list.name.toUpperCase()}
                      </div>
                    </div>
                    <hr className="mt-1 mb-3 border-b-2 border-secondary3" />
                    <div className="card-body">
                      <div className="card-text">
                        <p>
                          {list.description}
                          <br />
                          Owner:
                          <span className="font-bold mt-2">
                            {" "}
                            {collection?.owner.username}
                          </span>
                        </p>
                      </div>
                      <p className="card-link text-blue-500">
                        <a href={list.link}>{list.link}</a>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p className="text-xl font-bold">Error: </p>
                  <p className="text-lg">{fetchState.error}</p>
                  <p className="text-lg my-4">Please Refresh</p>
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
}
