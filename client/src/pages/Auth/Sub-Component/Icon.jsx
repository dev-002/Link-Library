import React from "react";

const Icon = (props) => {
  return (
    <button
      type="button"
      className="btn btn-link btn-floating mx-1 fs-1"
      style={{ fontSize: "1em", color: "black" }}
    >
      <i className={props.class}></i>
    </button>
  );
};

export default Icon;
