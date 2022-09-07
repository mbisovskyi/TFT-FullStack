//styles
import "./IncomeDetailsPage.css";

//Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

//Utils
import axios from "axios";

//Components
import PerfomanceChart from "../../components/PerfomanceChart/PerfomanceChart";

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

  //Milliseconds in a year
  let oneYearTime = 86400000 * 365;

  //Getting current date
  let currentDate = new Date();
  let currentDateTime = currentDate.getTime();

  //Getting trips for past year
  let lastYearTrips = allTrips.filter((trip) => {
    let tripEndedTime = new Date(trip.date_ended);
    return (
      tripEndedTime < currentDateTime &&
      tripEndedTime > currentDateTime - oneYearTime
    );
  });

  //Getting Trips Income and Costs
  let tripCounter = 0;
  let chartDataValues = lastYearTrips.map((trip) => {
    tripCounter += 1;
    let tripCosts = 0;
    let tripCostsArray = allUserCosts.filter(
      (cost) => cost.trip.id === trip.id
    );
    for (let i = 0; i < tripCostsArray.length; i++) {
      tripCosts += parseFloat(tripCostsArray[i].amount);
    }

    return [trip.date_ended, parseFloat(trip.income), parseFloat(tripCosts)];
  });

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
      <PerfomanceChart chartData={chartDataValues} />
    </div>
  );
};

export default IncomeDetailsPage;
