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
            <div className="row mt-5 mx-auto justify-content-evenly p-3 fs-bold fs-lg-2 fs-4">
              <div
                className="col-lg-5 p-5 border border-2 border-black"
                style={{ minHeight: "5em" }}
              >
                Total Collections :{" "}
                <span className="mx-4 fs-lg-1 fs-3">
                  {data.categories.length}
                </span>
              </div>
              <div className="col-lg-5 p-5 border border-2 border-black">
                Total Links:{" "}
                <span className="mx-4 fs-lg-1 fs-3">{data.links.length}</span>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-5 row justify-content-end">
              <div className="col-5 text-justify fs-2 fw-bold">
                Categories:
                <br />
                {data.categories?.length > 0 ? (
                  data.categories.map((el) => (
                    <p className="fs-4 fw-normal" key={el}>
                      {el.toUpperCase()}
                    </p>
                  ))
                ) : (
                  <p>No Stash Created</p>
                )}
              </div>
              <div className="col-6">
                {chartData && <Chart chartData={chartData} />}
              </div>
            </div>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
