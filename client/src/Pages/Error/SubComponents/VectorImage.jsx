import React from "react";

const NotFound = () => {
  return (
    <img
      src="./resources/Error_NotFound.jpg"
      alt="Vector Image"
      style={{ maxWidth: "90%" }}
    />
  );
};

const ServerError = () => {
  return (
    <img
      src="./resources/Error_Server.jpg"
      alt="Vector Image"
      style={{ maxWidth: "90%" }}
    />
  );
};

const ClientError = () => {
  return (
    <img
      src="./resources/Error_BadRequest.jpg"
      alt="Vector Image"
      style={{ maxWidth: "90%" }}
    />
  );
};

export { NotFound, ServerError, ClientError };
