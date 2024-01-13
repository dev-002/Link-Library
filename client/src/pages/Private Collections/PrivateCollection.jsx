import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrivateCollections as collectionLink } from "../../API_Endponits";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function PrivateCollection() {
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
        url: collectionLink.getCollections,
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
      <div className="container min-h-fit">
        {/* Heading */}
        <section className="flex justify-between my-5">
          <div className="w-2/3 text-2xl font-bold">
            PrivateLibrary <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="w-1/12 text-lg">
            <i
              className="fa-solid fa-square-plus"
              onClick={() => navigate("/private/create")}
            ></i>
          </div>
        </section>

        {/* Private Collections */}
        <section>
          {!fetchState.loading ? (
            fetchState.fetch ? (
              collections.map((collection) => (
                <Link
                  key={collection}
                  to={`/private/${collection}`}
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
