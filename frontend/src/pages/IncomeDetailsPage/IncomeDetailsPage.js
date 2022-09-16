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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const allUserTrips = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/trips/", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllTrips(response.data.filter((trip) => trip.is_active === false));
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

  /* Section - Chart Data by Last year */

  //Milliseconds in a year
  let oneYearTime = 86400000 * 365;

  //Getting current date
  let currentDate = new Date();
  let currentDateTime = currentDate.getTime();

  //Getting trips for past year
  let lastYearTrips = allTrips.filter((trip) => {
    let tripEndedTime = new Date(trip.date_ended);
    return (
      tripEndedTime <= currentDateTime &&
      tripEndedTime >= currentDateTime - oneYearTime
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

    return [
      `Trip ${parseInt(tripCounter)}\nDistance: ${
        trip.distance
      } mi;\n Date completed: ${trip.date_ended};`,
      parseFloat(trip.income),
      parseFloat(tripCosts),
    ];
  });

  /* Section - Filter by dates*/

  async function handleClick() {
    tripCounter = 0;
    getTimeOfProvidedDates();
  }

  function getTimeOfProvidedDates() {
    let dateFrom = new Date(fromDate);
    let timeOfDateFrom = dateFrom.getTime();

    let dateTo = new Date(toDate);
    let timeOfDateTo = dateTo.getTime();

    let filteredTripsArray = filterTripByDates(timeOfDateFrom, timeOfDateTo);
    setFilteredTrips(filteredTripsArray);
  }

  function filterTripByDates(timeFrom, timeTo) {
    let tripsArray = allTrips.filter((trip) => {
      let tripDateEndedTime = new Date(trip.date_ended);
      return tripDateEndedTime >= timeFrom && tripDateEndedTime <= timeTo;
    });
    return tripsArray;
  }

  tripCounter = 0;
  let filteredTotalIncome = 0;
  let filteredTotalCosts = 0;
  let newChartData = filteredTrips.map((trip) => {
    filteredTotalIncome += parseFloat(trip.income);
    tripCounter += 1;
    let tripCosts = 0;
    let tripCostsArray = allUserCosts.filter(
      (cost) => cost.trip.id === trip.id
    );
    for (let i = 0; i < tripCostsArray.length; i++) {
      tripCosts += parseFloat(tripCostsArray[i].amount);
    }
    filteredTotalCosts += tripCosts;
    return [
      `Trip ${parseInt(tripCounter)}\nDistance: ${
        trip.distance
      } mi;\n Date completed: ${trip.date_ended};`,
      parseFloat(trip.income),
      parseFloat(tripCosts),
    ];
  });

  if (allTrips.length > 0) {
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
        <div className="dates-container">
          <div className="date-picker">
            <span>
              From:
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
              ></input>
            </span>
          </div>
          <button onClick={handleClick}>Filter</button>
          <div className="date-picker">
            <span>
              To:
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
              ></input>
            </span>
          </div>
        </div>
        {filteredTrips.length === 0 ? (
          <PerfomanceChart chartData={chartDataValues} />
        ) : (
          <div>
            <PerfomanceChart chartData={newChartData} />
            <p className="filteredtotals-tag">Filtered totals:</p>
            <div className="filtered-data-total-income-costs">
              <p>
                <span>Income: </span>${filteredTotalIncome.toFixed(2)}
              </p>
              <p>
                <span>Expenses: </span>${filteredTotalCosts.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } else if (allTrips.length === 0) {
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
        <p className="no-trips-tag">No completed trips</p>
        <button onClick={() => navigate("/newTrip")}>Start trip</button>
      </div>
    );
  }
};

export default IncomeDetailsPage;
