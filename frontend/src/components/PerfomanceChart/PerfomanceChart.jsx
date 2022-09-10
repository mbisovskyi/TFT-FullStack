//Styles
import "./PerfomanceChart.css";

//Utils
import React from "react";
import { Chart } from "react-google-charts";

const PerfomanceChart = (props) => {
  const data = [
    ["Trip Number", "Trip Income", "Trip Expenses"],
    ...props.chartData,
  ];

  const options = {
    title: "Trucker Performance Graph",
    legendTextStyle: { color: "white", fontSize: "16" },
    titleTextStyle: { color: "white", fontSize: "22", titlePosition: "out" },
    hAxis: {
      textStyle: {
        color: "#35a376",
        fontSize: "20",
      },
      titleTextStyle: { color: "white", fontSize: "22" },
      gridlines: { color: "none", count: 10 },
      minorGridlines: { color: "none" },
    },
    vAxis: {
      baselineColor: "none",
      gridlines: { color: "none" },
      textStyle: { color: "#35a376", fontSize: "20" },
    },
    chartArea: {
      width: "80%",
      height: "75%",
    },
    backgroundColor: {
      fill: "white",
      stroke: "green",
      strokeSize: 5,
    },
    colors: ["#35a376", "#FD5466"],
    backgroundColor: { fill: "transparent" },
  };
  return (
    <div className="chart-container">
      <Chart
        chartType="AreaChart"
        width="100%"
        height="500px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default PerfomanceChart;
