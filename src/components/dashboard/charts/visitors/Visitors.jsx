import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Visitors = () => {
  const seriesColors = ["#1E90FF", "#00C49F"];

  const [state, setState] = useState({
    series: [
      {
        name: "This year",
        data: [
          1200, 1500, 600, 1700, 1600, 300, 700, 1200, 6000, 7000, 2000, 1200,
        ],
      },
      {
        name: "Last year",
        data: [
          1000, 1300, 2500, 1100, 5200, 4800, 1875, 800, 5400, 6000, 1900, 1500,
        ],
      },
    ],
    options: {
      colors: seriesColors,
      chart: {
        type: "line",
        height: 200,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth", // Smooth line
        width: 3,
      },
      markers: {
        size: 2,
        hover: {
          sizeOffset: 3,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#ccc" } },
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#ccc" } },
      },
      grid: {
        show: false,
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });
  return (
    <div className="p-2 md:p-[20px]">
      <div className="flex flex-col md:flex-row justify-between items-center md:mb-4">
        {/* Left */}
        <div>
          <h1 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
            Visitors
          </h1>
          <p className="text-[#A6ABAC]">Last 12 months report</p>
        </div>

        {/* Right (Dynamic Legend) */}
        <div className="flex flex-col md:flex-row gap-4">
          {state.series.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: seriesColors[index] }}
              ></span>
              <span className="text-white font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={200}
        />
      </div>
    </div>
  );
};

export default Visitors;
