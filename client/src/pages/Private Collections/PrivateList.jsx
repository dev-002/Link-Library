import React, { useState, useEffect } from "react";
import axiosInstance from "../../utility/axiosInstance";
import { PrivateCollections as collectionLink } from "../../API_Endponits";
import { useNavigate, useParams } from "react-router-dom";
import AddLinkModal from "./subComponents/CollectionLink/CreateLinkModel";
import UpdateLinkModel from "./subComponents/CollectionLink/UpdateLinkModel";

export default function PrivateList() {
  const navigate = useNavigate();

  // States
  const collectionQuery = useParams().collectionQuery;
  const [link, setLink] = useState({});
  const [createLinkModal, setCreateLinkModal] = useState(false);
  const [updateLinkModal, setUpdateLinkModal] = useState({
    status: false,
    link: {},
  });
  const [fetchState, setFetchState] = useState({
    loading: false,
    error: "",
    fetch: false,
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setFetchState({ ...fetchState, loading: true });
        const api = collectionLink.getCollectionList + `/${collectionQuery}`;
        const response = await axiosInstance.get(api, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setFetchState({ ...fetchState, loading: false, fetch: true });
          setLink(response.data.collection);
        }
      } catch (error) {
        setFetchState({ ...fetchState, loading: false, error: error.message });
        const state = {
          code: error.code,
          title: error.name,
          location: "in fetching User Private collections Link",
          message: error.message,
        };
        // navigate("/error", { state });
      }
    };

    fetchCollections();
  }, [createLinkModal]);

  return createLinkModal ? (
    <AddLinkModal
      setCreateLinkModal={setCreateLinkModal}
      collectionName={collectionQuery}
    />
  ) : updateLinkModal.status ? (
    <UpdateLinkModel
      setUpdateLinkModal={setUpdateLinkModal}
      updateLinkModal={updateLinkModal}
      collectionName={collectionQuery}
    />
  ) : (
    <PrivateListComp
      setCreateLinkModal={setCreateLinkModal}
      collectionQuery={collectionQuery}
      fetchState={fetchState}
      link={link}
      setUpdateLinkModal={setUpdateLinkModal}
    />
  );
}

const PrivateListComp = ({
  setCreateLinkModal,
  collectionQuery,
  fetchState,
  link,
  setUpdateLinkModal,
}) => {
  const navigate = useNavigate();

  async function handleDelete(list) {
    const api = collectionLink.removeCollection + `/${collectionQuery}/remove`;

    try {
      const response = await axiosInstance.delete(api, {
        withCredentials: true,
        data: {
          collectionName: collectionQuery,
          link_id: list._id,
        },
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
      // navigate("/error", { state });
    }
  }

  return (
    <>
      <div className="container min-h-fit">
        {/* Heading */}
        <section className="my-5 flex justify-between">
          <div className="w-2/3 text-xl font-bold">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => navigate("/private")}
            ></i>
            {collectionQuery.toUpperCase()} Collection{" "}
          </div>
          <div className="w-1/12 md:text-3xl text-lg cursor-pointer">
            <i
              className="fa-solid fa-square-plus"
              onClick={() => setCreateLinkModal(true)}
            ></i>
          </div>
        </section>

        {/* Collection Description Section */}
        <section className="my-5">
          <div className="text-lg">
            <span className="font-semibold">Description: </span>
            {link && link.description}
          </div>

          <div className="text-lg">
            <span className="font-semibold">Shared: </span>
            <span className="text-xl me-2">
              {link?.shared == "public" ? (
                <i className="fa-solid fa-bullhorn" />
              ) : link?.shared == "shared" ? (
                <i className="fa-regular fa-user"></i>
              ) : (
                <i className="fa-solid fa-lock"></i>
              )}
            </span>
            {link?.shared?.toUpperCase()}
          </div>

          <div className="text-lg">
            <span className="font-semibold">Owner: </span>@
            {link && link?.owner?.username}
          </div>

          <div className="text-lg">
            <span className="font-semibold">Tags: </span>
            {link?.tags?.map((tag) => (
              <span key={tag} className="mx-1 text-base text-blue-400">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Private Collections */}
        <section>
          <div className="flex text-lg">
            {!fetchState.loading ? (
              fetchState.fetch ? (
                link?.link.map((list) => (
                  <div
                    className="card md:w-1/3 p-3 m-3 border-2 border-secondary2 rounded-lg"
                    key={list.name}
                  >
                    <div className="w-full px-3 pb-3 flex justify-between border-b-2 border-black">
                      <span className="text-xl font-medium text-clip overflow-hidden">
                        {list.name.toUpperCase()}
                      </span>
                      <a href={list.link} target="_blank">
                        <i className="fa-solid fa-link text-lg"></i>
                      </a>
                    </div>

                    <div className="py-2 text-wrap overflow-hidden text-lg border-b-2 border-black">
                      {list.description}
                    </div>

                    <div className="mt-2 text-lg flex justify-evenly">
                      <button
                        className="m-1 px-2 py-1 bg-blue-500 rounded hover:bg-blue-700 hover:text-white hover:shadow-blue-500/50 shadow-lg"
                        onClick={() => {
                          setUpdateLinkModal({
                            status: true,
                            link: { ...link, link: list },
                          });
                        }}
                      >
                        Edit <i className="fa-solid fa-pen-to-square mx-1"></i>
                      </button>
                      <button
                        className="m-1 px-2 py-1 bg-red-500 rounded hover:bg-red-700 hover:text-white hover:shadow-red-500/50 shadow-lg"
                        onClick={() => handleDelete(list)}
                      >
                        Delete <i className="fa-solid fa-trash mx-1"></i>
                      </button>
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
};
