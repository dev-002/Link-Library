import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FetchUser } from "../../../API";
import Chart from "./Chart";

const Dashboard = () => {
  const [cookies] = useCookies(["token"]);
  const [data, setData] = useState();
  const [chartData, setChartData] = useState();

  const chartSet = async () => {
    if (data) {
      const size = [];
      data.categories.map((category) => {
        let length = 0;
        for (let obj of data.links) if (obj.category == category) length++;
        size.push(length);
      });
      setChartData({ category: data.categories, stashSize: size });
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: FetchUser.getDashboard,
        headers: {
          Authorization: cookies.token,
        },
      });
      console.log("Response: ", response.data);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log("Fetching User:", error, error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    chartSet();
  }, [data]);

  return (
    <>
      <div className="container">
        <div className="display-6">Dashboard</div>
        {data ? (
          <>
            <div className="row d-flex mt-5 mx-auto justify-content-evenly p-3 fs-bold fs-lg-2 fs-4">
              {/* Total Collections */}
              <div
                className="col-12 col-sm-5 card border mx-2 shadow-lg p-5 mb-5 d-sm-block"
                style={{ borderRadius: "20px" }}
              >
                Total Collections :{" "}
                <span className="mx-4 fs-lg-1 fs-3">
                  {data.categories.length}
                </span>
              </div>
              {/* Total Links */}
              <div
                className="col-12 col-sm-5 card border mx-2 shadow-lg p-5 mb-5 d-sm-block"
                style={{ borderRadius: "20px" }}
              >
                Total Links:{" "}
                <span className="mx-4 fs-lg-1 fs-3">{data.links.length}</span>
              </div>
            </div>

            {/* Chart Div */}
            <div
              className="mt-5 row justify-content-end"
              style={{ minHeight: "20em" }}
            >
              {/* Category List */}
              <div className="col-12 col-sm-7 text-justify fs-2 fw-bold">
                Categories:
                <br />
                {data.categories?.length > 0 ? (
                  data.categories.map((el) => (
                    <p className="fs-4 fw-normal" key={el}>
                      {el.toUpperCase()}
                    </p>
                  ))
                ) : (
                  <p>No Collection Created</p>
                )}
              </div>

              {/* Chart */}
              <div
                className="col-4 card border shadow-lg p-3 mb-5 d-none d-sm-block mx-auto"
                style={{
                  borderRadius: "20px",
                  maxHeight: "15em",
                }}
              >
                {chartData && <Chart chartData={chartData} />}
              </div>
            </div>
          </>
        ) : (
          <div className="align-items-center d-flex justify-content-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
