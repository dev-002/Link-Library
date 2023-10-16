import React, { useState, useEffect } from "react";
import axios from "axios";
import { PublicCollections } from "../../API_Endponits";

const PublicLibrary = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await axios({
        method: "get",
        url: PublicCollections.getCollections,
      });
      if (response.status === 200) {
        setCollections(response.data.publicCategories);
      }
    } catch (error) {
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
          {collections.length !== 0 ? (
            collections.map((collection) => (
              <>
                <div
                  className="card fs-5 p-3"
                  key={collection}
                  style={{ backgroundColor: "rgba(255,12,41,0.8)" }}
                >
                  {collection.toUpperCase()}
                </div>
              </>
            ))
          ) : (
            <> Loading... </>
          )}
        </section>
      </div>
    </>
  );
};

export default PublicLibrary;
