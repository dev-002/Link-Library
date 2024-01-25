import React from "react";
import { useLocation } from "react-router-dom";
// Sub components
import {
  NotFound,
  ServerError,
  ClientError,
} from "../components/Error/VectorImages";

export default function Error() {
  const { state } = useLocation();
  const error = { ...state, status: 400 };
  console.log(state);

  return (
    <>
      <div className="container pt-10">
        {/* Main Error Section */}
        <section>
          <div className="flex flex-col">
            {/* Vector Image */}
            <div className="md:flex hidden w-1/2 self-center max-h-screen">
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
              className="md:w-1/2 w-[80%] text-center mx-auto"
              style={{ padding: "9em 0" }}
            >
              <p className="text-2xl font-bold">Error: {error.status}</p>
              <p className="pt-2 font-bold text-xl">{error.message}</p>
              {/* <div
                className="text-start"
                style={{ position: "relative", left: "30%" }}
              > */}
              <p>
                <span className="text-xl me-2">Code:</span> {error.code}
              </p>
              <p>
                <span className="text-xl me-2">Message:</span> {error.message}
              </p>
              <p>
                <span className="text-xl me-2">Location:</span> {error.location}
              </p>
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
