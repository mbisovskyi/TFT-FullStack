//styles
import "./IncomeDetailsPage.css";

//Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

//Utils
import React from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const IncomeDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, token] = useAuth();
  const [allTrips, setAllTrips] = useState([]);
  const [allUserCosts, setAllUserCosts] = useState([]);

  useEffect(() => {
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data);
    };
    const allUserCosts = async () => {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/costs/user/${user.id}/`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setAllUserCosts(response.data);
    };
    allUserTrips();
    allUserCosts();
  }, []);

  let oneYearTime = 86400000 * 365;

  let currentDate = new Date();
  let currentDateTime = currentDate.getTime();

  let lastYearTrips = allTrips.filter((trip) => {
    let tripEndedTime = new Date(trip.date_ended);
    return (
      tripEndedTime < currentDateTime &&
      tripEndedTime > currentDateTime - oneYearTime
    );
  });

  let lastYearCosts = allUserCosts.filter((cost) => {
    let costAddedTime = new Date(cost.date_added);
    return (
      costAddedTime < currentDateTime &&
      costAddedTime > currentDateTime - oneYearTime
    );
  });
  console.log(lastYearTrips, lastYearCosts);

  const data = [
    ["Trip", "Incomes", "Expenses"],
    ["1", 1000, 400],
    ["2", 1170, 460],
    ["3", 660, 1120],
    ["4", 1030, 540],
  ];

  const options = {
    title: "Trips Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <div className="incomedetailspage-wrap">
      <button onClick={() => navigate("/")}>Back</button>
      <div className="income-costs-container">
        <div className="income-container">
          <label className="income-tag">Year income</label>
          <p>${state.yearIncome}</p>
        </div>
        <div className="costs-container">
          <label className="costs-tag">Year costs</label>
          <p>${state.yearCosts}</p>
        </div>
      </div>
      <div className="chart-container">
        <Chart
          chartType="LineChart"
          width="100%"
          height="500px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default IncomeDetailsPage;
