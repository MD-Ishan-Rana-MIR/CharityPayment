import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PerFormance = () => {
  const seriesColors = ["#1E90FF", "#00C49F", "#FF8042"];
  const [state, setState] = useState({
    series: [
      {
        name: "Volunteer",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Donor",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Survivors",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      colors: seriesColors,
      chart: {
        type: "bar",
        height: 200,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "85%",
          borderRadius: 2,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jun",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        axisBorder: {
          show: false, // Hide the border of the X-axis
        },
        axisTicks: {
          show: false, // Hide ticks on the X-axis
        },
        labels: { style: { colors: "#ccc" } },
      },
      yaxis: {
        axisBorder: {
          show: false, // Hide the border of the Y-axis
        },
        labels: { style: { colors: "#ccc" } },
      },
      grid: {
        show: false, // Remove grid lines from the chart
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val;
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
            Performance
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
          type="bar"
          height={200}
        />
      </div>
    </div>
  );
};

export default PerFormance;
