import React, { useState, useEffect } from "react";
import axiosInstance from "../../utility/axiosInstance";
import { PrivateCollections as collectionLink } from "../../API_Endponits";
import { Link, useNavigate } from "react-router-dom";
import CreateCollectionModel from "./subComponents/Collection/CreateCollectionModel";
import UpdateCollectionModal from "./subComponents/Collection/UpdateCollectionModal";

export default function PrivateCollection() {
  const navigate = useNavigate();

  // States
  const [fetchState, setFetchState] = useState({
    loading: false,
    error: "",
    fetch: false,
  });
  const [collections, setCollections] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const [updateCollectionModal, setUpdateCollectionModal] = useState({
    status: false,
    collection: {},
  });

  const fetchCollections = async () => {
    let status;
    try {
      setFetchState({ ...fetchState, loading: true });

      const response = await axiosInstance.get(collectionLink.getCollections, {
        withCredentials: true,
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
  }, [createModel]);

  return createModel ? (
    <CreateCollectionModel setCreateModel={setCreateModel} />
  ) : updateCollectionModal.status ? (
    <UpdateCollectionModal
      setUpdateCollectionModal={setUpdateCollectionModal}
      updateCollectionModal={updateCollectionModal}
    />
  ) : (
    <PrivateCollectionComp
      setCreateModel={setCreateModel}
      fetchState={fetchState}
      collections={collections}
      setUpdateCollectionModal={setUpdateCollectionModal}
    />
  );
}

const PrivateCollectionComp = ({
  setCreateModel,
  fetchState,
  collections,
  setUpdateCollectionModal,
}) => {
  const navigate = useNavigate();

  async function handleDelete(collection) {
    const api = collectionLink.removeCollection + `/${collection.name}`;

    try {
      const response = await axiosInstance.delete(api, {
        data: { collection_id: collection._id },
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      const state = {
        code: error.code,
        title: error.name,
        location: "in fetching User Private collections",
        message: error.message,
      };
      navigate("/error", { state });
    }
  }

  return (
    <>
      <div className="container min-h-fit">
        {/* Heading */}
        <section className="flex justify-between my-5">
          <div className="w-2/3 text-2xl font-bold">
            PrivateLibrary <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="w-1/12 md:text-3xl text-lg cursor-pointer">
            <i
              className="fa-solid fa-square-plus"
              onClick={() => setCreateModel(true)}
            ></i>
          </div>
        </section>

        {/* Private Collections */}
        <section className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {!fetchState.loading ? (
            fetchState.fetch ? (
              collections.length > 0 ? (
                collections.map((collection) => (
                  <div
                    key={collection.name}
                    className="px-2 h-fit my-2 w-full md:w-full md:mx-2 text-xl py-3 border-2 border-secondary2 rounded"
                  >
                    <div className="w-full px-3 pb-3 flex justify-between border-b-2 border-black">
                      <span className="text-xl font-medium text-clip overflow-hidden">
                        {collection.name.toUpperCase()}
                      </span>
                      <Link
                        key={collection.name}
                        to={`/private/${collection.name}`}
                        className="text-lg"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </Link>
                    </div>

                    <div className="body mt-3 px-2">
                      <div className="mb-3 text-lg">
                        {collection.description}
                      </div>

                      <div className="flex-wrap text-sm font-normal text-blue-500 overflow-hidden">
                        {collection.tags.map((tag) => (
                          <span key={tag} className="inline-block me-1 mb-1">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <hr className="mt-1 mb-3 border-b-2 border-secondary3" />
                      <div className="text-lg flex justify-evenly">
                        <button
                          className="m-1 px-2 py-1 bg-blue-500 rounded hover:bg-blue-700 hover:text-white hover:shadow-blue-500/50 shadow-lg"
                          onClick={() => {
                            setUpdateCollectionModal({
                              status: true,
                              collection,
                            });
                          }}
                        >
                          Edit{" "}
                          <i className="fa-solid fa-pen-to-square mx-1"></i>
                        </button>
                        <button
                          className="m-1 px-2 py-1 bg-red-500 rounded hover:bg-red-700 hover:text-white hover:shadow-red-500/50 shadow-lg"
                          onClick={() => handleDelete(collection)}
                        >
                          Delete <i className="fa-solid fa-trash mx-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xl pt-8">
                  No Private Collection Available
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
};
