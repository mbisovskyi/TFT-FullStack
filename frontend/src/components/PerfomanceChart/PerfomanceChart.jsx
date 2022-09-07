//Styles
import "./PerfomanceChart.css";

//Utils
import React from "react";
import { Chart } from "react-google-charts";

const PerfomanceChart = (props) => {
  const data = [
    ["Trip Date", "Trip Income", "Trip Expenses"],
    ...props.chartData,
  ];

  const options = {
    title: "Company Performance",
    curveType: "function",
    hAxis: {
      title: "Trip Date",
      titleTextStyle: { color: "#35a376", fontSize: 26 },
    },
    vAxis: { minValue: 0 },
    chartArea: { width: "80%", height: "85%" },
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
