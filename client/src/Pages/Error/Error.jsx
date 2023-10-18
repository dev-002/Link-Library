import React from "react";
import { useLocation } from "react-router-dom";
// Sub components
import {
  NotFound,
  ServerError,
  ClientError,
} from "./SubComponents/VectorImage";

const Error = ({}) => {
  const { state } = useLocation();
  const error = { ...state, status: 400 };
  console.log(useLocation().state);

  return (
    <>
      <div className="container" style={{ minHeight: "70vh" }}>
        {/* Main Error Section */}
        <section>
          <div className="row">
            {/* Vector Image */}
            <div
              className="d-md-flex d-none col-6 align-self-center"
              style={{ minHeight: "50vh" }}
            >
              {error.status === 404 ? (
                <NotFound />
              ) : error.status > 499 ? (
                <ServerError />
              ) : (
                <ClientError />
              )}
            </div>

            {/* Error Content */}
            <div
              className="col-md-6 col-10 text-center mx-auto"
              style={{ padding: "9em 0" }}
            >
              <p className="display-1 fw-bold">Error: {error.status}</p>
              <p className="pt-2 fw-bold fs-2">{error.message}</p>
              {/* <div
                className="text-start"
                style={{ position: "relative", left: "30%" }}
              > */}
              <p>
                <span className="fs-4 me-2">Code:</span> {error.code}
              </p>
              <p>
                <span className="fs-4 me-2">Message:</span> {error.message}
              </p>
              <p>
                <span className="fs-4 me-2">Location:</span> {error.location}
              </p>
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Error;
