import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./sub-components/Form";

const PrivateListCreate = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container my-5">
        {/* Heading Section */}
        <section className="my-3">
          <p className="fs-2 fw-bold">
            <i
              className="fa-solid fa-arrow-left me-2"
              onClick={() => navigate("/protected/private")}
            ></i>{" "}
            Create new list
          </p>
        </section>

        {/* Form Section */}
        <section className="row mx-auto">
          <div className="col-md-6">
            <Form />
          </div>
          <div className="col-6 d-md-block d-none">
            <img
              src="/resources/PrivateLibrary_Create.webp"
              alt="Vector Art"
              style={{ maxHeight: "80%" }}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivateListCreate;
