import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const ChartComp = ({ chartData }) => {
  console.log("From Chartdata", chartData);
  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    const ctx = document.getElementById("CategoriesData");
    const labels = chartData.category;
    if (ctx) {
      const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              label: "Stash Data",
              data: chartData.stashSize,
              backgroundColor: Array.from({ length: labels.length }, () =>
                generateRandomColor()
              ),

              hoverOffset: 4,
            },
          ],
          options: {
            plugins: {
              legend: {
                display: false,
                // position: "left",
              },
            },
          },
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, []);

  return <canvas id="CategoriesData"></canvas>;
};

export default ChartComp;
